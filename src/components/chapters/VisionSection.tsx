import { ChapterLabel, Emphasis } from "@/components/ui/ChapterLabel";
import { chapterById } from "@/data/navigation";
import { principles, visionHeading } from "@/data/vision";

/** 02 · THE VISION — open sky; principles drift out of the clouds. */
export function VisionSection() {
  const chapter = chapterById("vision");
  return (
    <section className="ch ch-vision" id={chapter.id} data-chapter={chapter.number} data-progress="pass" aria-labelledby="visionTitle">
      <div className="sky" aria-hidden="true">
        {["k1", "k2", "k3", "k4", "k5", "k6"].map((k) => (
          <div key={k} className={`cloud ${k}`} />
        ))}
      </div>
      <div className="wrap vision-inner">
        <header className="ch-head">
          <ChapterLabel number={chapter.number} text={visionHeading.label} reveal="drift" />
          <h2 className="ch-title" id="visionTitle" data-reveal="drift">
            <Emphasis text={visionHeading.title} emphasis={visionHeading.titleEmphasis} />
          </h2>
          <p className="ch-lede" data-reveal="drift">
            {visionHeading.lede}
          </p>
        </header>

        <ol className="principles">
          {principles.map((p) => (
            <li className="principle" data-reveal="drift" key={p.title}>
              <span className="pr-n">{p.numeral}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <p className="pr-proof">
                <span>In practice</span>
                {p.proof}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <div className="cloudbank" aria-hidden="true" />
    </section>
  );
}
