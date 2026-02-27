export const artist = {
  name: "Ebstar",
  realName: "Ebenezer Tarubinga",
  from: "Africa",
  basedIn: "Seoul, South Korea",
  label: "The ESØTËRIC Ones",
  labelFounded: 2023,
  contact: "contact@ebstar.co",
  tagline: "AI by Profession. Music by Obsession. Travel by Instinct.",
  bio: `Ebstar is a Seoul-based music producer, AI/ML engineer, macro influencer, and record label founder. Since his international debut in 2021, he has built a career that refuses to fit into a single lane.

His productions — spanning piano house, dance-pop, Amapiano, and everything in between — have surpassed 5 million streams. Within a year of picking up production, he ranked #290 on SkioMusic's World Producer Chart. By 2023, he had launched his own label, The ESØTËRIC Ones, home to 15+ artists across 6 countries.

On the academic side, Ebstar holds an MSc in Artificial Intelligence from Korea University, where he published research in computer vision at top-tier venues including IJCNN and Neural Networks. He now works as an AI Research Engineer building production CV/ML systems for smart city infrastructure.

Off-screen, he is one of South Korea's most visible foreign public figures — 150K+ Instagram followers, 10M+ views, 50+ brand partnerships, and government appointments ranging from the Seoul Tourism Organisation to GINCON Committee Member in South Korea's National Assembly. Forbes BLK inductee. Met the Zimbabwean President at the Korea-Africa Summit.

Not bad for someone who does all four at once.`,
  genres: [
    "Piano House", "Dance-Pop", "Deep House", "Progressive House",
    "Future Bass", "Amapiano", "Pop", "Big Room", "Hip-Hop"
  ],
};

export const stats = [
  { label: "Total Streams", value: "5M+", icon: "music" },
  { label: "Instagram Followers", value: "150K+", icon: "users" },
  { label: "Social Media Views", value: "10M+", icon: "eye" },
  { label: "Brand Collaborations", value: "50+", icon: "handshake" },
];

