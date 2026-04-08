import styles from "@/components/homepage/services/Services.module.css";
import type { ServiceShowcaseItem } from "@/components/homepage/data/homepageData";

type ServiceSlideProps = {
  service: ServiceShowcaseItem;
  isActive?: boolean;
  activeImageIndex?: number;
  progressDuration?: number;
};

export default function ServiceSlide({
  service,
  isActive = false,
  activeImageIndex = 0,
  progressDuration = 2800,
}: ServiceSlideProps) {
  const images = service.images;
  const displayImageIndex = isActive ? activeImageIndex : 0;

  return (
    <article className={styles.slide}>
      <div className={styles.slideImageTrack}>
        {images.map((image, index) => (
          <img
            className={styles.slideImage}
            src={image.src}
            alt={`${service.title} ${index + 1}`}
            key={`${service.title}-image-${image.src}`}
            loading="lazy"
            draggable={false}
            style={{
              opacity: index === displayImageIndex ? 1 : 0,
              ...(image.position ? { objectPosition: image.position } : undefined),
            }}
          />
        ))}
      </div>

      <div className={styles.slideOverlay} />

      <div className={styles.slideRule} aria-hidden="true">
        {images.map((image, index) => (
          <span className={styles.ruleTrack} key={`${service.title}-rule-${image.src}`}>
            <span
              className={[
                styles.ruleFill,
                isActive && index < activeImageIndex ? styles.ruleFillDone : "",
                isActive && index === activeImageIndex ? styles.ruleFillActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={`${service.title}-fill-${image.src}-${isActive ? activeImageIndex : "idle"}`}
              style={
                isActive && index === activeImageIndex
                  ? { "--rule-duration": `${progressDuration}ms` }
                  : undefined
              }
            />
          </span>
        ))}
      </div>

      <h3 className={styles.slideTitle}>{service.title}</h3>

      <div className={styles.tags}>
        {service.tags.map((tag) => (
          <span className={styles.tag} key={`${service.title}-${tag}`}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
