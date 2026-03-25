#!/usr/bin/env python3
"""Add P18 (image) to Q108761295 — Ebstar-profile.jpg from Wikimedia Commons."""

import getpass
import json
import requests
import sys

ENTITY_ID = "Q108761295"
API_URL = "https://www.wikidata.org/w/api.php"
IMAGE_FILE = "Ebstar-profile.jpg"

session = requests.Session()
session.headers.update({
    "User-Agent": "EbstarWikidataBot/1.0 (https://ebstar.co; contact@ebstar.co)",
})


def api_get(params):
    params["format"] = "json"
    return session.get(API_URL, params=params).json()


def api_post(params):
    params["format"] = "json"
    return session.post(API_URL, data=params).json()


def get_token(t="csrf"):
    return api_get({"action": "query", "meta": "tokens", "type": t})["query"]["tokens"][f"{t}token"]


username = input("Wikidata username: ").strip()
password = getpass.getpass("Wikidata password: ")

# Login
lt = get_token("login")
r = api_post({"action": "login", "lgname": username, "lgpassword": password, "lgtoken": lt})
if r["login"]["result"] != "Success":
    print(f"Login failed: {r['login']}")
    sys.exit(1)
print("Logged in.\n")

# Check if P18 already exists
entity = api_get({"action": "wbgetentities", "ids": ENTITY_ID})["entities"][ENTITY_ID]
if "P18" in entity.get("claims", {}):
    print("P18 (image) already exists. Done.")
    sys.exit(0)

# Add image
token = get_token()
result = api_post({
    "action": "wbcreateclaim",
    "entity": ENTITY_ID,
    "property": "P18",
    "snaktype": "value",
    "value": json.dumps(IMAGE_FILE),
    "token": token,
    "bot": "1",
})

if "error" in result:
    print(f"Error: {result['error']}")
else:
    print(f"Added P18 (image): {IMAGE_FILE}")
    print(f"View: https://www.wikidata.org/wiki/{ENTITY_ID}")
