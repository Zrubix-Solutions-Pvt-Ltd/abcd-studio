// app/our-events/page.jsx
'use client';

import React, { Suspense, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from 'react-helmet';
import Image from "next/image";
import OurStudioEventsDetails from "./components/OurEventsDetails";
import styles from "./OurStudioEventsSection.module.css";
import { useSearchParams, useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// Inner component uses useSearchParams; it must be inside Suspense
function OurStudioEventsSectionInner() {
  const imageData = [
    { src: "https://static.wixstatic.com/media/04481b_e89953016ff04e098e577b2a57db0734~mv2.png/v1/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/04481b_e89953016ff04e098e577b2a57db0734~mv2.png", alt: "wedding", text: "WEDDING", classKey: "wedding" },
    { src: "https://danceparties.biz/wp-content/uploads/2020/05/Colour-edited-1-480x400.jpg", alt: "birthday", text: "BIRTHDAY", classKey: "birthday" },
    { src: "https://attdstudio.com/wp-content/uploads/2024/09/HIP-HOP-768x614.jpg", alt: "surprise", text: "SURPRISE", classKey: "surprise" },
    { src: "https://topdancefloor.com/wp-content/uploads/2023/06/LED-dance-floor-for-party-1.jpg", alt: "private party", text: "PRIVATE PARTY", classKey: "privateParty" },
    { src: "https://whataftercollege.com/wp-content/uploads/2019/03/Cover-image-4-1024x535.jpg", alt: "college event", text: "COLLEGE EVENT", classKey: "collegeEvents" },
  ];

  const containerRef = useRef(null);
  const imageCardRefs = useRef([]);
  const imgWrapRefs = useRef([]);
  const imageElRefs = useRef([]);
  const svgPathRefs = useRef([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Compute from URL every render (no state, no flash)
  const showDetails = Boolean(searchParams.get('name'));

  useEffect(() => {
    if (showDetails) return; // skip GSAP when details are showing

    const ENABLE_IMG_ZOOM = true;
    const ENABLE_CARD_ZOOM = true;
    const PARALLAX_FROM = -30;
    const PARALLAX_TO = 20;
    const IMG_ZOOM_SCALE = 1.2;
    const CARD_ZOOM_SCALE = 1.06;

    const ctx = gsap.context(() => {
      const cards = imageCardRefs.current.filter(Boolean);

      gsap.set(imgWrapRefs.current, { willChange: "transform" });
      gsap.set(cards, { willChange: "transform" });

      cards.forEach((card, i) => {
        const wrap = imgWrapRefs.current[i];
        const imgEl = imageElRefs.current[i];
        if (!card || !wrap) return;

        // Parallax
        gsap.fromTo(
          wrap,
          { y: PARALLAX_FROM },
          {
            y: PARALLAX_TO,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // Image zoom
        if (ENABLE_IMG_ZOOM && imgEl) {
          gsap.fromTo(
            imgEl,
            { scale: 1 },
            {
              scale: IMG_ZOOM_SCALE,
              ease: "none",
              transformOrigin: "center center",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Card zoom
        if (ENABLE_CARD_ZOOM) {
          gsap.fromTo(
            card,
            { scale: 1 },
            {
              scale: CARD_ZOOM_SCALE,
              ease: "none",
              transformOrigin: "center center",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });

      // Optional SVG path effects
      svgPathRefs.current.forEach((p, i) => {
        if (!p) return;

        const shapes = [
          p.getAttribute("data-shape-a"),
          p.getAttribute("data-shape-b"),
        ].filter(Boolean);

        if (shapes.length === 2) {
          gsap.to(p, {
            duration: 18 + i * 4,
            attr: { d: shapes[1] },
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        const dashLen = 1600;
        p.style.strokeDasharray = dashLen;
        gsap.to(p, {
          strokeDashoffset: -dashLen,
          duration: 24 + i * 6,
          ease: "linear",
          repeat: -1,
        });

        gsap.to(p, {
          y: i % 2 === 0 ? -8 : 8,
          duration: 10 + i * 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      return () => {
        window.removeEventListener('load', onLoad);
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, containerRef);

    return () => ctx.revert();
  }, [showDetails]);

  const handleEventsClick = (classKey) => {
    // Same-tab navigation so the details render immediately
    router.push(`/our-events?name=${encodeURIComponent(classKey)}`);
  };

  const handleBackToGrid = () => {
    router.push('/our-events');
  };

  if (showDetails) {
    return <OurStudioEventsDetails onBack={handleBackToGrid} />;
  }

  return (
    <>
      <Helmet>
        <title>Our Classes | Kids, Adult, Fitness, Online & Private Lessons in Salem</title>
        <meta
          name="description"
          content="Explore our diverse range of classes in Salem, including kids' dance and art, adult workshops, fitness programs, convenient online classes, and personalized private lessons. Find the perfect class for you!"
        />
        <meta
          name="keywords"
          content="Our Classes Salem, Kids Classes Salem, Adult Classes Salem, Fitness Classes Salem, Online Classes Salem, Private Classes Salem, Dance Classes Salem, Art Classes Salem, Kids Dance Salem, Adult Dance Salem, Kids Art Salem, Adult Art Salem, Fitness Programs Salem, Online Dance Classes, Online Art Classes, Private Dance Lessons Salem, Private Art Lessons Salem, Group Fitness Salem, Children's Classes Salem, Youth Programs Salem, Beginner Dance Salem, Advanced Dance Salem, Dance Workshops Salem, Art Workshops Salem, Studio Classes Salem, Learn Dance Salem, Learn Art Salem, Fitness Training Salem, Virtual Classes Salem, Personalized Training Salem, One-on-One Classes Salem, Best Kids Classes Salem, Top Adult Classes Salem, Salem Fitness Studio, Salem Online Learning, Salem Private Coaching"
        />
      </Helmet>

      <div className={styles.sectionWrapper}>
        <h2 className={styles.sectionHeading}>Our Classes</h2>
        <div className={styles.menuSectionContainer} ref={containerRef}>
          {imageData.map((item, index) => (
            <div
              key={index}
              className={styles.Classs}
              ref={(el) => (imageCardRefs.current[index] = el)}
              aria-label={item.text}
              onClick={() => handleEventsClick(item.classKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleEventsClick(item.classKey);
              }}
            >
              <div className={styles.imgWrap} ref={(el) => (imgWrapRefs.current[index] = el)}>
                <Image
                  src={item.src}
                  alt={item.alt || item.text}
                  fill
                  className={styles.ClasssImage}
                  sizes="(max-width: 900px) 50vw, 33vw"
                  priority={false}
                  style={{ objectFit: "cover" }}
                  ref={(node) => {
                    if (!node) {
                      imageElRefs.current[index] = null;
                      return;
                    }
                    const img = node?.tagName === 'IMG' ? node : node.querySelector('img');
                    imageElRefs.current[index] = img || null;
                  }}
                />
              </div>

              <span className={styles.starIcon} aria-hidden>
                ★
              </span>
              <div className={styles.imageText}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Page component wraps the inner component with Suspense.
// This satisfies Next’s requirement for useSearchParams in pages.
export default function OurStudioEventsSection() {
  return (
    <Suspense fallback={null}>
      <OurStudioEventsSectionInner />
    </Suspense>
  );
}