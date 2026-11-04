import { Fragment } from "react";
import { HeroEntrance } from "@/components/animations/HeroEntrance";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Icon } from "@/components/ui/Icon";
import { chapterById } from "@/data/navigation";
import { hero } from "@/data/site";
import { cssVars } from "@/lib/utils";

/**
 * 01 · THE BEGINNING — a sunlit room drawn in CSS. As you scroll, the camera moves
 * through the window into open sky (the section is pinned; --p drives the zoom).
 */
export function HeroSection() {
  const chapter = chapterById("beginning");
  const nameLines = [hero.firstName, hero.lastName];

  return (
    <section className="ch ch-begin" id={chapter.id} data-chapter={chapter.number} data-progress="pin" aria-labelledby="beginName">
      <div className="begin-stage">
        <div className="room" aria-hidden="true">
          <div className="room-wall room-ceiling" />
          <div className="room-wall room-left" />
          <div className="room-wall room-right" />
          <div className="room-wall room-back" />
          <div className="room-wall room-floor" />
          <div className="room-spill" />
          <div className="room-window">
            <div className="win-sky" />
            <div className="win-cloud c1" />
            <div className="win-cloud c2" />
            <div className="win-frame" />
          </div>
          <div className="room-shaft" />
          <div className="room-patch">
            <i />
          </div>
        </div>
        <div className="begin-sky" aria-hidden="true" />

        <div className="begin-content">
          <ChapterLabel number={chapter.number} text={hero.label} />
          <h1 className="begin-name" id="beginName" aria-label={nameLines.join(" ")}>
            {nameLines.map((word, line) => (
              <span className="bn-line" aria-hidden="true" key={word}>
                {Array.from(word).map((letter, i) => (
                  <span className="lt" key={i} style={cssVars({ "--li": line * 4 + i })}>
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="begin-roles">
            {hero.roles.map((role, i) => (
              <Fragment key={role}>
                {i > 0 && <i aria-hidden="true" />}
                {role}
              </Fragment>
            ))}
          </p>
          <p className="begin-head">
            {hero.headline}
            <em>{hero.headlineEmphasis}</em>
          </p>
          <p className="begin-intro">{hero.intro}</p>
          <div className="begin-ctas">
            <a className="btn btn-ink" href={hero.primaryCta.href} data-magnetic>
              {hero.primaryCta.label} <Icon name="arrow" />
            </a>
            <a className="btn btn-line" href={hero.secondaryCta.href} data-magnetic>
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <a className="scroll-cue" href="#vision" aria-label="Scroll to the next chapter">
          <span aria-hidden="true">Scroll</span>
          <i aria-hidden="true" />
        </a>
      </div>
      <HeroEntrance targetId={chapter.id} />
    </section>
  );
}
