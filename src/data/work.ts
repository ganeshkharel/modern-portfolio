export type WorkAspect = "vertical" | "square" | "wide" | "portrait";

export type WorkItem = {
  id: string;
  title: string;
  src: string;
  type: "image" | "video";
  aspect: WorkAspect;
  poster?: string;
};

export type WorkCategory = {
  id: string;
  name: string;
  description: string;
  countLabel: string;
  folder: string;
  aspect: WorkAspect;
  cta: string;
  items: WorkItem[];
};

const imageExtensions = /\.(jpg|jpeg|png|webp)$/i;
const videoExtensions = /\.(mp4|webm|mov)$/i;

function titleFromFile(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function publicWorkPath(folder: string, fileName: string) {
  return `${folder}${encodeURIComponent(fileName)}`;
}

function createCategory(
  category: Omit<WorkCategory, "countLabel" | "items">,
  files: string[]
): WorkCategory {
  const items = files
    .filter((file) => imageExtensions.test(file) || videoExtensions.test(file))
    .map<WorkItem>((file, index) => ({
      id: `${category.id}-${index + 1}`,
      title: titleFromFile(file),
      src: publicWorkPath(category.folder, file),
      type: videoExtensions.test(file) ? "video" : "image",
      aspect: category.aspect
    }));

  return {
    ...category,
    countLabel: `${items.length} ${items.length === 1 ? "work" : "works"}`,
    items
  };
}

export const workCategories: WorkCategory[] = [
  createCategory(
    {
    id: "videos",
    name: "Videos",
    description: "Clean edits, reels, ads, and short-form stories built for attention.",
    folder: "/work/videos/",
    aspect: "vertical",
    cta: "Open Collection"
    },
    [
      "OINP REVISED.mp4",
      "OINP changes.mp4",
      "OINP final 2.mp4",
      "PSW CAREER FAIR 5.mp4",
      "lmia draft 2.mp4",
      "psw 6 top 3 reasons .mp4",
      "psw job vid 3.mp4",
      "super visa final 2.mp4",
      "ugec 3 final.mp4",
      "way to canada final.mp4"
    ]
  ),
  createCategory(
    {
    id: "logos",
    name: "Logos",
    description: "Sharp identity marks and flexible brand systems for modern businesses.",
    folder: "/work/logos/",
    aspect: "square",
    cta: "Open Collection"
    },
    [
      "GROWTIX.png",
      "azura booking-02.jpg",
      "b3 all blue shadow.png",
      "c4k esports.png",
      "doko chews.png",
      "genz barbershop logo-02.png",
      "koseli dairy.png",
      "logo bhawanika-01.png",
      "logo png white.png",
      "quark creation-01.png"
    ]
  ),
  createCategory(
    {
    id: "motion",
    name: "Motion",
    description: "Animated brand assets, intros, kinetic layouts, and motion experiments.",
    folder: "/work/motion/",
    aspect: "vertical",
    cta: "Open Collection"
    },
    ["(mansi gif) Too tired to Cook Today.mp4", "fifa ad awai.mp4", "mansi gif 12th aug 2.mp4"]
  ),
  createCategory(
    {
    id: "youtube-thumbnails",
    name: "YouTube Thumbnails",
    description: "High-contrast 16:9 thumbnails made to stop the scroll and earn clicks.",
    folder: "/work/thumbnails/",
    aspect: "wide",
    cta: "Open Collection"
    },
    ["1.png", "10.jpg", "2.jpg", "3.png", "4.png", "5.jpg", "6.png", "7.png", "8.png", "9.png"]
  ),
  createCategory(
    {
    id: "instagram-thumbnails",
    name: "Instagram Thumbnails",
    description: "Vertical thumbnail systems for reels, creators, campaigns, and launches.",
    folder: "/work/insta-thumbnails/",
    aspect: "vertical",
    cta: "Open Collection"
    },
    [
      "SMART RA ELEGANT THUMBNAIL.jpg",
      "cover for insta day 2.png",
      "cover for insta day 3.png",
      "cover for insta day 4.png",
      "cover for insta day 5.png",
      "cover for insta day 7.png",
      "kun ghar kati parcha? .jpg",
      "promo get over it insta_.png",
      "thumbnail ghar tapaiko.jpg",
      "why we are here? cover.png"
    ]
  ),
  createCategory(
    {
    id: "social-media",
    name: "Social Media Designs",
    description: "Carousels, campaign posts, launch graphics, and premium content systems.",
    folder: "/work/social-media/",
    aspect: "portrait",
    cta: "Open Collection"
    },
    [
      "5 signs cloud.jpg",
      "acca jpg.jpg",
      "azura booking post 1.png",
      "balen poster fina draft.jpg",
      "buddha jayanti.jpg",
      "congratulation pm post.jpg",
      "ganesh edit 1.png",
      "happy new year.jpg",
      "let's grow together.jpg",
      "shivam housing final post.jpg"
    ]
  ),
  createCategory(
    {
      id: "posters",
      name: "Posters",
      description: "Bold campaign posters and one-shot visual concepts with clean hierarchy.",
      folder: "/work/posters/",
      aspect: "portrait",
      cta: "Open Collection"
    },
    ["challenge design 3.png", "portfolio design 1.jpg", "poster rupak.png"]
  ),
  createCategory(
    {
      id: "randoms",
      name: "Creative Experiments",
      description: "Extra design explorations, visual studies, and experimental compositions.",
      folder: "/work/randoms/",
      aspect: "portrait",
      cta: "Open Collection"
    },
    ["meronep design.png", "not anymore .png"]
  )
];

export const addYourFilesExample = {
  note: "Add files inside public/work/... and list them in the relevant items array.",
  imageExample: {
    id: "logo-01",
    title: "Minimal Brand Mark",
    src: "/work/logos/logo-01.png",
    type: "image",
    aspect: "square"
  },
  videoExample: {
    id: "video-01",
    title: "Launch Reel",
    src: "/work/videos/video-01.mp4",
    type: "video",
    aspect: "vertical",
    poster: "/work/videos/video-01-poster.jpg"
  }
};
