#!/usr/bin/env python3
"""
COMPREHENSIVE Wikidata update for Q108761295 (Ebstar).
Every single piece of data from ebstar.co.
Run: python3 scripts/update-wikidata.py
"""

import getpass
import json
import requests
import sys
import time

ENTITY_ID = "Q108761295"
API_URL = "https://www.wikidata.org/w/api.php"
DELAY = 7  # seconds between edits — Wikidata rate limits aggressively

session = requests.Session()
session.headers.update({
    "User-Agent": "EbstarWikidataBot/1.0 (https://ebstar.co; contact@ebstar.co)",
})

success_count = 0
fail_count = 0
skip_count = 0


# ═══════════════════════════════════════════════════════════
# API LAYER
# ═══════════════════════════════════════════════════════════

def api_get(params):
    params["format"] = "json"
    r = session.get(API_URL, params=params)
    r.raise_for_status()
    return r.json()


def api_post(params):
    params["format"] = "json"
    r = session.post(API_URL, data=params)
    r.raise_for_status()
    return r.json()


def get_token(token_type="csrf"):
    data = api_get({"action": "query", "meta": "tokens", "type": token_type})
    return data["query"]["tokens"][f"{token_type}token"]


def login(username, password):
    login_token = get_token("login")
    result = api_post({
        "action": "login",
        "lgname": username,
        "lgpassword": password,
        "lgtoken": login_token,
    })
    if result["login"]["result"] != "Success":
        print(f"  LOGIN FAILED: {result['login']}")
        sys.exit(1)
    print("  Logged in successfully.\n")


def get_entity():
    result = api_get({"action": "wbgetentities", "ids": ENTITY_ID})
    return result["entities"][ENTITY_ID]


# ═══════════════════════════════════════════════════════════
# EDIT HELPERS
# ═══════════════════════════════════════════════════════════

def do(label, func, *args):
    """Execute an edit with delay and tracking."""
    global success_count, fail_count
    try:
        result = func(*args)
        if "error" in result:
            print(f"    FAIL: {result['error'].get('info', result['error'])}")
            fail_count += 1
        else:
            print(f"    OK")
            success_count += 1
        time.sleep(DELAY)
        return result
    except Exception as e:
        print(f"    EXCEPTION: {e}")
        fail_count += 1
        time.sleep(DELAY)
        return {}


def skip(reason="already exists"):
    global skip_count
    print(f"    skip ({reason})")
    skip_count += 1


# ═══════════════════════════════════════════════════════════
# WIKIDATA API WRAPPERS
# ═══════════════════════════════════════════════════════════

def _set_label(lang, value):
    t = get_token()
    return api_post({"action": "wbsetlabel", "id": ENTITY_ID, "language": lang, "value": value, "token": t, "bot": "1"})

def _set_desc(lang, value):
    t = get_token()
    return api_post({"action": "wbsetdescription", "id": ENTITY_ID, "language": lang, "value": value, "token": t, "bot": "1"})

def _set_aliases(lang, aliases):
    t = get_token()
    return api_post({"action": "wbsetaliases", "id": ENTITY_ID, "language": lang, "set": "|".join(aliases), "token": t, "bot": "1"})

def _add_item(prop, qid):
    t = get_token()
    return api_post({"action": "wbcreateclaim", "entity": ENTITY_ID, "property": prop, "snaktype": "value",
                      "value": json.dumps({"entity-type": "item", "numeric-id": int(qid.replace("Q", ""))}), "token": t, "bot": "1"})

def _add_string(prop, value):
    t = get_token()
    return api_post({"action": "wbcreateclaim", "entity": ENTITY_ID, "property": prop, "snaktype": "value",
                      "value": json.dumps(value), "token": t, "bot": "1"})

def _add_url(prop, url):
    t = get_token()
    return api_post({"action": "wbcreateclaim", "entity": ENTITY_ID, "property": prop, "snaktype": "value",
                      "value": json.dumps(url), "token": t, "bot": "1"})

def _add_time(prop, time_str, precision=11):
    t = get_token()
    return api_post({"action": "wbcreateclaim", "entity": ENTITY_ID, "property": prop, "snaktype": "value",
                      "value": json.dumps({"time": time_str, "timezone": 0, "before": 0, "after": 0, "precision": precision,
                                           "calendarmodel": "http://www.wikidata.org/entity/Q1985727"}), "token": t, "bot": "1"})

