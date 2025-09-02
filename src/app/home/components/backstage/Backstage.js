"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Backstage.module.css";
import stylesMobile from "./BackstageMobile.module.css"; // only if you render mobile in same file

gsap.registerPlugin(ScrollTrigger);

export function Backstage({ ImageUrls, VideoUrls }) {
  const imageItemUrls = ImageUrls;
  const videoItemUrls = VideoUrls;

  const content = {
    titlePart1: "THE",
    titlePart2: "BACKSTAGE",
    titlePart3: "PASS",
    buttonText: "LISTEN NOW",
    imageSrc: imageItemUrls?.image8?.url || "",
    alt: imageItemUrls?.image8?.altText || "Main image",
    starIconSrc: "https://www.svgheart.com/wp-content/uploads/2020/10/-353.png",
  };

  const containerRef = useRef(null);
  const titlePart3Ref = useRef(null); // PASS text
  const mainImageRef = useRef(null);
  const rightSectionRef = useRef(null);

  // Uncomment if/when you want the animations active
  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const container = containerRef.current;
  //
  //     gsap.fromTo(
  //       titlePart3Ref.current,
  //       { x: -300 },
  //       {
  //         x: 40,
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: container,
  //           start: "top bottom",
  //           end: "bottom top",
  //           scrub: true,
  //         },
  //       }
  //     );
  //
  //     gsap.to(titlePart3Ref.current, {
  //       keyframes: {
  //         color: ["#000000", "#ff0015ff", "#239de9ff", "#1de6ceff"],
  //         easeEach: "none",
  //       },
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: container,
  //         start: "top 85%",
  //         end: "bottom 20%",
  //         scrub: true,
  //       },
  //     });
  //
  //     gsap.fromTo(
  //       mainImageRef.current,
  //       { scale: 0.9 },
  //       {
  //         scale: 1,
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: container,
  //           start: "top 99%",
  //           end: "top 30%",
  //           scrub: true,
  //         },
  //       }
  //     );
  //   }, containerRef);
  //
  //   return () => ctx.revert();
  // }, []);

  return (
    <div className={styles["backstage-container"]} ref={containerRef}>
      <div className={styles["backstage-left-section"]}>
        <h3 className={styles["backstage-title-part1"]}>{content.titlePart1}</h3>
        <h3 className={styles["backstage-title-part2"]}>{content.titlePart2}</h3>
        <h3 className={styles["backstage-title-part3"]} ref={titlePart3Ref}>
          {content.titlePart3}
        </h3>
        <button className={styles["backstage-listen-button"]}>
          {content.buttonText}
        </button>
      </div>

      <div className={styles["backstage-right-section"]} ref={rightSectionRef}>
        <div className={styles["backstage-main-image"]} ref={mainImageRef}>
          {content.imageSrc ? (
            <Image
              src={content.imageSrc}
              alt={content.alt}
              fill
              sizes="(max-width: 768px) 90vw, 700px"
              style={{ objectFit: "cover" }}
              priority
            />
          ) : null}
        </div>

        <div className={styles["backstage-star-icon"]}>
          <Image
            src={content.starIconSrc}
            alt="Star Icon"
            width={80}
            height={80}
            style={{ height: "auto", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export function BackstageMobile({ ImageUrls, VideoUrls }) {
  const imageItemUrls = ImageUrls;

  const content = {
    titlePart1: "THE",
    titlePart2: "BACKSTAGE",
    titlePart3: "PASS",
    buttonText: "LISTEN NOW",
    imageSrc: imageItemUrls?.image8?.url || "",
    alt: imageItemUrls?.image8?.altText || "Main image",
    starIconSrc:
      "https://www.svgheart.com/wp-content/uploads/2020/10/-353.png",
  };

  return (
    <div className={stylesMobile["backstage-mobile-container"]}>
      <div className={stylesMobile["backstage-mobile-left"]}>
        <h3 className={stylesMobile["title-part1"]}>{content.titlePart1}</h3>
        <h3 className={stylesMobile["title-part2"]}>{content.titlePart2}</h3>
        <h3 className={stylesMobile["title-part3"]}>{content.titlePart3}</h3>
        <button className={stylesMobile["listen-btn"]}>{content.buttonText}</button>
      </div>

      <div className={stylesMobile["backstage-mobile-right"]}>
        <div className={stylesMobile["star-icon"]}>
          <Image
            src={content.starIconSrc}
            alt="Star Icon"
            width={60}
            height={60}
            style={{ width: "60px", height: "60px" }}
            priority
          />
        </div>

        <div className={stylesMobile["main-image-box"]}>
          {content.imageSrc ? (
            <Image
              src={content.imageSrc}
              alt={content.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}