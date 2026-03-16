import fs from "fs";
import path from "path";

const releases = [
  { slug: "kuzokhanya", id: "52rTZtmbEp1VNsj44ttuLO" },
  { slug: "ready-to-be-loved", id: "0wNJNjxA7Bmj0i7CaaU40v" },
  { slug: "washa", id: "2gzxkTytiDrjD5ORYw4Cge" },
  { slug: "adiwele", id: "00G4NYB9lLESY72agcsGI8" },
  { slug: "maknaebe-deluxe", id: "4xa01k8vEIqumeDMHegoP2" },
  { slug: "coming-back-for-more", id: "26kkRdv0k9ueKLRdFV0G5C" },
  { slug: "falling-for-love", id: "0rQQDhkaGOmqxMxt1H01ce" },
  { slug: "together-forever", id: "5IY2JwPR00FAwgaKL0Vx6S" },
  { slug: "echoes-of-love-i-deluxe", id: "6lJzDeHVkGbsLAYG5SohwR" },
  { slug: "ready-to-be-loved-og", id: "3fZBDeB9UKUVuTtdYZghC3" },
  { slug: "hard-times-dont-last", id: "6LR1hNRJA58fRUkqjU5O9d" },
  { slug: "lokshin", id: "255lmSBIPAgJWxXB44fQlN" },
  { slug: "but-i-dont-trust-you", id: "4aGgNPSee77X9YdiI2szus" },
  { slug: "rollercoaster", id: "3bnpBKH0c16XHWI5oYYkGQ" },
  { slug: "i-have-a-crush-on-you-remixes", id: "0ul67kwpuIXPukQJ7SMgiR" },
  { slug: "with-love-ebstar", id: "75iwN0MtpZoBmneKAUZiUF" },
  { slug: "messy-life", id: "1lKmGBWPhUcqTLo7TbgV5c" },
  { slug: "life-is-beautiful", id: "3ZHNSXWQZJ31leN1hYl4Un" },
  { slug: "aint-here-for-your-drama", id: "7cT1ssadNbVbzV23KgDQKW" },
  { slug: "twenty-something-special", id: "5PjC5wYr0HhK7VlkKxYU2Y" },
  { slug: "heart-arrhythmia-x", id: "0u2K3zGaD8TXfEyhFwJK2j" },
];

const outDir = path.resolve("public/images/releases");
fs.mkdirSync(outDir, { recursive: true });

async function getImageUrl(spotifyId) {
  const url = `https://open.spotify.com/oembed?url=https://open.spotify.com/album/${spotifyId}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const thumb = data.thumbnail_url;
  if (!thumb) return null;
  // Get larger image by replacing size prefix
  return thumb.replace("ab67616d00001e02", "ab67616d0000b273");
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

  for (const release of releases) {
    const imageUrl = await getImageUrl(release.id);
    if (imageUrl) {
      const ok = await downloadImage(imageUrl, release.slug);
      if (ok) downloaded++;
      else skipped++;
    } else {
      console.log(`  SKIP ${release.slug} (no image)`);
      skipped++;
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone: ${downloaded} downloaded, ${skipped} skipped`);
}

run().catch(console.error);