export const socials = [
  { name: "Spotify", url: "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK", icon: "spotify" },
  { name: "Apple Music", url: "https://music.apple.com/us/artist/ebstar/1518342850", icon: "apple" },
  { name: "SoundCloud", url: "https://soundcloud.com/ebstarsimz", icon: "soundcloud" },
  { name: "Instagram", url: "https://instagram.com/ebstarmusic", icon: "instagram" },
  { name: "Facebook", url: "https://facebook.com/ebstar.simz", icon: "facebook" },
  { name: "Twitter/X", url: "https://twitter.com/psychofict", icon: "twitter" },
  { name: "IMDB", url: "https://www.imdb.com/name/nm14467036/", icon: "film" },
  { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ebstar", icon: "book" },
];

export const albums = [
  {
    id: "life-is-beautiful",
    title: "Life Is Beautiful",
    year: 2022,
    tracks: 10,
    duration: "32 min",
    type: "album" as const,
    spotifyId: "3ZHNSXWQZJ31leN1hYl4Un",
    spotifyUrl: "https://open.spotify.com/album/3ZHNSXWQZJ31leN1hYl4Un",
    appleMusicUrl: "https://music.apple.com/us/artist/ebstar/1518342850",
  },
  {
    id: "with-love-ebstar",
    title: "With Love, Ebstar :)",
    year: 2023,
    type: "ep" as const,
    spotifyId: "75iwN0MtpZoBmneKAUZiUF",
    spotifyUrl: "https://open.spotify.com/album/75iwN0MtpZoBmneKAUZiUF",
    appleMusicUrl: "https://music.apple.com/us/artist/ebstar/1518342850",
  },
  {
    id: "crush-on-you-remixes",
    title: "I Have a Crush on You (2 Year Anniversary Deluxe) [Remixes]",
    year: 2023,
    type: "ep" as const,
    spotifyId: "75iwN0MtpZoBmneKAUZiUF",
    spotifyUrl: "https://open.spotify.com/album/75iwN0MtpZoBmneKAUZiUF",
    appleMusicUrl: "https://music.apple.com/us/artist/ebstar/1518342850",
  },
  {
    id: "echoes-of-love",
    title: "ECHOES OF LOVE I (Deluxe Version)",
    year: 2024,
    type: "album" as const,
    spotifyId: "6lJzDeHVkGbsLAYG5SohwR",
    spotifyUrl: "https://open.spotify.com/album/6lJzDeHVkGbsLAYG5SohwR",
    appleMusicUrl: "https://music.apple.com/us/artist/ebstar/1518342850",
  },
  {
    id: "maknaebe",
    title: "Maknaebe (Deluxe Version)",
    year: 2024,
    tracks: 23,
    duration: "1hr 8min",
    type: "album" as const,
    artist: "w/ RATSBE",
    spotifyId: "4xa01k8vEIqumeDMHegoP2",
    spotifyUrl: "https://open.spotify.com/album/4xa01k8vEIqumeDMHegoP2",
    appleMusicUrl: "https://music.apple.com/us/artist/ebstar/1518342850",
  },
];

export const singles = [
  { title: "KUZOKHANYA", year: 2025, feat: "Roline", spotifyId: "52rTZtmbEp1VNsj44ttuLO", spotifyType: "album" as const },
  { title: "READY TO BE LOVED", year: 2025, spotifyId: "0wNJNjxA7Bmj0i7CaaU40v", spotifyType: "album" as const },
  { title: "Adiwele", year: 2024, feat: "Trigger Mufasa & GillianBlxck", spotifyId: "00G4NYB9lLESY72agcsGI8", spotifyType: "album" as const },
  { title: "Washa!", year: 2024, feat: "Trigger Mufasa & GillianBlxck", spotifyId: "2gzxkTytiDrjD5ORYw4Cge", spotifyType: "album" as const },
  { title: "COMING BACK FOR MORE", year: 2024, spotifyId: "26kkRdv0k9ueKLRdFV0G5C", spotifyType: "album" as const },
  { title: "Falling For Love", year: 2024, spotifyId: "0rQQDhkaGOmqxMxt1H01ce", spotifyType: "album" as const },
  { title: "Together Forever", year: 2024, spotifyId: "5IY2JwPR00FAwgaKL0Vx6S", spotifyType: "album" as const },
  { title: "Hard Times Don't Last", year: 2024, spotifyId: "6LR1hNRJA58fRUkqjU5O9d", spotifyType: "album" as const },
  { title: "But....I DONT TRUST YOU", year: 2024, spotifyId: "4aGgNPSee77X9YdiI2szus", spotifyType: "album" as const },
  { title: "LOKSHIN", year: 2024, feat: "Trigger Mufasa & GillianBlxck", spotifyId: "255lmSBIPAgJWxXB44fQlN", spotifyType: "album" as const },
  { title: "Ain't Here for Your Drama", year: 2022, spotifyId: "7cT1ssadNbVbzV23KgDQKW", spotifyType: "album" as const },
];

export const topTracks = [
  { title: "After The Storm, You'll See The Sun", streams: "254,155", source: "With Love, Ebstar :)", spotifyUrl: "https://open.spotify.com/track/1o1Aqx9YlgfWkn0xuEhTLJ", albumId: "75iwN0MtpZoBmneKAUZiUF" },
  { title: "Seoul Love", streams: "188,000", source: "ECHOES OF LOVE I (Deluxe Version)", spotifyUrl: "https://open.spotify.com/track/4O4NYJVGHNGKAIuiUHavlP", albumId: "6lJzDeHVkGbsLAYG5SohwR" },
  { title: "I Could Be The One For You", streams: "67,459", source: "With Love, Ebstar :)", spotifyUrl: "https://open.spotify.com/track/3ch9w1LevBCtSezl61CFYt", albumId: "75iwN0MtpZoBmneKAUZiUF" },
  { title: "COMING BACK FOR MORE", streams: "51,305", source: "Single", spotifyUrl: "https://open.spotify.com/track/7HCJa4MeuAT14CsX6BxulP", albumId: "26kkRdv0k9ueKLRdFV0G5C" },
  { title: "But....I DONT TRUST YOU", streams: "38,237", source: "ECHOES OF LOVE I (Deluxe Version)", spotifyUrl: "https://open.spotify.com/track/2K4A72FxmLGgMUBat3qkji", albumId: "6lJzDeHVkGbsLAYG5SohwR" },
  { title: "The Breakup Anthem", streams: "28,306", source: "ECHOES OF LOVE I (Deluxe Version)", spotifyUrl: "https://open.spotify.com/track/2EpIKv03Cc0Irmw0atbkl6", albumId: "6lJzDeHVkGbsLAYG5SohwR" },
];

export const timeline = [
  { year: 2021, event: "International debut" },
  { year: 2022, event: 'Debut album "Life Is Beautiful" / #290 SkioMusic chart / Moved to South Korea / Started AI at GliT' },
  { year: 2023, event: "Founded The ESØTËRIC Ones / Multiple government appointments / Started MSc AI at Korea University" },
  { year: 2024, event: "Released ECHOES OF LOVE I & Maknaebe / Forbes BLK Member / Met Zimbabwean President at Korea-Africa Summit / Published CW-BASS research" },
  { year: 2025, event: "GINCON Committee Member (National Assembly) / MSc completed / AI Research Engineer at Gractor" },
];

export const macroInfluencer = [
  { year: "2025", org: "Seoul Tourism Organisation", role: "Global SeoulMates" },
  { year: "2025", org: "South Korea National Assembly", role: "GINCON Committee Member" },
  { year: "2025", org: "Gumi City", role: "Invited Influencer" },
  { year: "2025", org: "Samcheok City", role: "Invited Influencer" },
  { year: "2025", org: "Cheorwon-gun", role: "Invited Influencer" },
  { year: "2025", org: "Daegu City", role: "Invited Influencer" },
  { year: "2025", org: "Yeongwol-gun", role: "Invited Influencer" },
  { year: "2025", org: "Zimbabwean Community in South Korea (ZCSK)", role: "Director of Public Relations" },
  { year: "2025", org: "The Esoteric Ones Records", role: "Founder & CEO" },
  { year: "2024", org: "The Esoteric Ones Records", role: "Founder & CEO" },
  { year: "2024", org: "Seoul Tourism Organisation", role: "Global SeoulMates" },
  { year: "2024", org: "Forbes BLK", role: "Forbes BLK Member" },
  { year: "2024", org: "Korea-Africa Summit", role: "Meeting with Zimbabwean President" },
  { year: "2023", org: "Seoul Tourism Organisation", role: "Global SeoulMates" },
  { year: "2023", org: "Gyeonggi Provincial Government", role: "Oh My Gyeonggi Supporter" },
  { year: "2023", org: "KOFICE / Ministry of Culture, Sports and Tourism", role: "Outlookie Cultural Macro Influencer" },
  { year: "2023", org: "Korea Ministry of Foreign Affairs", role: "Korea Allimi" },
  { year: "2023", org: "Busan Metropolitan Government", role: "Busan English-City Activist" },
  { year: "2023", org: "Ministry of Foreign Affairs / Busan Metropolitan Govt", role: "Busan National Diplomacy Supporter" },
  { year: "2023", org: "Busan Metropolitan Government", role: "Busan World Expo Supporter" },
  { year: "2023", org: "UNESCO Korea / KOCIS", role: "UNESCO Dangjin Juldarigi Festival Macro Influencer" },
  { year: "2023", org: "Hello World Korea", role: "Glocal Crew Mate" },
  { year: "2023", org: "Jeonnam Provincial Government", role: "Jeonnam Provincial Macro Influencer" },
  { year: "2023", org: "Geumsan County", role: "Geumsan Insam Festival Macro Influencer" },
  { year: "2023", org: "DDP Seoul", role: "DDP Seoul Light — Special Press Guest" },
  { year: "2023", org: "Jeonju City", role: "Jeonju Tourism Seminar Macro Influencer" },
];

export const brandPartnerships = [
  { name: "Forbes BLK", category: "Media", logo: "/images/brands/forbes-blk.png" },
  { name: "Jetpac", category: "Travel & Lifestyle", logo: "/images/brands/jetpac.png" },
  { name: "Undercover Korea", category: "Travel & Lifestyle", logo: "/images/brands/undercover-korea.png" },
  { name: "Mobifren", category: "Tech", logo: "/images/brands/mobifren.png" },
  { name: "Seoul Tourism Organisation", category: "Government", logo: "/images/brands/seoul-tourism.svg" },
  { name: "Korea Ministry of Foreign Affairs", category: "Government", logo: "/images/brands/korea-mofa.svg" },
  { name: "Ministry of Culture, Sports and Tourism", category: "Government", logo: "/images/brands/korea-mcst.svg" },
  { name: "Gyeonggi Provincial Government", category: "Government", logo: "/images/brands/gyeonggi.svg" },
  { name: "Busan Metropolitan Government", category: "Government", logo: "/images/brands/busan.svg" },
  { name: "UNESCO Korea", category: "Government", logo: "/images/brands/unesco-korea.png" },
  { name: "N.O.R Seoul", category: "Lifestyle", logo: "/images/brands/nor-seoul.png" },
  { name: "Querer", category: "Lifestyle", logo: "/images/brands/querer.jpg" },
  { name: "High Healing One Resort", category: "Travel & Lifestyle", logo: "/images/brands/high-healing-one-resort.png" },
  { name: "Reone Dermatology", category: "Beauty & Wellness", logo: "/images/brands/reone-dermatology.png" },
  { name: "Simon Kagggwa Njala", category: "Fashion", logo: "/images/brands/simon-kaggwa-njala.webp" },
];

export const eventAppearances = [
  { name: "Korea-Africa Summit", year: "2024", type: "Government" },
  { name: "Korea Blockchain Week", year: "2024", type: "Tech" },
  { name: "Korea Fashion Week", year: "2024", type: "Fashion" },
  { name: "Seoul Africa Festival", year: "2023", type: "Culture" },
  { name: "Seoul Africa Festival", year: "2024", type: "Culture" },
  { name: "Seoul Africa Festival", year: "2025", type: "Culture" },
  { name: "DDP Seoul Light", year: "2023", type: "Culture" },
  { name: "GINCON National Assembly Ceremony", year: "2025", type: "Government" },
  { name: "Geumsan Insam Festival", year: "2023", type: "Culture" },
  { name: "Geumsan Insam Festival", year: "2024", type: "Culture" },
  { name: "Korea-Africa Startup Forum", year: "2023", type: "Government" },
  { name: "Korea-Africa Startup Forum", year: "2024", type: "Government" },
  { name: "Korea-Africa Startup Forum", year: "2025", type: "Government" },
];



export const aiProfile = {
  title: "ML/CV Engineer",
  education: {
    school: "Korea University",
    degree: "Master of Science, Artificial Intelligence",
    years: "2023 – 2025",
    advisor: "Dr. Seong-Whan Lee",
    advisorUrl: "https://pure.korea.ac.kr/en/persons/seong-whan-lee",
    labUrl: "https://xai.korea.ac.kr/",
    logo: "/images/ai/korea-university.png",
  },
  bio: "AI/ML Engineer with an MSc in Artificial Intelligence from Korea University, where he conducted research under Dr. Seong-Whan Lee at the Pattern Recognition & Machine Learning Lab. With 4+ years spanning software engineering, deep learning, and computer vision, Ebstar has published at top-tier venues (IJCNN, Neural Networks), built production CV/ML pipelines for smart city systems, and led R&D across semantic segmentation, depth estimation, object detection, and dense matching. His work bridges academic research with real-world deployment — from autonomous driving perception to AIoT infrastructure.",
  links: {
    googleScholar: "https://scholar.google.com/citations?user=W818y-gAAAAJ&hl=en",
    linkedin: "https://www.linkedin.com/in/ebstar",
    github: "https://github.com/psychofict",
    cv: "/data/ebstar_cv.pdf",
  },
  skills: [
    { category: "Vision Tasks", icon: "eye" as const, items: "Scene classification, object detection/tracking, semantic segmentation, depth estimation" },
    { category: "Frameworks & Tools", icon: "wrench" as const, items: "PyTorch, TensorFlow, OpenCV, CUDA, ONNX, Docker, Blender, Unity" },
    { category: "Languages", icon: "code" as const, items: "Python, C++, C#, Bash, Java" },
    { category: "Other", icon: "layers" as const, items: "MLflow, Agile development, CI/CD, NVIDIA Jetson, academic writing, stakeholders" },
  ],
  publications: [
    {
      title: "CW-BASS: Confidence-Weighted Boundary Aware Learning for Semi-Supervised Semantic Segmentation",
      authors: ["Ebenezer Tarubinga", "Jenifer Kalafatovich", "Seong-Whan Lee"],
      venue: "IJCNN 2025",
      description: "Tackled boundary blur and confirmation bias using confidence-weighted and boundary-focused techniques to improve segmentation performance.",
      projectPage: "https://psychofict.github.io/CW-BASS/",
      code: "https://github.com/psychofict/CW-BASS",
      paper: "https://arxiv.org/abs/2502.15152",
      image: "/images/ai/cw-bass.gif",
      featured: true,
    },
    {
      title: "FARCLUSS: Fuzzy Adaptive Rebalancing and Contrastive Uncertainty Learning for Semi-Supervised Semantic Segmentation",
      authors: ["Ebenezer Tarubinga", "Jenifer Kalafatovich", "Seong-Whan Lee"],
      venue: "Neural Networks (Elsevier) – Under Review",
      description: "Introduced fuzzy labels and lightweight contrastive learning to improve generalization in semi-supervised semantic segmentation.",
      code: "https://github.com/psychofict/FARCLUSS",
      paper: "https://arxiv.org/abs/2506.11142",
      image: "/images/ai/farcluss.png",
      featured: true,
    },
  ],
  projects: [
    { title: "Dual-Embedding Guided Backdoor Attack on Multimodal Contrastive Learning", category: "Computer Vision", url: "https://drive.google.com/file/d/1OnPxU3cuqhB0uwFL-8w2sg2gjNiUdZNB/view" },
    { title: "Semantic-Aware Multi-Label Adversarial Attacks", category: "Computer Vision", url: "https://drive.google.com/file/d/16gKQe9vyjaXc6fQhMEOzhQRfN6H8z__J/view" },
    { title: "Self-Training for Semi-Supervised Semantic Segmentation", category: "Computer Vision", url: "https://drive.google.com/file/d/1CRrbuWRL5Z9S_eKx_QkYUsb3n1NkhzUE/view" },
    { title: "Scalable Urban Dynamic Scenes (NeRF)", category: "Computer Vision", url: "https://drive.google.com/file/d/14LQN0Unb1tJavcTr7AYmPZVBt92rj6xB/view" },
    { title: "Speech Emotion Recognition", category: "Computer Vision", url: "https://drive.google.com/file/d/17m_8mXF4cP9DntNO1NJMwAytBEngz5P_/view" },
    { title: "Autoregressive Text-to-Image Generation (Parti)", category: "Generative Models", url: "https://drive.google.com/file/d/1jy_r4eKG322j0h5cY-CTmj8u9bpGjEFq/view" },
    { title: "Controllable Text-to-Image Generation (ControlGAN)", category: "Generative Models", url: "https://drive.google.com/file/d/16ILtyVb_ASF5Fq9BhgZdV0KVKzu4uuUc/view" },
    { title: "Diffusion Based Text-to-Image Generation (Imagen)", category: "Generative Models", url: "https://drive.google.com/file/d/1zqBFEC-k8MiEbeUu9r3_e6C3_1GNZUU5/view" },
    { title: "Aligning SAM to Open Context via Reinforcement Learning", category: "Reinforcement Learning", url: "https://drive.google.com/file/d/1mCw1k8wDHTo0PgHdmkmQjVq4SwS8pLyB/view" },
    { title: "Tool-Augmented Reward Modeling (Themis)", category: "Reinforcement Learning", url: "https://drive.google.com/file/d/1-aVQq_DWq7Xy2AIoedg5iGSFmgkgWtOB/view" },
    { title: "ASD Classification with Multi-Site fMRI Data", category: "Medical Imaging", url: "https://drive.google.com/file/d/13OXs4WYHQlDlBXQHnHIjhm9FUPqIjU1N/view" },
    { title: "Mutual Correction Framework for Semi-Supervised Medical Image Segmentation", category: "Medical Imaging", url: "https://drive.google.com/file/d/1U3Ml41xXmO4SC1FwyGTbRZ2LM5aC4a75/view" },
    { title: "Why Does the Effective Context Length of LLMs Fall Short?", category: "LLMs", url: "https://drive.google.com/file/d/16obkOE5o65m8zrUtdMEZdOygMwHD6Aiu/view" },
  ],
  experience: [
    {
      role: "AI Research Engineer",
      company: "Gractor",
      location: "Seoul, Korea",
      period: "Sept 2025 – present",
      logo: "/images/ai/gractor.png",
      bullets: [
        "Designed and implemented AIoT solutions for smart city systems",
        "Developed CV and ML models for several smart city systems",
        "Integrated ML models into production systems in collaboration with cross-functional teams",
      ],
    },
    {
      role: "Machine Learning Research Engineer",
      company: "Pattern Recognition & Machine Learning Lab (Korea University)",
      location: "Seoul, Korea",
      period: "Aug 2023 – Aug 2025",
      logo: "/images/ai/korea-university.png",
      bullets: [
        "Built and deployed novel segmentation models, outperforming baselines by up to 25% mIoU",
        "Collaborated with industry partners on R&D, publishing papers and filing a patent",
        "Developed object detection and tracking pipelines for autonomous driving",
        "Led research in depth estimation, instance retrieval, and dense/sparse matching",
      ],
    },
    {
      role: "Software & AI Engineer",
      company: "GliT",
      location: "Hybrid",
      period: "Jan 2019 – Jan 2021",
      logo: "/images/ai/glitech.png",
      bullets: [
        "Led tech strategy and completed 10+ full-cycle projects",
        "Built and deployed AI-powered applications using deep learning frameworks",
        "Launched Innovation Hub clubs in schools, engaging 250+ students",
        "Secured 10+ school partnerships, increasing tech adoption by 40%",
      ],
    },
  ],
  certificates: [
    { name: "IBM Applied AI Professional Certificate", org: "IBM", logo: "/images/ai/certs/ibm.jpeg" },
    { name: "Modern Robotics Specialization", org: "Northwestern University", logo: "/images/ai/certs/northwestern.jpg" },
    { name: "Foundations of Project Management", org: "Google", logo: "/images/ai/certs/google.png" },
    { name: "Semantic Segmentation with Amazon Sagemaker", org: "Amazon", logo: "/images/ai/certs/amazon.png" },
    { name: "AWS S3 Basics", org: "Amazon Web Services", logo: "/images/ai/certs/aws.png" },
    { name: "ML Pipelines with Azure ML Studio", org: "Microsoft", logo: "/images/ai/certs/microsoft.png" },
    { name: "Neuroscience", org: "Emory University", logo: "/images/ai/certs/emory.png" },
    { name: "Game Development using Scratch", org: "MIT", logo: "/images/ai/certs/mit.png" },
  ],
};

export const labelGenres = [
  "Piano House", "Amapiano", "Dance-Pop", "Deep House", "Progressive House",
  "Future Bass", "Pop", "Big Room", "Hip-Hop", "Afrobeats", "R&B", "Electronic",
];

export const labelReleases = [
  { title: "KUZOKHANYA", spotifyUri: "album/52rTZtmbEp1VNsj44ttuLO" },
  { title: "READY TO BE LOVED", spotifyUri: "album/0wNJNjxA7Bmj0i7CaaU40v" },
  { title: "Adiwele", spotifyUri: "album/00G4NYB9lLESY72agcsGI8" },
  { title: "COMING BACK FOR MORE", spotifyUri: "album/26kkRdv0k9ueKLRdFV0G5C" },
  { title: "ECHOES OF LOVE I", spotifyUri: "album/6lJzDeHVkGbsLAYG5SohwR" },
  { title: "Maknaebe", spotifyUri: "album/4xa01k8vEIqumeDMHegoP2" },
];

export type NavGroup = {
  kind: "group";
  label: string;
  children: { name: string; href: string }[];
};

export type NavStandalone = {
  kind: "standalone";
  name: string;
  href: string;
};

export type NavEntry = NavGroup | NavStandalone;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return entry.kind === "group";
}

