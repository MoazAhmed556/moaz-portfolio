import type { ChapterHeading, Photo, PhotoCollection } from "@/types";

/**
 * 05 · BEHIND THE LENS — a small personal selection (one row), not a gallery.
 * Titles describe only what is visible in each photograph; no locations, dates or
 * camera settings are claimed.
 *
 * To swap a photograph: move its entry between `photos` and `morePhotos` and set its `layout`.
 * Layout (desktop, wider than 900px): the row sits on a 12-column wall. `start` = first column,
 * `span` = columns wide (3 for the featured photo, 2 for the others), `drop` = how far it hangs
 * below the top of the row, in rem. Spans should add up to 12 or less.
 * Phones and portrait tablets show the row as a swipeable filmstrip instead.
 */
export const lensHeading = {
  label: "Behind the Lens",
  title: "Behind the ",
  titleEmphasis: "Lens",
  line: "Some stories are better captured than explained.",
  note: "A few photographs I took, away from the screen.",
} satisfies ChapterHeading & { line: string; note: string };

export const collections: PhotoCollection[] = [
  { id: "selected", numeral: "I", name: "Light, places and moments", line: "Water, sand, a prayer hall, an old street and a lit avenue." },
];

export const photos: Photo[] = [
  { id: "p02", collection: "selected", src: "/photography/p02.jpg", width: 1170, height: 880, title: "The Bay", alt: "A turquoise bay held between dark mountains under a cloudy sky", layout: { start: 1, span: 3, drop: 3 } },
  { id: "p10", collection: "selected", src: "/photography/p10.jpg", width: 1440, height: 1920, title: "Mirror in the Sand", alt: "A split-ring sculpture with a mirror at its centre, reflecting pyramids across the sand", layout: { start: 5, span: 2, drop: 0 } },
  { id: "p19", collection: "selected", src: "/photography/p19.jpg", width: 1440, height: 1920, title: "Beneath the Chandeliers", alt: "An ornate prayer hall with hanging chandeliers and a patterned carpet", layout: { start: 7, span: 2, drop: 5 } },
  { id: "p17", collection: "selected", src: "/photography/p17.jpg", width: 1440, height: 1920, title: "Yellow Walls, Blue Shutters", alt: "Looking up between old yellow façades and blue-green shutters to a bright sky", layout: { start: 9, span: 2, drop: 1.5 } },
  { id: "p23", collection: "selected", src: "/photography/p23.jpg", width: 1440, height: 1920, title: "Twin Minarets", alt: "Two illuminated minarets and a dome at the end of a long lamp-lit avenue", layout: { start: 11, span: 2, drop: 4 } },
];

/** The rest of the collection: files stay in /public/photography, not shown on the page. */
export const morePhotos: Photo[] = [
  { id: "p01", collection: "selected", src: "/photography/p01.jpg", width: 1184, height: 1920, title: "Light Breaking Through", alt: "Sun rays bursting through dark clouds above mountains and a paved road", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p04", collection: "selected", src: "/photography/p04.jpg", width: 1440, height: 1920, title: "Red Canyon Walk", alt: "A narrow path winding between towering red rock walls", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p07", collection: "selected", src: "/photography/p07.jpg", width: 1170, height: 880, title: "Before the Storm", alt: "Palm-roofed shades and low buildings beneath heavy storm clouds and mountains", layout: { start: 1, span: 3, drop: 0 } },
  { id: "p09", collection: "selected", src: "/photography/p09.jpg", width: 1440, height: 1920, title: "Caravan at the Pyramid", alt: "A line of camels crossing the sand in front of a great pyramid", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p12", collection: "selected", src: "/photography/p12.jpg", width: 1440, height: 1920, title: "Doors in the Desert", alt: "An installation of old doors and panels standing in the sand, backlit by the sun", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p13", collection: "selected", src: "/photography/p13.jpg", width: 1440, height: 1920, title: "Woven Figure", alt: "A large woven-mesh sculpture of a figure seen from below against a cloudy sky", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p14", collection: "selected", src: "/photography/p14.jpg", width: 1440, height: 1920, title: "Resting Camel", alt: "A camel sitting among large stone blocks beside the stepped wall of a pyramid", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p16", collection: "selected", src: "/photography/p16.jpg", width: 1440, height: 1920, title: "Concrete & Light", alt: "A staircase beside a towering perforated concrete wall, a small figure climbing", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p22", collection: "selected", src: "/photography/p22.jpg", width: 1440, height: 1920, title: "Palms Along the Shore Road", alt: "A view down a palm-lined road with parked cars toward the sea", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p20", collection: "selected", src: "/photography/p20.jpg", width: 1440, height: 1920, title: "Under the Palm Roof", alt: "Wooden beams and dried palm fronds forming a shade roof against the light", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p08", collection: "selected", src: "/photography/p08.jpg", width: 1440, height: 1082, title: "Burning Horizon", alt: "An orange sky streaked with cloud over the sea, a distant shoreline in silhouette", layout: { start: 1, span: 3, drop: 0 } },
  { id: "p28", collection: "selected", src: "/photography/p28.jpg", width: 1556, height: 1920, title: "String Lights", alt: "Strings of warm bulbs hanging against a grey evening sky", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p25", collection: "selected", src: "/photography/p25.jpg", width: 1440, height: 1920, title: "The Lit Path", alt: "A stone path lit by low lamps curving into the night, people walking ahead", layout: { start: 1, span: 2, drop: 0 } },
  { id: "p27", collection: "selected", src: "/photography/p27.jpg", width: 1367, height: 1920, title: "Night Promenade", alt: "A waterfront railing and promenade glowing under street lamps, a lit building and flag beyond", layout: { start: 1, span: 2, drop: 0 } },
];
