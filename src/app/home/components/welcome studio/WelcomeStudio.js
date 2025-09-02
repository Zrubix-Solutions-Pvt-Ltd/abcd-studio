"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WelcomeStudio.module.css";

gsap.registerPlugin(ScrollTrigger);

function WelcomeStudio() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRefs = useRef([]);

  const content = {
    title: "WELCOME TO ABCD!",
    paragraphs: [
      "Based on the Gold Coast, Dynamite Studios Australia is recognised globally for its exceptional dance education and performing arts training. Our facility uniquely combines state-of-the-art studios with a creative space and a fully equipped gym, distinguishing us as a reputable institution in the performing arts industry.",
      "At Dynamite Studios Australia, we are committed to excellence, offering students the guidance of industry professionals and a curriculum designed to prepare them for all avenues of the performing arts (dance, singing, acting, musical theatre, and circus). Our approach is innovative and trailblazing, setting new standards in the industry and fostering an environment where students can achieve their full potential.",
      "As a global leader in performing arts education, Dynamite Studios Australia is dedicated to delivering a transformative experience that encourages our community to dream, believe, and achieve.",
    ],
  };

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const paragraphs = paragraphRefs.current;

    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      paragraphs,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className={styles["welcome-container"]} ref={sectionRef}>
      <h3 className={styles["welcome-title"]} ref={titleRef}>
        {content.title}
      </h3>
      {content.paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={styles["welcome-paragraph"]}
          ref={(el) => (paragraphRefs.current[index] = el)}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default WelcomeStudio;