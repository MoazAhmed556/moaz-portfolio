import { LivingArchitecture } from "@/components/photography/LivingArchitecture";
import { PhotographyGallery } from "@/components/photography/PhotographyGallery";
import { ChapterLabel, Emphasis } from "@/components/ui/ChapterLabel";
import { chapterById } from "@/data/navigation";
import { collections, lensHeading, photos } from "@/data/photography";

/**
 * 06 · BEHIND THE LENS — a personal photography collection over a living,
 * architectural background. Compact by design: one collection per screen.
 */
export function BehindTheLensSection() {
  const chapter = chapterById("lens");

  const head = (
    <>
      <ChapterLabel number={chapter.number} text={lensHeading.label} reveal="frame" />
      <h2 className="lens-title" id="lensTitle" data-reveal="frame">
        <Emphasis text={lensHeading.title} emphasis={lensHeading.titleEmphasis} />
      </h2>
      <p className="lens-line" data-reveal="frame">
        {lensHeading.line}
      </p>
      <p className="lens-note" data-reveal="frame">
        {lensHeading.note}
      </p>
    </>
  );

  return (
    <section className="ch ch-lens" id={chapter.id} data-chapter={chapter.number} data-progress="pass" aria-labelledby="lensTitle">
      <LivingArchitecture />
      <PhotographyGallery head={head} collections={collections} photos={photos} />
    </section>
  );
}
