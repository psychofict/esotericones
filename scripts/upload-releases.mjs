/**
 * Upload release ZIP files to Vercel Blob storage.
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx node scripts/upload-releases.mjs
 *
 * Before running:
 * 1. Create ZIP files for each release (WAV and/or MP3)
 * 2. Update the `releases` array below with local file paths
 * 3. Set your BLOB_READ_WRITE_TOKEN from Vercel dashboard
 */

import { put } from "@vercel/blob";
import { createReadStream, existsSync, statSync } from "fs";

// Add releases here as you prepare ZIP files
const releases = [
  // Example:
  // {
  //   slug: "echoes-of-love",
  //   wavZip: "/path/to/echoes-of-love-wav.zip",
  //   mp3Zip: "/path/to/echoes-of-love-mp3.zip",
  // },
];

async function upload() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Error: BLOB_READ_WRITE_TOKEN is required");
    process.exit(1);
  }

  if (releases.length === 0) {
    console.log("No releases configured. Edit this script to add releases.");
    process.exit(0);
  }

  for (const release of releases) {
    console.log(`\n--- ${release.slug} ---`);

    for (const [format, path] of [["wav", release.wavZip], ["mp3", release.mp3Zip]]) {
      if (!path) {
        console.log(`  ${format.toUpperCase()}: skipped (no path)`);
        continue;
      }

      if (!existsSync(path)) {
        console.log(`  ${format.toUpperCase()}: skipped (file not found: ${path})`);
        continue;
      }

      const size = statSync(path).size;
      const sizeMB = (size / 1024 / 1024).toFixed(1);
      console.log(`  ${format.toUpperCase()}: uploading ${sizeMB} MB...`);

      const blobKey = `releases/${release.slug}/${release.slug}-${format}.zip`;
      const stream = createReadStream(path);

      const blob = await put(blobKey, stream, {
        access: "public",
        addRandomSuffix: false,
        contentType: "application/zip",
      });

      console.log(`  ${format.toUpperCase()}: uploaded → ${blob.url}`);
      console.log(`  Add to releases.ts: blobPath${format.charAt(0).toUpperCase() + format.slice(1)}: "${blob.url}"`);
    }
  }

  console.log("\nDone! Update src/data/releases.ts with the blob URLs above.");
}

upload().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
