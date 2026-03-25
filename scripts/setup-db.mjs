/**
 * Create the purchases table in Neon.
 *
 * Usage:
 *   DATABASE_URL=postgres://... node scripts/setup-db.mjs
 */

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    release_slug TEXT NOT NULL,
    release_title TEXT NOT NULL,
    artist_names TEXT NOT NULL,
    format TEXT NOT NULL,
    amount_usd NUMERIC(10, 2) NOT NULL,
    stripe_session_id TEXT UNIQUE NOT NULL,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases (email)
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session ON purchases (stripe_session_id)
`;

console.log("Database setup complete — purchases table created.");
