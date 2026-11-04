import type { ChapterHeading, Photo, PhotoCollection } from "@/types";

/**
 * 06 · BEHIND THE LENS — a curated personal collection, shot on an iPhone 13.
 * Titles describe only what is visible in each photograph; no locations, dates or
 * camera settings are claimed.
 *
 * To replace or add a photograph:
 *   1. put the JPG in /public/photography (about 1920px on its long side is plenty —
 *      Next.js makes the smaller sizes automatically)
 *   2. add or edit an entry below with its real pixel `width` and `height`
 *
 * Layout (desktop, wider than 900px): each collection is ONE staggered row on a
 * 12-column wall. `start` = first column, `span` = columns wide (3 for a featured
 * photo, 2 for the others), `drop` = how far it hangs below the top of the row, in rem.
 * Spans in one collection should add up to 12 or less; an unused column leaves air.
 * Phones and portrait tablets show each collection as a swipeable filmstrip instead.
 */
export const lensHeading = {
  label: "Behind the Lens",
  title: "Behind the ",
  titleEmphasis: "Lens",
  line: "Some stories are better captured than explained.",
  note: "A personal collection, shot on an iPhone 13. I'm not a professional photographer — this is simply how I notice light, lines and colour when I'm not at a screen.",
} satisfies ChapterHeading & { line: string; note: string };

export const collections: PhotoCollection[] = [
  { id: "land", numeral: "I", name: "Nature & Landscapes", line: "Mountains, water and the light that moves between them." },
  { id: "desert", numeral: "II", name: "Desert & Form", line: "Monuments, sand, and the shapes people leave in it." },
  { id: "arch", numeral: "III", name: "Architecture & Geometry", line: "Walls, frames and the lines that hold a city together." },
  { id: "night", numeral: "IV", name: "Light After Dark", line: "The last light of the day, and the lamps that take over." },
];

export const photos: Photo[] = [
  // I — Nature & Landscapes  (feature: The Bay)
  { id: "p02", collection: "land", src: "/photography/p02.jpg", width: 1170, height: 880, title: "The Bay", alt: "A turquoise bay held between dark mountains under a cloudy sky", layout: { start: 1, span: 4, drop: 3 } },
  { id: "p01", collection: "land", src: "/photography/p01.jpg", width: 1184, height: 1920, title: "Light Breaking Through", alt: "Sun rays bursting through dark clouds above mountains and a paved road", layout: { start: 6, span: 2, drop: 0 } },
  { id: "p04", collection: "land", src: "/photography/p04.jpg", width: 1440, height: 1920, title: "Red Canyon Walk", alt: "A narrow path winding between towering red rock walls", layout: { start: 8, span: 2, drop: 6 } },
  { id: "p07", collection: "land", src: "/photography/p07.jpg", width: 1170, height: 880, title: "Before the Storm", alt: "Palm-roofed shades and low buildings beneath heavy storm clouds and mountains", layout: { start: 10, span: 3, drop: 1.5 } },

  // II — Desert & Form  (feature: Mirror in the Sand)
  { id: "p09", collection: "desert", src: "/photography/p09.jpg", width: 1440, height: 1920, title: "Caravan at the Pyramid", alt: "A line of camels crossing the sand in front of a great pyramid", layout: { start: 1, span: 2, drop: 5 } },
  { id: "p10", collection: "desert", src: "/photography/p10.jpg", width: 1440, height: 1920, title: "Mirror in the Sand", alt: "A split-ring sculpture with a mirror at its centre, reflecting pyramids across the sand", layout: { start: 3, span: 3, drop: 0 } },
  { id: "p12", collection: "desert", src: "/photography/p12.jpg", width: 1440, height: 1920, title: "Doors in the Desert", alt: "An installation of old doors and panels standing in the sand, backlit by the sun", layout: { start: 6, span: 2, drop: 7 } },
  { id: "p13", collection: "desert", src: "/photography/p13.jpg", width: 1440, height: 1920, title: "Woven Figure", alt: "A large woven-mesh sculpture of a figure seen from below against a cloudy sky", layout: { start: 9, span: 2, drop: 1.5 } },
  { id: "p14", collection: "desert", src: "/photography/p14.jpg", width: 1440, height: 1920, title: "Resting Camel", alt: "A camel sitting among large stone blocks beside the stepped wall of a pyramid", layout: { start: 11, span: 2, drop: 4.5 } },

  // III — Architecture & Geometry  (feature: Beneath the Chandeliers)
  { id: "p16", collection: "arch", src: "/photography/p16.jpg", width: 1440, height: 1920, title: "Concrete & Light", alt: "A staircase beside a towering perforated concrete wall, a small figure climbing", layout: { start: 1, span: 2, drop: 1 } },
  { id: "p17", collection: "arch", src: "/photography/p17.jpg", width: 1440, height: 1920, title: "Yellow Walls, Blue Shutters", alt: "Looking up between old yellow façades and blue-green shutters to a bright sky", layout: { start: 3, span: 2, drop: 6.5 } },
  { id: "p22", collection: "arch", src: "/photography/p22.jpg", width: 1440, height: 1920, title: "Palms Along the Shore Road", alt: "A view down a palm-lined road with parked cars toward the sea", layout: { start: 6, span: 2, drop: 0 } },
  { id: "p19", collection: "arch", src: "/photography/p19.jpg", width: 1440, height: 1920, title: "Beneath the Chandeliers", alt: "An ornate prayer hall with hanging chandeliers and a patterned carpet", layout: { start: 8, span: 3, drop: 1.5 } },
  { id: "p20", collection: "arch", src: "/photography/p20.jpg", width: 1440, height: 1920, title: "Under the Palm Roof", alt: "Wooden beams and dried palm fronds forming a shade roof against the light", layout: { start: 11, span: 2, drop: 5.5 } },

  // IV — Light After Dark  (feature: Twin Minarets)
  { id: "p08", collection: "night", src: "/photography/p08.jpg", width: 1440, height: 1082, title: "Burning Horizon", alt: "An orange sky streaked with cloud over the sea, a distant shoreline in silhouette", layout: { start: 1, span: 3, drop: 5 } },
  { id: "p28", collection: "night", src: "/photography/p28.jpg", width: 1556, height: 1920, title: "String Lights", alt: "Strings of warm bulbs hanging against a grey evening sky", layout: { start: 4, span: 2, drop: 0 } },
  { id: "p23", collection: "night", src: "/photography/p23.jpg", width: 1440, height: 1920, title: "Twin Minarets", alt: "Two illuminated minarets and a dome at the end of a long lamp-lit avenue", layout: { start: 6, span: 3, drop: 1.5 } },
  { id: "p25", collection: "night", src: "/photography/p25.jpg", width: 1440, height: 1920, title: "The Lit Path", alt: "A stone path lit by low lamps curving into the night, people walking ahead", layout: { start: 9, span: 2, drop: 7 } },
  { id: "p27", collection: "night", src: "/photography/p27.jpg", width: 1367, height: 1920, title: "Night Promenade", alt: "A waterfront railing and promenade glowing under street lamps, a lit building and flag beyond", layout: { start: 11, span: 2, drop: 3 } },
];
