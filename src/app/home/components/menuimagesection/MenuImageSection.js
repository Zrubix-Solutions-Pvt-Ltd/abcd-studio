"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MenuImagesSection.module.css";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

function MenuImagesSection({ ImageUrls, VideoUrls }) {
  const imageItemUrls = ImageUrls;

  const imageData = [
    {
      src: imageItemUrls.image4.url,
      alt: imageItemUrls.image4.altText || "Our Studio",
      text: "OUR STUDIO",
      navPath: "/studio",
    },
    {
      src: imageItemUrls.image5.url,
      alt: imageItemUrls.image5.altText || "Our Agency",
      text: "OUR AGENCY",
      navPath: "/agency",
    },
    {
      src: imageItemUrls.image6.url,
      alt: imageItemUrls.image6.altText || "Our Gym",
      text: "OUR GYM",
      navPath: "/gym",
    },
    {
      src: imageItemUrls.image7.url,
      alt: imageItemUrls.image7.altText || "Our Creative Space",
      text: "OUR CREATIVE SPACE",
      navPath: "/creative-space",
    },
  ];

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const imgWrapRefs = useRef([]); // animate wrapper for parallax

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Parallax for each image wrapper
    const parallaxTriggers = imgWrapRefs.current
      .map((wrap, i) => {
        const card = cardRefs.current[i];
        if (!wrap || !card) return null;
        const t = gsap.fromTo(
          wrap,
          { y: -50 },
          {
            y: 120,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        return t.scrollTrigger;
      })
      .filter(Boolean);

    // Card scroll zoom
    const zoomTriggers = cardRefs.current
      .map((card) => {
        if (!card) return null;
        const t = gsap.fromTo(
          card,
          { scale: 1 },
          {
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        return t.scrollTrigger;
      })
      .filter(Boolean);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      parallaxTriggers.forEach((st) => st && st.kill());
      zoomTriggers.forEach((st) => st && st.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className={styles["menu-section-container"]} ref={containerRef}>
      {imageData.map((item, index) => (
        <a
          href={item.navPath}
          key={index}
          className={styles["image-card"]}
          ref={(el) => (cardRefs.current[index] = el)}
        >
          {/* Wrapper for next/image fill. We animate this wrapper. */}
          <div
            className={styles["image-wrap"]}
            ref={(el) => (imgWrapRefs.current[index] = el)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="280px"
              priority={false}
              style={{ objectFit: "cover" }}
              // If you can't update next.config.js yet, you can add:
              // unoptimized
            />
          </div>
          <span className={styles["star-icon"]}>★</span>
          <div className={styles["image-text"]}>{item.text}</div>
        </a>
      ))}
    </div>
  );
}

export default MenuImagesSection;