import { ChapterLabel, Emphasis } from "@/components/ui/ChapterLabel";
import { Icon } from "@/components/ui/Icon";
import { challengesHeading, experienceExtras, roles } from "@/data/experience";
import { chapterById } from "@/data/navigation";

/** Architectural arches drawn as you scroll (stroke-dashoffset follows --draw). */
const ARCH_PATHS = [
  "M0 900 L800 470 L1600 900",
  "M0 210 L800 400 L1600 210",
  "M210 900 V250 M1390 900 V250",
  "M210 250 Q210 120 420 120 Q630 120 630 330 V720",
  "M1390 250 Q1390 120 1180 120 Q970 120 970 330 V720",
  "M630 330 Q630 230 800 230 Q970 230 970 330",
  "M520 820 V360 Q520 300 600 300 M1080 820 V360 Q1080 300 1000 300",
  "M690 720 V390 Q690 330 800 330 Q910 330 910 390 V720",
  "M735 650 V420 Q735 380 800 380 Q865 380 865 420 V650",
  "M760 600 V440 Q760 418 800 418 Q840 418 840 440 V600",
];

/** 03 · THE CHALLENGES — fog clears to reveal architecture, and the experience behind it. */
export function ChallengesSection() {
  const chapter = chapterById("challenges");
  return (
    <section className="ch ch-fog" id={chapter.id} data-chapter={chapter.number} data-progress="pass" aria-labelledby="fogTitle">
      <div className="fog-stage" aria-hidden="true">
        <svg className="arches" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <g className="arch-set">
            {ARCH_PATHS.map((d) => (
              <path key={d} pathLength={1} d={d} />
            ))}
          </g>
        </svg>
        <div className="fog f1" />
        <div className="fog f2" />
        <div className="fog f3" />
      </div>

      <div className="wrap fog-content">
        <header className="ch-head">
          <ChapterLabel number={chapter.number} text={challengesHeading.label} reveal="clear" />
          <h2 className="ch-title" id="fogTitle" data-reveal="clear">
            <Emphasis text={challengesHeading.title} emphasis={challengesHeading.titleEmphasis} />
          </h2>
          <p className="ch-lede" data-reveal="clear">
            {challengesHeading.lede}
          </p>
        </header>

        {roles.map((role) => (
          <article className="role" data-reveal="clear" key={role.title}>
            <aside className="role-meta">
              <p className="role-when">{role.period}</p>
              <h3>{role.title}</h3>
              <p className="role-org">{role.organization}</p>
              <p className="role-where">{role.location}</p>
            </aside>
            <ol className="cases">
              {role.cases.map((c) => (
                <li className="case" data-reveal="clear" key={c.tag}>
                  <span className="tag">{c.tag}</span>
                  <p>{c.text}</p>
                </li>
              ))}
            </ol>
          </article>
        ))}

        <div className="role-extra" data-reveal="clear">
          {experienceExtras.map((x) => (
            <div key={x.title}>
              <p className="tag">{x.tag}</p>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
              {x.link && (
                <a className="text-link" href={x.link.href} target="_blank" rel="noopener noreferrer">
                  {x.link.label} <Icon name="out" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
