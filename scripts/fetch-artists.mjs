const clientId = "REDACTED_SPOTIFY_CLIENT_ID";
const clientSecret = "REDACTED_SPOTIFY_CLIENT_SECRET";

async function run() {
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  const tokenData = await tokenRes.json();
  console.log("Token expires_in:", tokenData.expires_in);
  const token = tokenData.access_token;

  // Debug: test with explicit URL construction
  const artistId = "4mH71Zjiq36Q3SI7IZIBQK";
  const albumUrl = new URL("https://api.spotify.com/v1/artists/" + artistId + "/albums");
  albumUrl.searchParams.set("include_groups", "album,single");
  albumUrl.searchParams.set("limit", "10");

  console.log("Fetching:", albumUrl.toString());

  const res = await fetch(albumUrl.toString(), {
    headers: { "Authorization": "Bearer " + token },
  });
  console.log("Status:", res.status);
  const body = await res.json();

  if (body.error) {
    console.log("Error:", body.error);
    return;
  }

  console.log("Total:", body.total, "Items:", body.items?.length);

  const allAlbums = body.items || [];
  let next = body.next;
  while (next) {
    const r = await fetch(next, { headers: { "Authorization": "Bearer " + token } });
    const d = await r.json();
    allAlbums.push(...(d.items || []));
    next = d.next;
  }

  console.log("All albums:", allAlbums.length);

  const allCollaborators = new Map();

  for (const album of allAlbums) {
    const tUrl = new URL("https://api.spotify.com/v1/albums/" + album.id + "/tracks");
    tUrl.searchParams.set("limit", "10");
    const tracksRes = await fetch(tUrl.toString(), { headers: { "Authorization": "Bearer " + token } });
    const tracks = await tracksRes.json();
    const featured = [];

    for (const track of tracks.items || []) {
      for (const a of track.artists || []) {
        if (a.name === "Ebstar") continue;
        featured.push(a.name);
        if (!allCollaborators.has(a.id)) {
          allCollaborators.set(a.id, { name: a.name, tracks: [], albums: [] });
        }
        allCollaborators.get(a.id).tracks.push(track.name);
        if (!allCollaborators.get(a.id).albums.includes(album.name)) {
          allCollaborators.get(a.id).albums.push(album.name);
        }
      }
    }

    if (featured.length > 0) {
      console.log(album.name + " [" + album.album_type + ", " + album.release_date + "]:");
      console.log("  Featured: " + [...new Set(featured)].join(", "));
    }
  }

  console.log("\n=== ALL COLLABORATORS ===");
  for (const [id, data] of allCollaborators) {
    console.log("\n" + data.name + " (" + id + "):");
    console.log("  Albums: " + data.albums.join(", "));
    console.log("  Tracks (" + data.tracks.length + "): " + data.tracks.join(", "));
  }
}
run();
