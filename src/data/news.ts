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
    title: "KUZOKHANYA \u2014 Out Now",
    excerpt: "PieceMaker, Regina Ashie, and Ebstar deliver the label\u2019s most fully realised Amapiano production yet \u2014 and introduce Roline\u2019s voice to the ES\u00D8T\u00CBRIC catalog.",
    content: `<p><em>KUZOKHANYA</em> is here. The latest release from The ES\u00D8T\u00CBRIC Ones brings together four artists who each add something irreplaceable: PieceMaker\u2019s floor-focused Amapiano framework, Regina Ashie\u2019s soulful Afrobeats and R&amp;B vocals, Roline\u2019s commanding feature, and Ebstar\u2019s production fingerprint holding everything together.</p>
<p>The title means \u201cit will shine.\u201d The track earns it.</p>
<p>Stream KUZOKHANYA now on all major platforms.</p>`,
    date: "2025-01-15",
    category: "release",
    image: "/images/releases/kuzokhanya.jpg",
    tags: ["Ebstar", "PieceMaker", "Regina Ashie", "Roline", "Amapiano", "New Release"],
  },
  {
    slug: "ready-to-be-loved-release",
    title: "READY TO BE LOVED \u2014 Out Now",
    excerpt: "Ebstar and SkyDAWN return together on a hip-hop anthem about the courage it takes to stay open \u2014 and it\u2019s the most emotionally direct thing either of them has released.",
    content: `<p><em>READY TO BE LOVED</em> is the latest single from Ebstar, featuring long-time collaborator SkyDAWN. The track sits in the hip-hop space but carries the same emotional weight that defines the best of the ES\u00D8T\u00CBRIC catalog: a production built around vulnerability, and vocals that make that vulnerability feel earned.</p>
<p>Available now on all platforms.</p>`,
    date: "2025-01-10",
    category: "release",
    image: "/images/releases/ready-to-be-loved.jpg",
    tags: ["Ebstar", "SkyDAWN", "Hip-Hop", "New Release"],
  },
  {
    slug: "thatha-konke-out-now",
    title: "THATHA KONKE \u2014 Out Now",
    excerpt: "PieceMaker assembles the label\u2019s most Southern African lineup yet \u2014 and the result is five and a half minutes of Amapiano that sounds like it was made to be played loud outdoors.",
    content: `<p><em>THATHA KONKE</em> is PieceMaker at his most collaborative \u2014 four artists from Zimbabwe and South Africa (PieceMaker, Loxion TXI, Mfanakithi, Makhathini) making an Amapiano track that carries the combined weight of everything they each bring.</p>
<p>Rooted in township rhythms, forward in execution, and built for the kind of room where no one\u2019s watching from the side \u2014 everyone is in it together. Stream it now on all platforms.</p>`,
    date: "2025-06-01",
    category: "release",
    image: "/images/releases/thatha-konke.jpg",
    tags: ["PieceMaker", "Loxion TXI", "Mfanakithi", "Makhathini", "Amapiano", "New Release"],
  },
  {
    slug: "label-hits-5m-streams",
    title: "The ESOTERIC Ones Surpasses 5 Million Streams",
    excerpt: "From Bulawayo to 5 million streams across 6 countries \u2014 a milestone that belongs to every artist, collaborator, and early listener who was part of the journey.",
    content: `<p>The ES\u00D8T\u00CBRIC Ones has officially crossed 5 million streams across all platforms. A label founded in Seoul by a self-taught Zimbabwean producer, with no major backing and no industry blueprint, built a 24-artist collective spanning 6 countries and 30+ releases through music alone.</p>
<p>The catalog has charted in South Korea, Luxembourg, and Estonia. This milestone belongs to every artist on the roster, every collaborator who took a chance, and every listener who found something in these records that felt made for them.</p>
<p>More music, more artists, more borders to ignore.</p>`,
    date: "2025-02-01",
    category: "label",
    image: "/images/news/million-streams.jpg",
    tags: ["Milestone", "5M Streams", "Label News"],
  },
  {
    slug: "maknaebe-album-release",
    title: "Maknaebe (Deluxe Version) \u2014 Out Now",
    excerpt: "A 23-track journey through Ebstar\u2019s full creative range \u2014 from house to Amapiano to electro-pop to bass music, all in one place and entirely coherent.",
    content: `<p><em>Maknaebe (Deluxe Version)</em> arrived November 29, 2024 \u2014 Ebstar\u2019s birthday \u2014 and it\u2019s the record that most completely maps what this label\u2019s sound actually is. Twenty-three tracks spanning house, deep house, Amapiano, electro-pop, bass house, and R&amp;B, featuring collaborations with VMHP, RATSBE, PieceMaker, Postythegod, and SkyDAWN.</p>
<p>The range should feel scattered. It doesn\u2019t. Ebstar\u2019s creative sensibility holds everything together.</p>
<p>Stream <em>Maknaebe</em> now on all platforms.</p>`,
    date: "2024-11-29",
    category: "release",
    image: "/images/news/maknaebe-album.jpg",
    tags: ["Ebstar", "RATSBE", "Album", "Amapiano", "House"],
  },
  {
    slug: "echoes-of-love-album",
    title: "ECHOES OF LOVE I (Deluxe Version) \u2014 Out Now",
    excerpt: "Forty tracks. The full ES\u00D8T\u00CBRIC Ones ecosystem in one place. The album that put the label on the chart.",
    content: `<p><em>ECHOES OF LOVE I (Deluxe Version)</em> (June 2024) is the ES\u00D8T\u00CBRIC Ones at full capacity \u2014 a 40-track compilation spanning every collaborator, alias, and sonic direction the label has explored.</p>
<p>\u201cThe Breakup Anthem\u201d (with VMHP) became Ebstar\u2019s highest-charting track, reaching #45 in South Korea. \u201cBut....I DONT TRUST YOU\u201d charted at #41 in Luxembourg. The full album also features \u590F Xi\u00E0, Swedish Dance Glory, Curiosity Killed The Neko, SkyDAWN, KARLOST, illversemusic, ES\u00D8T\u00CBRIX, and Cryogenic Guru.</p>
<p>A complete picture of what this label is. Stream it now.</p>`,
    date: "2024-06-01",
    category: "release",
    image: "/images/news/echoes-of-love-release.jpg",
    tags: ["Ebstar", "Album", "Piano House", "Compilation"],
  },
  {
    slug: "forbes-blk-feature",
    title: "Ebstar Featured in Forbes BLK",
    excerpt: "The ES\u00D8T\u00CBRIC Ones founder gets his moment in Forbes BLK \u2014 and uses it to talk about what comes next.",
    content: `<p>Label founder Ebstar has been featured in <strong>Forbes BLK</strong>, recognised for his work building The ES\u00D8T\u00CBRIC Ones into a global independent label from Seoul, South Korea.</p>
<p>The feature covers his journey from Bulawayo, Zimbabwe to Korea, his parallel career in AI research at Korea University, and the vision that has taken the label from a founding idea to 24 artists across 6 countries and 5 million streams.</p>
<p>More than a profile \u2014 a blueprint for what independent music can look like when you stop waiting for permission.</p>`,
    date: "2024-11-15",
    category: "label",
    image: "/images/news/forbes-blk.jpg",
    tags: ["Ebstar", "Forbes BLK", "Media", "Recognition"],
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