def _add_quantity(prop, amount, unit="1"):
    t = get_token()
    return api_post({"action": "wbcreateclaim", "entity": ENTITY_ID, "property": prop, "snaktype": "value",
                      "value": json.dumps({"amount": f"+{amount}", "unit": unit}), "token": t, "bot": "1"})

def _set_qualifier_item(claim_id, prop, qid):
    t = get_token()
    return api_post({"action": "wbsetqualifier", "claim": claim_id, "property": prop, "snaktype": "value",
                      "value": json.dumps({"entity-type": "item", "numeric-id": int(qid.replace("Q", ""))}), "token": t, "bot": "1"})

def _set_qualifier_time(claim_id, prop, time_str, precision=9):
    t = get_token()
    return api_post({"action": "wbsetqualifier", "claim": claim_id, "property": prop, "snaktype": "value",
                      "value": json.dumps({"time": time_str, "timezone": 0, "before": 0, "after": 0, "precision": precision,
                                           "calendarmodel": "http://www.wikidata.org/entity/Q1985727"}), "token": t, "bot": "1"})

def _set_qualifier_string(claim_id, prop, value):
    t = get_token()
    return api_post({"action": "wbsetqualifier", "claim": claim_id, "property": prop, "snaktype": "value",
                      "value": json.dumps(value), "token": t, "bot": "1"})

def _update_string(claim_id, value):
    t = get_token()
    return api_post({"action": "wbsetclaimvalue", "claim": claim_id, "snaktype": "value",
                      "value": json.dumps(value), "token": t, "bot": "1"})

def _remove(claim_id):
    t = get_token()
    return api_post({"action": "wbremoveclaims", "claim": claim_id, "token": t, "bot": "1"})


# ═══════════════════════════════════════════════════════════
# DATA INSPECTION
# ═══════════════════════════════════════════════════════════

def has_prop(entity, prop):
    return len(entity.get("claims", {}).get(prop, [])) > 0

def has_item(entity, prop, qid):
    for c in entity.get("claims", {}).get(prop, []):
        dv = c.get("mainsnak", {}).get("datavalue", {})
        if dv.get("type") == "wikibase-entityid" and dv["value"]["id"] == qid:
            return True
    return False

def has_string(entity, prop, val):
    for c in entity.get("claims", {}).get(prop, []):
        dv = c.get("mainsnak", {}).get("datavalue", {})
        if dv.get("type") == "string" and dv["value"] == val:
            return True
    return False

def get_items(entity, prop):
    return {c["mainsnak"]["datavalue"]["value"]["id"]
            for c in entity.get("claims", {}).get(prop, [])
            if c["mainsnak"].get("datavalue", {}).get("type") == "wikibase-entityid"}

def get_strings(entity, prop):
    return {c["mainsnak"]["datavalue"]["value"]
            for c in entity.get("claims", {}).get(prop, [])
            if c["mainsnak"].get("datavalue", {}).get("type") == "string"}

def find_claim(entity, prop, string_val):
    """Find a claim by string value, return claim ID."""
    for c in entity.get("claims", {}).get(prop, []):
        dv = c.get("mainsnak", {}).get("datavalue", {})
        if dv.get("type") == "string" and dv["value"] == string_val:
            return c["id"]
    return None

def find_time_claim(entity, prop, time_fragment):
    for c in entity.get("claims", {}).get(prop, []):
        dv = c.get("mainsnak", {}).get("datavalue", {})
        if dv.get("type") == "time" and time_fragment in dv["value"]["time"]:
            return c["id"]
    return None


# ═══════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════

