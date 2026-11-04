import { CopyEmailButton } from "@/components/chapters/CopyEmailButton";
import { Footer } from "@/components/layout/Footer";
import { ChapterLabel, Emphasis } from "@/components/ui/ChapterLabel";
import { Icon } from "@/components/ui/Icon";
import { chapterById } from "@/data/navigation";
import { contactHeading, site } from "@/data/site";

/** 08 · THE CONNECTION — real contact details only. */
export function ContactSection() {
  const chapter = chapterById("connection");
  const [user, domain] = site.email.split("@");

  return (
    <section className="ch ch-connect" id={chapter.id} data-chapter={chapter.number} aria-labelledby="connTitle">
      <div className="wrap">
        <ChapterLabel number={chapter.number} text={contactHeading.label} reveal="settle" />
        <h2 className="conn-title" id="connTitle" data-reveal="settle">
          <Emphasis text={contactHeading.title} emphasis={contactHeading.titleEmphasis} />
        </h2>
        <p className="ch-lede" data-reveal="settle">
          {contactHeading.lede}
        </p>

        <div className="conn-grid" data-reveal="settle">
          <div className="conn-main">
            <p className="conn-k">Email</p>
            <a className="conn-email" href={`mailto:${site.email}`}>
              {user}
              <wbr />@{domain}
            </a>
            <div className="conn-actions">
              <a className="btn btn-ink" href={`mailto:${site.email}`} data-magnetic>
                Write to me <Icon name="arrow" />
              </a>
              <CopyEmailButton email={site.email} />
              <a className="btn btn-line" href={site.cvPath} download data-magnetic>
                <Icon name="down" /> Download CV
              </a>
            </div>
          </div>
          <dl className="conn-list">
            {site.contacts.map((c) => (
              <div key={c.label}>
                <dt>{c.label}</dt>
                <dd>
                  {c.href ? (
                    <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {c.value} {c.external && <Icon name="out" />}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <a className="back-begin" href="#beginning" data-reveal="settle">
          <Icon name="up" /> Back to the beginning
        </a>
      </div>
      <Footer />
    </section>
  );
}
