export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "release" | "label" | "artist" | "event";
  image?: string;
  tags: string[];
}

export const newsPosts: NewsPost[] = [
  {
    slug: "kuzokhanya-out-now",
    title: "KUZOKHANYA ft. Roline \u2014 Out Now",
    excerpt: "Ebstar teams up with Roline for a vibrant piano house anthem that bridges South African and global dance floors.",
    content: `<p>We're thrilled to announce the release of <strong>KUZOKHANYA</strong>, the latest single from label founder <strong>Ebstar</strong> featuring the incredible <strong>Roline</strong>.</p>
<p>This track is a celebration of light and hope, built on a foundation of uplifting piano house melodies and Amapiano-infused rhythms. It represents everything The ESOTERIC Ones stands for \u2014 bridging cultures through sound.</p>
<p>Stream it now on all major platforms.</p>`,
    date: "2025-01-15",
    category: "release",
    tags: ["Ebstar", "Roline", "Piano House", "New Release"],
  },
  {
    slug: "ready-to-be-loved-release",
    title: "READY TO BE LOVED \u2014 New Single",
    excerpt: "A dance-pop anthem about vulnerability and openness from Ebstar.",
    content: `<p><strong>READY TO BE LOVED</strong> is the latest single from Ebstar, exploring themes of vulnerability and the courage it takes to open yourself up to love.</p>
<p>With its infectious piano house production and emotionally charged vocals, this track is a testament to the evolving sound of The ESOTERIC Ones.</p>`,
    date: "2025-01-10",
    category: "release",
    tags: ["Ebstar", "Dance-Pop", "New Release"],
  },
  {
    slug: "label-hits-5m-streams",
    title: "The ESOTERIC Ones Surpasses 5 Million Streams",
    excerpt: "A major milestone for the independent label as collective streams cross the 5M mark.",
    content: `<p>We're proud to announce that <strong>The ESOTERIC Ones</strong> has officially surpassed <strong>5 million streams</strong> across all platforms.</p>
<p>What started as a vision in Seoul in 2023 has grown into an international collective of 18+ artists across 6 countries. This milestone belongs to every artist on the roster, every collaborator, and every listener who has been part of this journey.</p>
<p>This is just the beginning. More music, more artists, more boundaries to break.</p>`,
    date: "2025-02-01",
    category: "label",
    tags: ["Milestone", "5M Streams", "Label News"],
  },
  {
    slug: "maknaebe-album-release",
    title: "Maknaebe (Deluxe Version) \u2014 A Joint Album by Ebstar & RATSBE",
    excerpt: "The 23-track collaborative album that blends hip-hop, R&B, and electronic music.",
    content: `<p>The collaborative album <strong>Maknaebe (Deluxe Version)</strong> from <strong>Ebstar</strong> and <strong>RATSBE</strong> is a genre-defying 23-track project that pushes the boundaries of what a label release can be.</p>
<p>Spanning hip-hop, R&B, Amapiano, and electronic music, Maknaebe is a testament to the creative chemistry between two of the label's most prolific artists.</p>`,
    date: "2024-06-01",
    category: "release",
    tags: ["Ebstar", "RATSBE", "Album", "Hip-Hop"],
  },
  {
    slug: "echoes-of-love-album",
    title: "ECHOES OF LOVE I (Deluxe Version) Released",
    excerpt: "Ebstar's most ambitious album yet \u2014 a love letter to piano house and dance music.",
    content: `<p><strong>ECHOES OF LOVE I (Deluxe Version)</strong> is here. This album represents the culmination of Ebstar's journey through piano house, deep house, and dance-pop.</p>
<p>Featuring standout tracks like <em>Seoul Love</em> and <em>But....I DONT TRUST YOU</em>, this project has already garnered hundreds of thousands of streams.</p>`,
    date: "2024-03-01",
    category: "release",
    tags: ["Ebstar", "Album", "Piano House", "Dance-Pop"],
  },
];

export function getPostBySlug(slug: string): NewsPost | undefined {
  return newsPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: NewsPost["category"]): NewsPost[] {
  return newsPosts.filter((p) => p.category === category);
}

export function getRecentPosts(count: number = 3): NewsPost[] {
  return [...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
}