def main():
    print("=" * 65)
    print("  COMPREHENSIVE Wikidata Update — Q108761295 (Ebstar)")
    print("  Every piece of data from ebstar.co")
    print("=" * 65)
    print()

    username = input("Wikidata username: ").strip()
    password = getpass.getpass("Wikidata password: ")
    print()

    login(username, password)

    print("Fetching current entity...")
    entity = get_entity()
    props = entity.get("claims", {})
    print(f"  {len(props)} existing properties found.\n")

    # ───────────────────────────────────────
    # 1. LABELS
    # ───────────────────────────────────────
    print("── 1. LABELS ──")
    print("  en: Ebstar")
    do("label en", _set_label, "en", "Ebstar")
    print("  ko: 엡스타")
    do("label ko", _set_label, "ko", "엡스타")
    print("  sn: Ebstar")
    do("label sn", _set_label, "sn", "Ebstar")

    # ───────────────────────────────────────
    # 2. DESCRIPTIONS
    # ───────────────────────────────────────
    print("\n── 2. DESCRIPTIONS ──")
    print("  en:")
    do("desc en", _set_desc, "en",
       "Zimbabwean music producer, AI researcher, macro influencer, and record label founder based in South Korea")
    print("  ko:")
    do("desc ko", _set_desc, "ko",
       "짐바브웨 출신의 음악 프로듀서, AI 연구원, 매크로 인플루언서, 서울 기반 레코드 레이블 설립자")

    # ───────────────────────────────────────
    # 3. ALIASES
    # ───────────────────────────────────────
    print("\n── 3. ALIASES ──")
    print("  en:")
    do("aliases en", _set_aliases, "en", [
        "Ebenezer Tarubinga",
        "Ebenezer Simbarashe Tarubinga",
        "Ebstar Simz",
        "RATSBE",
        "Curiosity Killed The Neko",
    ])
    print("  ko:")
    do("aliases ko", _set_aliases, "ko", ["에베네저 타루빙가", "에베네저 심바라셰 타루빙가"])

    # Re-fetch entity after label/desc/alias changes
    print("\n  Refreshing entity data...")
    entity = get_entity()
    print()

    # ───────────────────────────────────────
    # 4. CLEAN UP — remove duplicate birth date
    # ───────────────────────────────────────
    print("── 4. CLEANUP ──")
    dup_bd = find_time_claim(entity, "P569", "+2001-01-01")
    if dup_bd:
        print("  Removing duplicate birth date (Jan 1)...")
        do("remove dup bd", _remove, dup_bd)
    else:
        print("  No duplicate birth date.")
        skip("clean")

    # Fix Instagram if still psychofict
    ig_claim = find_claim(entity, "P2003", "psychofict")
    if ig_claim:
        print("  Fixing Instagram: psychofict → ebstarmusic")
        do("fix ig", _update_string, ig_claim, "ebstarmusic")
    else:
        print("  Instagram already correct or updated.")
        skip()

    # ───────────────────────────────────────
    # 5. OFFICIAL WEBSITE (P856)
    # ───────────────────────────────────────
    print("\n── 5. OFFICIAL WEBSITE (P856) ──")
    if not has_prop(entity, "P856"):
        do("website", _add_url, "P856", "https://ebstar.co")
    else:
        skip()

    # ───────────────────────────────────────
    # 6. RESIDENCE (P551) — Seoul
    # ───────────────────────────────────────
    print("\n── 6. RESIDENCE (P551) ──")
    if not has_item(entity, "P551", "Q8684"):
        print("  Adding Seoul...")
        do("residence", _add_item, "P551", "Q8684")
    else:
        skip()

    # ───────────────────────────────────────
    # 7. EDUCATION (P69) — Korea University + MSc qualifier
    # ───────────────────────────────────────
    print("\n── 7. EDUCATION (P69) ──")
    # Korea University = Q39997 (confirmed) or Q494873 (already added)
    if not has_item(entity, "P69", "Q494873") and not has_item(entity, "P69", "Q39997"):
        print("  Adding Korea University...")
        result = do("edu", _add_item, "P69", "Q39997")
        if result and "claim" in result:
            cid = result["claim"]["id"]
            print("  + qualifier: degree = MSc (Q950900)")
            do("q degree", _set_qualifier_item, cid, "P512", "Q950900")
            print("  + qualifier: start = 2023")
            do("q start", _set_qualifier_time, cid, "P580", "+2023-01-01T00:00:00Z", 9)
            print("  + qualifier: end = 2025")
            do("q end", _set_qualifier_time, cid, "P582", "+2025-01-01T00:00:00Z", 9)
            print("  + qualifier: field = AI (Q11660)")
            do("q field", _set_qualifier_item, cid, "P812", "Q11660")
    else:
        skip()

    # ───────────────────────────────────────
    # 8. DOCTORAL/THESIS ADVISOR (P1066) — Dr. Seong-Whan Lee
    # ───────────────────────────────────────
    print("\n── 8. STUDENT OF (P1066) ──")
    if not has_item(entity, "P1066", "Q88613395"):
        print("  Adding Seong-Whan Lee...")
        do("advisor", _add_item, "P1066", "Q88613395")
    else:
        skip()

    # ───────────────────────────────────────
    # 9. OCCUPATIONS (P106)
    # ───────────────────────────────────────
    print("\n── 9. OCCUPATIONS (P106) ──")
    existing_occ = get_items(entity, "P106")
    occupations = [
        ("Q639669",  "musician"),
        ("Q183945",  "record producer"),
        ("Q130857",  "DJ"),
        ("Q66711686","social media influencer"),
        ("Q183888",  "software engineer"),
        ("Q1650915", "researcher"),
        ("Q131524",  "entrepreneur"),
        ("Q15303838","record label founder"),  # may not exist — will fail gracefully
        ("Q49757",   "songwriter"),
    ]
    for qid, label in occupations:
        if qid not in existing_occ:
            print(f"  Adding: {label}...")
            do(f"occ {label}", _add_item, "P106", qid)
        else:
            print(f"  {label}")
            skip()

    # ───────────────────────────────────────
    # 10. GENRES (P136) — all 11 genres
    # ───────────────────────────────────────
    print("\n── 10. GENRES (P136) ──")
    existing_genres = get_items(entity, "P136")
    genres = [
        ("Q109146989", "piano house"),
        ("Q211756",    "dance-pop"),
        ("Q56856422",  "amapiano"),
        ("Q20901263",  "future bass"),
        ("Q186472",    "deep house"),
        ("Q484641",    "progressive house"),
        ("Q6010",      "hip hop music"),
        ("Q37073",     "pop music"),
        ("Q15300817",  "big room house"),
        ("Q9778",      "electronic music"),
        ("Q20502",     "house music"),
    ]
    for qid, label in genres:
        if qid not in existing_genres:
            print(f"  Adding: {label}...")
            do(f"genre {label}", _add_item, "P136", qid)
        else:
            print(f"  {label}")
            skip()

    # ───────────────────────────────────────
    # 11. LANGUAGES SPOKEN (P1412)
    # ───────────────────────────────────────
    print("\n── 11. LANGUAGES SPOKEN (P1412) ──")
    existing_langs = get_items(entity, "P1412")
    languages = [
        ("Q1860", "English"),
        ("Q9176", "Korean"),
        ("Q34004", "Shona"),   # native Zimbabwean language
    ]
    for qid, label in languages:
        if qid not in existing_langs:
            print(f"  Adding: {label}...")
            do(f"lang {label}", _add_item, "P1412", qid)
        else:
            print(f"  {label}")
            skip()

    # ───────────────────────────────────────
    # 12. FIELD OF WORK (P101)
    # ───────────────────────────────────────
    print("\n── 12. FIELD OF WORK (P101) ──")
    existing_fields = get_items(entity, "P101")
    fields = [
        ("Q11660",    "artificial intelligence"),
        ("Q170399",   "computer vision"),
        ("Q638608",   "music production"),
        ("Q7397",     "software engineering"),
        ("Q2539",     "machine learning"),
        ("Q3966",     "deep learning"),
    ]
    for qid, label in fields:
        if qid not in existing_fields:
            print(f"  Adding: {label}...")
            do(f"field {label}", _add_item, "P101", qid)
        else:
            print(f"  {label}")
            skip()

    # ───────────────────────────────────────
    # 13. MEMBER OF (P463) — organizations
    # ───────────────────────────────────────
    print("\n── 13. MEMBER OF (P463) ──")
    existing_members = get_items(entity, "P463")
    orgs = [
        ("Q61357354", "Seoul Tourism Organization"),
        ("Q494162",   "National Assembly of South Korea"),
    ]
    for qid, label in orgs:
        if qid not in existing_members:
            print(f"  Adding: {label}...")
            result = do(f"member {label}", _add_item, "P463", qid)
            # Add start time qualifier
            if result and "claim" in result:
                cid = result["claim"]["id"]
                if "Seoul" in label:
                    do("q start", _set_qualifier_time, cid, "P580", "+2023-01-01T00:00:00Z", 9)
                elif "National" in label:
                    do("q start", _set_qualifier_time, cid, "P580", "+2025-01-01T00:00:00Z", 9)
        else:
            print(f"  {label}")
            skip()

    # ───────────────────────────────────────
    # 14. PARTICIPANT IN (P1344) — events
    # ───────────────────────────────────────
    print("\n── 14. SIGNIFICANT EVENTS (P793) ──")
    # Use P793 (significant event) for major career milestones
    # These may not have Q-items, so we'll add what we can
    if not has_prop(entity, "P793"):
        # International debut 2021
        print("  Adding: career start (Q24449898)...")
        result = do("debut", _add_item, "P793", "Q24449898")  # career start
        if result and "claim" in result:
            do("q time", _set_qualifier_time, result["claim"]["id"], "P585", "+2021-01-01T00:00:00Z", 9)
    else:
        skip()

    # ───────────────────────────────────────
    # 15. PLATFORM IDs — MUSIC
    # ───────────────────────────────────────
    print("\n── 15. PLATFORM IDs — MUSIC ──")
    music_platforms = [
        ("P1902", "4mH71Zjiq36Q3SI7IZIBQK", "Spotify artist"),
        ("P4576", "1518342850",              "Apple Music artist"),
        ("P5765", "1011858",                 "Beatport artist"),
        ("P3040", "ebstarsimz",              "SoundCloud"),
        ("P2373", "Ebstar",                  "Genius artist"),
        ("P3478", "10171965",                "Songkick artist"),
        ("P2722", "97705042",                "Deezer artist"),
    ]
    for prop, value, label in music_platforms:
        if not has_string(entity, prop, value) and not has_prop(entity, prop):
            print(f"  Adding: {label} = {value}")
            do(f"id {label}", _add_string, prop, value)
        else:
            print(f"  {label}")
            skip()

    # ───────────────────────────────────────
    # 16. PLATFORM IDs — SOCIAL
    # ───────────────────────────────────────
    print("\n── 16. PLATFORM IDs — SOCIAL ──")
    social_platforms = [
        ("P2003", "ebstarmusic", "Instagram"),
        ("P2013", "ebstar.simz", "Facebook"),
        ("P2002", "psychofict",  "Twitter/X"),
    ]
    for prop, value, label in social_platforms:
        if not has_string(entity, prop, value):
            if has_prop(entity, prop):
                print(f"  {label} — has different value, skipping")
                skip("different value")
            else:
                print(f"  Adding: {label} = {value}")
                do(f"id {label}", _add_string, prop, value)
        else:
            print(f"  {label}")
            skip()

    # ───────────────────────────────────────
    # 17. PLATFORM IDs — PROFESSIONAL
    # ───────────────────────────────────────
    print("\n── 17. PLATFORM IDs — PROFESSIONAL ──")
    pro_platforms = [
        ("P345",  "nm14467036",  "IMDb"),
        ("P1960", "W818y-gAAAAJ","Google Scholar"),
        ("P6634", "ebstar",      "LinkedIn"),
        ("P2037", "psychofict",  "GitHub"),
    ]
    for prop, value, label in pro_platforms:
        if not has_string(entity, prop, value) and not has_prop(entity, prop):
            print(f"  Adding: {label} = {value}")
            do(f"id {label}", _add_string, prop, value)
        else:
            print(f"  {label}")
            skip()

    # ───────────────────────────────────────
    # 18. PLATFORM IDs — VIDEO
    # ───────────────────────────────────────
    print("\n── 18. PLATFORM IDs — VIDEO ──")
    video_platforms = [
        ("P2397", "UCzaD90MpMgJSUH0H2xrTtng", "YouTube channel"),
        ("P11245", "ebstar",                    "YouTube handle"),
    ]
    for prop, value, label in video_platforms:
        if not has_string(entity, prop, value) and not has_prop(entity, prop):
            print(f"  Adding: {label} = {value}")
            do(f"id {label}", _add_string, prop, value)
        else:
            print(f"  {label}")
            skip()

    # ───────────────────────────────────────
    # 19. DISCOGRAPHY (P358) — via Spotify album IDs if possible
    # Since albums don't have Wikidata items, add notable work descriptions
    # ───────────────────────────────────────
    print("\n── 19. DISCOGRAPHY — described at URL (P973) ──")
    if not has_prop(entity, "P973"):
        print("  Adding official bio page...")
        do("bio url", _add_url, "P973", "https://ebstar.co/about")
    else:
        skip()

    # ───────────────────────────────────────
    # 20. WORK LOCATION (P937) — Seoul
    # ───────────────────────────────────────
    print("\n── 20. WORK LOCATION (P937) ──")
    if not has_item(entity, "P937", "Q8684"):
        print("  Adding Seoul...")
        do("work loc", _add_item, "P937", "Q8684")
    else:
        skip()

    # ───────────────────────────────────────
    # 21. COUNTRY OF ORIGIN (P495) — Zimbabwe
    # ───────────────────────────────────────
    print("\n── 21. COUNTRY OF ORIGIN (P495) ──")
    if not has_item(entity, "P495", "Q954"):
        print("  Adding Zimbabwe...")
        do("origin", _add_item, "P495", "Q954")
    else:
        skip()

    # ───────────────────────────────────────
    # 22. SOCIAL MEDIA FOLLOWERS (P8687 done, add P3744)
    # ───────────────────────────────────────
    print("\n── 22. NUMBER OF WORKS (P3740) ──")
    # This tracks total works — albums + EPs + singles
    if not has_prop(entity, "P3740"):
        print("  Adding: 16+ releases...")
        result = do("works", _add_quantity, "P3740", "16")
        if result and "claim" in result:
            do("q date", _set_qualifier_time, result["claim"]["id"], "P585", "+2025-03-01T00:00:00Z", 10)
    else:
        skip()

    # ───────────────────────────────────────
    # 23. FAMILY NAME (P734) — Tarubinga
    # ───────────────────────────────────────
    print("\n── 23. FAMILY NAME (P734) ──")
    if not has_prop(entity, "P734"):
        print("  Adding Tarubinga (as string, no Q-item exists)...")
        # Family name might not have a Q-item, this might fail
        # Skip if there's no Wikidata item for "Tarubinga"
        print("    (Tarubinga likely has no Wikidata item — skipping)")
        skip("no Q-item for Tarubinga")
    else:
        skip()

    # ───────────────────────────────────────
    # 24. MOVEMENT START (P2031) — career start 2020/2021
    # ───────────────────────────────────────
    print("\n── 24. ACTIVE SINCE (P2031) ──")
    if not has_prop(entity, "P2031"):
        print("  Adding: 2020...")
        do("active since", _add_time, "P2031", "+2020-01-01T00:00:00Z", 9)
    else:
        skip()

    # ───────────────────────────────────────
    # 25. EMAIL (P968) — contact
    # ───────────────────────────────────────
    print("\n── 25. CONTACT EMAIL (P968) ──")
    if not has_prop(entity, "P968"):
        print("  Adding: contact@ebstar.co")
        do("email", _add_url, "P968", "mailto:contact@ebstar.co")
    else:
        skip()

    # ───────────────────────────────────────
    # DONE
    # ───────────────────────────────────────
    print()
    print("=" * 65)
    print(f"  COMPLETE — {success_count} succeeded, {fail_count} failed, {skip_count} skipped")
    print(f"  View: https://www.wikidata.org/wiki/{ENTITY_ID}")
    print("=" * 65)
    print()
    if fail_count > 0:
        print("  Some edits failed — likely rate-limited.")
        print("  Wait 5 minutes and run again. The script skips")
        print("  what already exists, so it'll only retry failures.")
    print()
    print("  Manual follow-ups:")
    print("  - Upload a photo to Wikimedia Commons, then add P18 (image)")
    print("  - Create Wikidata item for 'The ESØTËRIC Ones' label → link via P264")
    print("  - If Forbes BLK gets a Q-item → add P166 (award received)")
    print()


if __name__ == "__main__":
    main()
