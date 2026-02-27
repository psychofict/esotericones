export const artist = {
  name: "Ebstar",
  realName: "Ebenezer Tarubinga",
  from: "Zimbabwe",
  basedIn: "Seoul, South Korea",
  label: "The ESØTËRIC Ones",
  labelFounded: 2023,
  contact: "contact@ebstar.co",
  tagline: "Producer. Engineer. Influencer. Bridging Worlds.",
  bio: `Ebenezer "Ebstar" Tarubinga is a South Korea-based Zimbabwean musician, producer, brand influencer, record label owner, A.I. engineer, and socialite. Ebstar made his international debut in 2020 at only 19 years of age.

Known for his piano house and dance-pop productions, Ebstar's tracks have garnered over 5 million streams. His signature production style emphasizes melody across a wide variety of electronic genres — from Deep House and Progressive House to Future Bass, Amapiano, Pop, Big Room, and Hip-Hop.

Within a year of his self-taught music production career, he was ranked the 290th best producer on SkioMusic's World Producer's Chart in 2022. In 2023, Ebstar established his own record label, "The ESØTËRIC Ones," where he and a close circle of collaborators release impactful music.

Beyond music, Ebstar is one of South Korea's most prominent foreign influencers, with over 150,000 Instagram followers and 10 million+ views. He has completed over 50 brand collaborations, working with the Korean government, Seoul Tourism Organisation, Korea's Ministry of Foreign Affairs, Ministry of Culture, and multiple provincial governments. In 2025, he was appointed a GINCON Committee member in South Korea's National Assembly.`,
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
  { title: "After The Storm, You'll See The Sun", streams: "254,155", source: "Life Is Beautiful" },
  { title: "Seoul Love", streams: "188,000", source: "Life Is Beautiful" },
  { title: "I Could Be The One For You", streams: "67,459", source: "Life Is Beautiful" },
  { title: "COMING BACK FOR MORE", streams: "51,305", source: "Single" },
  { title: "But....I DONT TRUST YOU", streams: "38,237", source: "ECHOES OF LOVE I" },
  { title: "The Breakup Anthem", streams: "28,306", source: "ECHOES OF LOVE I" },
];

