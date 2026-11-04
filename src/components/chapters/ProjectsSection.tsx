import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { ChapterLabel, Emphasis } from "@/components/ui/ChapterLabel";
import { chapterById } from "@/data/navigation";
import { projects, projectsHeading } from "@/data/projects";
import { pad } from "@/lib/utils";

/** 05 · THE PROJECTS — the working prototypes in a cinematic exhibition. */
export function ProjectsSection() {
  const chapter = chapterById("projects");
  return (
    <section className="ch ch-exhibit" id={chapter.id} data-chapter={chapter.number} aria-labelledby="exTitle">
      <div className="wrap ex-head">
        <div>
          <ChapterLabel number={chapter.number} text={projectsHeading.label} reveal="rise" />
          <h2 className="ch-title" id="exTitle" data-reveal="rise">
            <Emphasis text={projectsHeading.title} emphasis={projectsHeading.titleEmphasis} />
          </h2>
        </div>
        <div className="ex-head-side" data-reveal="rise">
          <p className="ch-lede">{projectsHeading.lede}</p>
          <ProjectIndex projects={projects} label={`Project index · 01–${pad(projects.length)}`} />
        </div>
      </div>
      <ProjectGallery projects={projects} />
    </section>
  );
}
