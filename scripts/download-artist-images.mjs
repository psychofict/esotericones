import fs from "fs";
import path from "path";

const artists = [
  { slug: "ebstar", id: "4mH71Zjiq36Q3SI7IZIBQK" },
  { slug: "skydawn", id: "793bhDcmWEx0ckHxH0UQI9" },
  { slug: "piecemaker", id: "1SQb5WKVjpyanwHqLkUV7p" },
  { slug: "ratsbe", id: "7cuc1B9yA2csJGjroiDBS3" },
  { slug: "team-g", id: "3fDivzG9IBCvbBAuFauqAV" },
  { slug: "karlost", id: "64MaOHRTg7LHvYARsKcIEz" },
  { slug: "tribal-muziq", id: "2Xp03G8NKUWt5pvXl0o2IH" },
  { slug: "illversemusic", id: "20jqps8kNI6szYEdgDrVtD" },
  { slug: "postythegod", id: "5DiHZs8ZxUogrlfCRT0ChJ" },
  { slug: "trigger-mufasa", id: "5JgQvb3yCjF6Alwg9v3bIb" },
  { slug: "gillianblxck", id: "68IW7yZEOIkQVo67b9dG3d" },
  { slug: "curiosity-killed-the-neko", id: "74PveSsj2OpgMlgQgZyLng" },
  { slug: "xia", id: "52YUDTVEj5AsobcovbyYhP" },
  { slug: "swedish-dance-glory", id: "1qX0JF6szdBLdtjpa6fX1P" },
  { slug: "regina-ashie", id: "1x05kodeykM1HvO2guBUwZ" },
  { slug: "roline", id: "3lIOi6MxKvEHLynnQcWElk" },
  { slug: "vmhp", id: "0aJrfz6zrfSiZQjYsryD8Z" },
  { slug: "esoterix", id: "7fzhxhN6jyT8dY5bbn6JLe" },
  { slug: "cj-melzy", id: "6A9ccy6EgtYnRchHdQTyfu" },
  { slug: "loxion-txi", id: "6yL0lba9uEN7FmY7up5t1t" },
  { slug: "makhathini", id: "4cbBvXi9JtmMThwioiVoek" },
  { slug: "thatgirlvee", id: "29i7guMzkvDOeEWBPMRSe4" },
];

const outDir = path.resolve("public/images/artists");

async function getImageUrl(spotifyId) {
  const url = `https://open.spotify.com/oembed?url=https://open.spotify.com/artist/${spotifyId}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  // Replace small thumbnail with larger version
  const thumb = data.thumbnail_url;
  if (!thumb) return null;
  // Convert 200x200 to 640x640 by changing the prefix
  return thumb.replace("ab67616100005174", "ab6761610000e5eb");
}

async function downloadImage(url, slug) {
  const filePath = path.join(outDir, `${slug}.jpg`);
  const res = await fetch(url);
  if (!res.ok) return false;
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  console.log(`  OK ${slug} (${(buffer.length / 1024).toFixed(0)}KB)`);
  return true;
}

async function run() {
  let downloaded = 0;
  let skipped = 0;

  for (const artist of artists) {
    const imageUrl = await getImageUrl(artist.id);
    if (imageUrl) {
      const ok = await downloadImage(imageUrl, artist.slug);
      if (ok) downloaded++;
      else skipped++;
    } else {
      console.log(`  SKIP ${artist.slug} (no image)`);
      skipped++;
    }
    // Small delay to be respectful
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone: ${downloaded} downloaded, ${skipped} skipped`);
}

run().catch(console.error);
