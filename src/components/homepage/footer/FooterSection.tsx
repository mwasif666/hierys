import {
  BriefcaseBusiness,
  Boxes,
  Code2,
  FilePenLine,
  Globe,
  LayoutTemplate,
  Megaphone,
  MonitorSmartphone,
  Package,
  PenSquare,
  Presentation,
  SearchCheck,
  Share2,
  Sparkles,
  SwatchBook,
  type LucideIcon,
} from "lucide-react";
import { FOOTER_SECTION } from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/footer/FooterSection.module.css";

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  "Ad Creatives": Megaphone,
  "Social Media Design": Share2,
  "Brand Guidelines": SwatchBook,
  "Pitch Decks": Presentation,
  "Brand Identity": BriefcaseBusiness,
  "Presentation Design": LayoutTemplate,
  "Logo Design": Sparkles,
  "Website Design": Globe,
  "Website Development": Code2,
  Copywriting: PenSquare,
  "Content Writing": FilePenLine,
  "SEO & AEO": SearchCheck,
  "Packaging Design": Package,
  Marketing: MonitorSmartphone,
  "Creative Strategy": Boxes,
  "Custom Requests": Sparkles,
};

function FooterAnchor({
  label,
  href,
  external = false,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      className={styles.footerLink}
      href={href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {label}
    </a>
  );
}

export default function FooterSection() {
  const { serviceColumns, linkColumns, contactTitle, contactBlocks, watermarkLabel } =
    FOOTER_SECTION;

  return (
    <section className={styles.section} id="footer">
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.servicesGrid}>
            {serviceColumns.map((column, columnIndex) => (
              <div className={styles.serviceColumn} key={`footer-services-${columnIndex}`}>
                {column.map((service) => (
                  <div className={styles.servicePill} key={service}>
                    <span aria-hidden="true" className={styles.serviceIcon}>
                      {(() => {
                        const Icon = SERVICE_ICON_MAP[service] ?? Sparkles;
                        return <Icon size={15} strokeWidth={2.1} />;
                      })()}
                    </span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.linksGrid}>
            {linkColumns.map((column) => (
              <div className={styles.linkColumn} key={column.title}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <div className={styles.linkList}>
                  {column.links.map((link) => (
                    <FooterAnchor
                      external={link.external}
                      href={link.href}
                      key={`${column.title}-${link.label}`}
                      label={link.label}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.bottomStage}>
            <div className={styles.contactRow}>
              <h2 className={styles.contactTitle}>{contactTitle}</h2>

              {contactBlocks.map((block, blockIndex) => (
                <div className={styles.contactBlock} key={`footer-contact-${blockIndex}`}>
                  {block.map((item) => (
                    <FooterAnchor
                      external={item.external}
                      href={item.href}
                      key={`${blockIndex}-${item.label}`}
                      label={item.label}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.watermark} aria-hidden="true">
              <span className={styles.watermarkGlyph}>
                <span className={styles.watermarkPlusPrimary} />
                <span className={styles.watermarkPlusSecondary} />
              </span>
              <span className={styles.watermarkText}>{watermarkLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