export const timeline = [
  { year: 2020, event: "International debut at age 19" },
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

export const blogPosts = [
  {
    slug: "when-i-think-of-you-summer-out-now",
    title: "New Single 'When I Think of You (Summer)' Out Now",
    excerpt:
      "The latest summer anthem is here. Blending piano house with warm, nostalgic melodies, this track captures the feeling of sun-soaked days and ocean breezes.",
    date: "2025-06-15",
    tag: "Releases",
    gradient: "from-[#F39C12] to-[#2E86DE]",
    readTime: "3 min read",
    content: [
      "The wait is over — \"When I Think of You (Summer)\" is officially out on all platforms. This track has been months in the making, born from late-night studio sessions and a deep longing for warmer days.",
      "The production draws heavily from piano house roots, layering warm chord progressions with sun-drenched synths and a driving four-on-the-floor beat. The vocal chops weave in and out, creating a call-and-response effect that pulls you right onto the dance floor.",
      "Sonically, this single represents a new chapter. While previous releases leaned into deeper, moodier territory, \"Summer\" embraces brightness without sacrificing the emotional depth that defines Ebstar's sound. It's a track built for golden hour — windows down, volume up.",
      "The release is accompanied by a visualizer that captures the essence of the track: gradient sunsets, shimmering water reflections, and that unmistakable feeling of freedom that only summer can bring.",
      "Stream it now on Spotify, Apple Music, and all major platforms. Summer is here, and so is the soundtrack.",
    ],
  },
  {
    slug: "gincon-committee-member-national-assembly",
    title: "Appointed GINCON Committee Member in National Assembly",
    excerpt:
      "A milestone in cultural diplomacy — Ebstar has been appointed as a GINCON Committee Member in South Korea's National Assembly, representing foreign voices in policy discussions.",
    date: "2025-03-10",
    tag: "Macro Influencer",
    gradient: "from-[#2E86DE] to-[#1B5E8A]",
    readTime: "4 min read",
    content: [
      "In a historic appointment, Ebstar has been named a GINCON Committee Member within South Korea's National Assembly. This role places him at the intersection of cultural exchange, policy, and international relations — a space where music and diplomacy meet.",
      "GINCON (Global INfluencer CONnection) is a committee focused on leveraging the influence of global content creators and cultural figures to strengthen South Korea's international relationships. As a committee member, Ebstar will contribute to discussions on cultural policy, foreign resident experiences, and soft power initiatives.",
      "This appointment builds on years of influencer work. Since moving to South Korea in 2022, Ebstar has served as a Global SeoulMate for the Seoul Tourism Organisation, a Korea Allimi for the Ministry of Foreign Affairs, and has held multiple provincial government roles.",
      "\"This is bigger than me,\" Ebstar shared. \"It's about every African, every foreigner who has made South Korea their home and wants their voice heard. I'm honored to be in a position where I can bridge these worlds not just through music, but through meaningful policy conversations.\"",
      "The appointment was formally announced at the National Assembly in Seoul and represents one of the first instances of a Zimbabwean national serving in an advisory capacity within South Korea's legislative body.",
    ],
  },
  {
    slug: "studio-diary-making-of-kuzokhanya",
    title: "Studio Diary: Making of 'KUZOKHANYA'",
    excerpt:
      "Go behind the scenes of the recording process for KUZOKHANYA featuring Roline. From the first beat sketch to the final master, here's how it all came together.",
    date: "2025-02-20",
    tag: "Behind the Scenes",
    gradient: "from-[#1B5E8A] to-[#F39C12]",
    readTime: "5 min read",
    content: [
      "KUZOKHANYA — meaning \"it will shine\" in Zulu — started as a simple piano loop at 3 AM in a Seoul studio. What began as four chords and a feeling grew into one of the most personal tracks in the Ebstar catalog.",
      "The collaboration with Roline was serendipitous. After connecting through mutual friends in the South African music scene, a voice note exchange turned into a full studio session within weeks. Roline's vocal texture brought exactly the warmth the track needed — grounding the electronic production in something deeply human.",
      "Production-wise, KUZOKHANYA sits at the intersection of Amapiano and piano house. The log drum patterns pay homage to South African roots while the layered synth pads and arpeggiated leads push the sound into more progressive territory. Finding that balance took over 40 different arrangement iterations.",
      "The mixing process was equally meticulous. Every element was designed to serve the vocal — the kick drum punches through without competing, the bass sits just below the vocal register, and the high-frequency shimmer of the synths creates space rather than clutter.",
      "The title carries deep personal significance. In a year filled with new beginnings and challenges, \"it will shine\" became a mantra. The track is both a promise and a prayer — a reminder that light finds its way through, always.",
      "KUZOKHANYA featuring Roline is available now on all streaming platforms.",
    ],
  },
];

export const videos = [
  {
    id: 1,
    title: "But....I DONT TRUST YOU",
    type: "Music Video" as const,
    gradient: "from-[#2E86DE] to-[#1B5E8A]",
    year: 2024,
    description: "Official music video from ECHOES OF LOVE I",
  },
  {
    id: 2,
    title: "KUZOKHANYA ft. Roline",
    type: "Music Video" as const,
    gradient: "from-[#F39C12] to-[#2E86DE]",
    year: 2025,
    description: "Visual accompaniment to the Amapiano-infused single",
  },
  {
    id: 3,
    title: "Global SeoulMates — Seoul Tourism",
    type: "Live" as const,
    gradient: "from-[#1B5E8A] to-[#1A1A2E]",
    year: 2024,
    description: "Live performance at the Seoul Tourism Organisation event",
  },
  {
    id: 4,
    title: "GINCON National Assembly Ceremony",
    type: "Live" as const,
    gradient: "from-[#2E86DE] to-[#F39C12]",
    year: 2025,
    description: "Highlights from the GINCON committee appointment ceremony",
  },
  {
    id: 5,
    title: "Making of 'When I Think of You (Summer)'",
    type: "Behind the Scenes" as const,
    gradient: "from-[#1A1A2E] to-[#2E86DE]",
    year: 2025,
    description: "Studio session footage and production breakdown",
  },
  {
    id: 6,
    title: "The ESOTERIC Ones — Label Documentary",
    type: "Behind the Scenes" as const,
    gradient: "from-[#1B5E8A] to-[#F39C12]",
    year: 2024,
    description: "A look inside the independent label founded in Seoul",
  },
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
  bio: "ML/CV Engineer with an MSc in AI from Korea University. 4+ years of experience in computer vision, deep learning, robotics and software engineering. Specializing in image & video segmentation, depth estimation, instance retrieval, and dense/sparse matching.",
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
      period: "Aug 2022 – Aug 2023",
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
    label: "Brand Influencer",
    children: [{ name: "Partnerships & Events", href: "/macro-influencer" }],
  },
  { kind: "standalone", name: "Merch", href: "/merch" },
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
    title: "Brand Influencer",
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
  intro: `Ebenezer "Ebstar" Tarubinga is a multi-disciplinary professional based in Seoul, South Korea. He works at the intersection of music production, artificial intelligence research, brand influencing, and independent music entrepreneurship.

As a producer, Ebstar has garnered over 5 million streams with his signature piano house and dance-pop sound. As an AI research engineer, he holds an MSc in Artificial Intelligence from Korea University and has published research in semi-supervised semantic segmentation. As a brand influencer, he commands 150K+ Instagram followers and 10M+ views, with 50+ brand partnerships including Jetpac, Undercover Korea, and Mobifren, and VIP appearances at Korea Blockchain Week, Korea Fashion Week, and Seoul Africa Festival. And as the founder of The ESØTËRIC Ones, he leads an independent label releasing boundary-pushing music from Seoul.`,
  roles: [
    {
      title: "Producer",
      icon: "music" as const,
      summary:
        "5M+ streams across piano house, dance-pop, Amapiano, and more. Five albums released and #290 on SkioMusic's World Producer Chart.",
    },
    {
      title: "AI Research Engineer",
      icon: "cpu" as const,
      summary:
        "MSc AI from Korea University. Published CW-BASS (IJCNN 2025) and FARCLUSS. Specializing in computer vision and semantic segmentation.",
    },
    {
      title: "Brand Influencer",
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
