import { ExpertiseExplorer } from "@/components/expertise/ExpertiseExplorer";
import { ChapterLabel, Emphasis } from "@/components/ui/ChapterLabel";
import { chapterById } from "@/data/navigation";
import { projectName, projects } from "@/data/projects";
import { expertiseHeading, skillCategories } from "@/data/skills";

/** 04 · THE EXPERTISE — a blueprint: categories → skills → the evidence behind each one. */
export function ExpertiseSection() {
  const chapter = chapterById("expertise");
  // only the names travel to the browser, not the full project data
  const projectNames = Object.fromEntries(projects.map((p) => [p.id, projectName(p)]));

  return (
    <section className="ch ch-plan" id={chapter.id} data-chapter={chapter.number} data-progress="pass" aria-labelledby="xpTitle">
      <div className="plan-grid" aria-hidden="true" />
      <div className="wrap">
        <header className="ch-head">
          <ChapterLabel number={chapter.number} text={expertiseHeading.label} reveal="draw" />
          <h2 className="ch-title" id="xpTitle" data-reveal="draw">
            <Emphasis text={expertiseHeading.title} emphasis={expertiseHeading.titleEmphasis} />
          </h2>
          <p className="ch-lede" data-reveal="draw">
            {expertiseHeading.lede}
          </p>
        </header>

        <div className="xp" data-reveal="draw">
          <ExpertiseExplorer categories={skillCategories} projectNames={projectNames} />
        </div>
      </div>
      <div className="plan-floor" aria-hidden="true" />
    </section>
  );
}
