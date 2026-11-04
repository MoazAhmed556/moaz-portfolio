import { MagneticButtons } from "@/components/animations/MagneticButtons";
import { RevealObserver } from "@/components/animations/RevealObserver";
import { ScrollEngine } from "@/components/animations/ScrollEngine";
import { BehindTheLensSection } from "@/components/chapters/BehindTheLensSection";
import { ChallengesSection } from "@/components/chapters/ChallengesSection";
import { ContactSection } from "@/components/chapters/ContactSection";
import { ExpertiseSection } from "@/components/chapters/ExpertiseSection";
import { HeroSection } from "@/components/chapters/HeroSection";
import { NextChapterSection } from "@/components/chapters/NextChapterSection";
import { ProjectsSection } from "@/components/chapters/ProjectsSection";
import { VisionSection } from "@/components/chapters/VisionSection";
import { ChapterNavigation } from "@/components/layout/ChapterNavigation";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectViewer } from "@/components/projects/ProjectViewer";
import { ProjectViewerProvider } from "@/components/projects/ProjectViewerContext";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToastProvider } from "@/components/ui/Toast";
import { projects } from "@/data/projects";

/**
 * A JOURNEY THROUGH LIGHT — the whole portfolio is one page of eight chapters.
 * Chapters are server components; interactive parts are small client components inside them.
 */
export default function Home() {
  return (
    <ToastProvider>
      <ProjectViewerProvider>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Navbar />
        <ChapterNavigation />

        <main id="main">
          <HeroSection />
          <VisionSection />
          <ChallengesSection />
          <ExpertiseSection />
          <ProjectsSection />
          <BehindTheLensSection />
          <NextChapterSection />
          <ContactSection />
        </main>

        <ProjectViewer projects={projects} />

        {/* behaviour-only components (render nothing) */}
        <ScrollEngine />
        <RevealObserver />
        <MagneticButtons />
        <JsonLd />
      </ProjectViewerProvider>
    </ToastProvider>
  );
}
