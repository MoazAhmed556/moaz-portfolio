import { ChapterLabel, Emphasis } from "@/components/ui/ChapterLabel";
import { journeyPaths, nextHeading } from "@/data/journey";
import { chapterById } from "@/data/navigation";

/** 07 · THE NEXT CHAPTER — sunrise over the horizon; done, learning and aiming for, kept apart. */
export function NextChapterSection() {
  const chapter = chapterById("next");
  return (
    <section className="ch ch-horizon" id={chapter.id} data-chapter={chapter.number} data-progress="pass" aria-labelledby="nextTitle">
      <div className="horizon" aria-hidden="true">
        <div className="h-sun" />
        <svg className="h-arch" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
          <g>
            <path d="M0 600 L800 360 L1600 600" />
            <path d="M200 600 L800 360 M1400 600 L800 360 M500 600 L800 360 M1100 600 L800 360" />
            <path d="M560 600 V420 Q560 330 650 330 Q740 330 740 420 V600" className="far1" />
            <path d="M860 600 V420 Q860 330 950 330 Q1040 330 1040 420 V600" className="far1" />
            <path d="M660 520 V400 Q660 350 710 350 Q760 350 760 400 V520" className="far2" />
            <path d="M840 520 V400 Q840 350 890 350 Q940 350 940 400 V520" className="far2" />
            <path d="M740 460 V390 Q740 368 762 368 Q784 368 784 390 V460" className="far3" />
            <path d="M816 460 V390 Q816 368 838 368 Q860 368 860 390 V460" className="far3" />
          </g>
        </svg>
        <div className="h-ground" />
      </div>

      <div className="wrap next-inner">
        <header className="ch-head">
          <ChapterLabel number={chapter.number} text={nextHeading.label} reveal="dawn" />
          <h2 className="ch-title" id="nextTitle" data-reveal="dawn">
            <Emphasis text={nextHeading.title} emphasis={nextHeading.titleEmphasis} />
          </h2>
          <p className="ch-lede" data-reveal="dawn">
            {nextHeading.lede}
          </p>
        </header>

        <div className="paths">
          {journeyPaths.map((path) => (
            <article className="path" data-reveal="dawn" key={path.kind}>
              <p className="path-k">
                <span className={`pk-dot ${path.kind}`} />
                {path.label}
              </p>
              <ul>
                {path.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