export const navEntries: NavEntry[] = [
  { kind: "standalone", name: "Home", href: "/" },
  {
    kind: "group",
    label: "Music",
    children: [
      { name: "Overview", href: "/music" },
      { name: "Discography", href: "/music#discography" },
      { name: "Singles", href: "/music#singles" },
      { name: "Top Tracks", href: "/music#top-tracks" },
    ],
  },
  {
    kind: "group",
    label: "Record Label",
    children: [
      { name: "Overview", href: "/label" },
      { name: "About the Label", href: "/label#about" },
      { name: "Our Sound", href: "/label#sound" },
      { name: "Label Roster", href: "/label#roster" },
      { name: "Featured Releases", href: "/label#releases" },
      { name: "Submit a Demo", href: "/label#demo" },
    ],
  },
  {
    kind: "group",
    label: "AI Engineering",
    children: [{ name: "AI/ML Engineer", href: "/ai" }],
  },
  {
    kind: "group",
    label: "Macro Influencer",
    children: [{ name: "Partnerships & Events", href: "/macro-influencer" }],
  },
  { kind: "standalone", name: "Tour", href: "/tour" },
  { kind: "standalone", name: "About", href: "/about" },
  { kind: "standalone", name: "Contact", href: "/contact" },
];

export const navLinks = navEntries.flatMap((entry) =>
  entry.kind === "group"
    ? entry.children.map((c) => ({ name: c.name, href: c.href }))
    : [{ name: entry.name, href: entry.href }]
);

