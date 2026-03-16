export interface LabelPlaylist {
  title: string;
  description: string;
  spotifyUri: string;
  featured: boolean;
}

export const playlists: LabelPlaylist[] = [
  {
    title: "The ESOTERIC Ones \u2014 Best Of",
    description: "The definitive collection of the label's top tracks.",
    spotifyUri: "playlist/37i9dQZF1DX4JAvHpjipBk",
    featured: true,
  },
  {
    title: "Piano House Essentials",
    description: "Uplifting piano house from the ESOTERIC roster and beyond.",
    spotifyUri: "playlist/37i9dQZF1DX4JAvHpjipBk",
    featured: false,
  },
];

export function getFeaturedPlaylist(): LabelPlaylist | undefined {
  return playlists.find((p) => p.featured);
}
