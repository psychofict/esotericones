/**
 * Fetches Spotify album IDs for missing releases using ISRCs,
 * updates releases.ts, and downloads artwork.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// One representative ISRC per missing release (first track from CSV)
const MISSING = [
  { slug: "thatha-konke",             isrc: "QZWV32535825" },
  { slug: "mkhuzeni-bo",              isrc: "QZZ8A2462524" },
  { slug: "lil-light",                isrc: "QZZ8A2462628" },
  { slug: "long-story-ep",            isrc: "QZZ8A2411072" },
  { slug: "haike",                    isrc: "QZWDE2437147" },
  { slug: "side-effects-of-solitude", isrc: "QZWDD2488939" },
  { slug: "isgubhu-woza",             isrc: "GBWUL2430093" },
  { slug: "story-to-tell-ep",         isrc: "GBRKQ2481365" },
  { slug: "kyun-tu-aisi-hai",         isrc: "SE5BU2439150" },
  { slug: "bayeke",                   isrc: "SE6SA2322268" },
  { slug: "bitch-im-back",            isrc: "SE6XW2343128" },
  { slug: "puma",                     isrc: "SE6SA2291787" },
];

// --- Spotify auth ---
const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET");
  process.exit(1);
}

async function getToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
}

async function getAlbumIdByISRC(isrc, token) {
  const url = `https://api.spotify.com/v1/search?q=isrc:${isrc}&type=track&limit=1`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    console.warn(`  WARN search failed for ISRC ${isrc}: ${res.status}`);
    return null;
  }
  const data = await res.json();
  const track = data?.tracks?.items?.[0];
  if (!track) {
    console.warn(`  WARN no track found for ISRC ${isrc}`);
    return null;
  }
  return { albumId: track.album.id, trackName: track.name, albumName: track.album.name };
}

async function getImageUrl(albumId) {
  const url = `https://open.spotify.com/oembed?url=https://open.spotify.com/album/${albumId}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const thumb = data.thumbnail_url;
  if (!thumb) return null;
  return thumb.replace("ab67616d00001e02", "ab67616d0000b273");
}

async function downloadImage(imageUrl, slug) {
  const outDir = path.join(ROOT, "public/images/releases");
  fs.mkdirSync(outDir, { recursive: true });
  const filePath = path.join(outDir, `${slug}.jpg`);
  const res = await fetch(imageUrl);
  if (!res.ok) return false;
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  console.log(`  IMG  ${slug}.jpg (${(buffer.length / 1024).toFixed(0)}KB)`);
  return true;
}

function updateReleasesTs(slug, albumId) {
  const filePath = path.join(ROOT, "src/data/releases.ts");
  let content = fs.readFileSync(filePath, "utf8");

  // Replace spotifyId: "" and spotifyUri: "" for this slug
  // Pattern: find the slug entry and replace empty spotifyId/Uri
  const slugPattern = new RegExp(
    `(slug: "${slug}",[\\s\\S]*?spotifyId: ")(")([\\s\\S]*?spotifyUri: ")(")`,
    "m"
  );
  const updated = content.replace(slugPattern, `$1${albumId}$3album/${albumId}"`);
  if (updated === content) {
    console.warn(`  WARN could not update releases.ts for ${slug}`);
    return false;
  }
  fs.writeFileSync(filePath, updated, "utf8");
  return true;
}

async function run() {
  console.log("Getting Spotify token...");
  const token = await getToken();

  const results = [];

  for (const { slug, isrc } of MISSING) {
    console.log(`\n[${slug}] ISRC: ${isrc}`);
    const info = await getAlbumIdByISRC(isrc, token);
    if (!info) {
      results.push({ slug, status: "no-match" });
      await new Promise((r) => setTimeout(r, 300));
      continue;
    }

    console.log(`  TRACK "${info.trackName}" → album "${info.albumName}" (${info.albumId})`);

    // Update releases.ts
    const updated = updateReleasesTs(slug, info.albumId);
    if (updated) console.log(`  TS   releases.ts updated`);

    // Download artwork
    const imageUrl = await getImageUrl(info.albumId);
    if (imageUrl) {
      await downloadImage(imageUrl, slug);
    } else {
      console.warn(`  WARN no artwork for ${slug}`);
    }

    results.push({ slug, albumId: info.albumId, status: "ok" });
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("\n=== Summary ===");
  for (const r of results) {
    console.log(`  ${r.status === "ok" ? "✓" : "✗"} ${r.slug}${r.albumId ? ` → ${r.albumId}` : ""}`);
  }
}

run().catch(console.error);