export const roleCards = [
  {
    title: "Record Producer",
    subtitle: "3 Albums, Millions of Streams",
    description:
      "Versatile producer with multiple Dance-pop and Hip-Hop hits in Luxembourg and South Korea. Piano House specialist.",
    href: "/music",
    color: "#2E86DE",
    icon: "music" as const,
  },
  {
    title: "AI/ML Engineer",
    subtitle: "2 Top-tier Publications",
    description:
      "ML/CV researcher specializing in segmentation, depth estimation, and dense matching.",
    href: "/ai",
    color: "#1B5E8A",
    icon: "cpu" as const,
  },
  {
    title: "Macro Influencer",
    subtitle: "50+ Brands",
    description:
      "150K+ followers, 50+ brand partnerships, and VIP appearances at Korea Blockchain Week, Fashion Week, and more.",
    href: "/macro-influencer",
    color: "#F39C12",
    icon: "globe" as const,
  },
  {
    title: "Record Label Founder",
    subtitle: "Est. 2023",
    description:
      "Founder of The ESØTËRIC Ones — an international label with 15+ artists from 6 countries, 30+ singles released, and 2M+ streams.",
    href: "/label",
    color: "#1A1A2E",
    icon: "disc" as const,
  },
];

export const unifiedBio = {
  intro: `Ebstar is a Seoul-based creative and technologist operating across four lanes: music production, AI research, macro influencing, and independent label ownership.

5M+ streams as a producer. Published AI researcher with an MSc from Korea University. One of South Korea's most recognized foreign influencers with 150K+ followers and 50+ brand partnerships. Founder of The ESØTËRIC Ones — an international label with artists spanning 6 countries. GINCON Committee Member in South Korea's National Assembly and Forbes BLK inductee.`,
  roles: [
    {
      title: "Producer",
      icon: "music" as const,
      summary:
        "5M+ streams across piano house, dance-pop, Amapiano, and more. 3 albums, 2 EPs, and #290 on SkioMusic's World Producer Chart.",
    },
    {
      title: "AI Research Engineer",
      icon: "cpu" as const,
      summary:
        "MSc AI from Korea University. Published CW-BASS (IJCNN 2025) and FARCLUSS. Specializing in computer vision and semantic segmentation.",
    },
    {
      title: "Macro Influencer",
      icon: "globe" as const,
      summary:
        "150K+ followers, 10M+ views. 50+ brand partnerships with Jetpac, Mobifren, and Korean government bodies. VIP at Blockchain Week, Fashion Week, and more.",
    },
    {
      title: "Record Label Founder",
      icon: "disc" as const,
      summary:
        "Founded The ESØTËRIC Ones in 2023 — an international record label with 15+ artists from 6 countries, 30+ singles released, and 2M+ streams.",
    },
  ],
};
