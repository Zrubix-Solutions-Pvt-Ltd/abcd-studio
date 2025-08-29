"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const transparentImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

function HomeHeroSection({ ImageUrls, VideoUrls, LinkUrls }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const starRef = useRef(null);
  const buttonRef = useRef(null);

  let imageItemUrls = ImageUrls;
  let videoItemUrls = VideoUrls;
  let linkItemUrls = LinkUrls;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const star = starRef.current;
    const button = buttonRef.current;

    // Clean up previous triggers when component unmounts
    const triggers = [];

    // Parallax effect for the background video (iframe)
    triggers.push(
      gsap.to(video, {
        y: '50%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }).scrollTrigger
    );

    // Fade-in animations on entering viewport
    triggers.push(
      gsap.fromTo(
        title,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      ).scrollTrigger
    );

    triggers.push(
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitle,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      ).scrollTrigger
    );

    triggers.push(
      gsap.fromTo(
        star,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 0.8,
          scrollTrigger: {
            trigger: star,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      ).scrollTrigger
    );

    triggers.push(
      gsap.fromTo(
        button,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: button,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      ).scrollTrigger
    );

    // Shrink on scroll while the section is in view
    // We group title + subtitle + star + button into one timeline for a cohesive effect
    const shrinkTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    shrinkTl
      .to(title, { scale: 0.6, yPercent: -20, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(subtitle, { scale: 0.6, yPercent: -20, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(star, { scale: 0.6, yPercent: -20, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(button, { scale: 0.75, yPercent: -20, transformOrigin: 'center center', ease: 'none' }, 0);

    triggers.push(shrinkTl.scrollTrigger);

    return () => {
      triggers.forEach(t => t && t.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <style>
        {`
          .HomeHero-section {
            position: relative;
            width: 100%;
            height: 80vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
          }

          .HomeHero-background-iframe {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100vw;
            height: 100vh;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: -1;
            filter: brightness(0.1);
          }

          .HomeHero-background-iframe iframe {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }

          @media (min-aspect-ratio: 16/9) {
            .HomeHero-background-iframe iframe {
              height: 56.25vw;
              min-height: 100%;
              width: 100%;
            }
          }

          @media (max-aspect-ratio: 16/9) {
            .HomeHero-background-iframe iframe {
              width: 177.78vh;
              min-width: 100%;
              height: 100%;
            }
          }

          .transparent-alt-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
          }

          .HomeHero-content-overlay {
            position: relative;
            z-index: 1;
            padding: 20px;
            will-change: transform; /* helps with smoother transforms */
          }

          .HomeHero-title {
            font-family: 'Impact', 'Arial Black', sans-serif;
            font-size: 7vw;
            font-weight: 900;
            line-height: 0.9;
            margin: 0;
            text-transform: uppercase;
          }

          .HomeHero-subtitle {
            font-family: 'Impact', 'Arial Black', sans-serif;
            font-size: 7vw;
            font-weight: 900;
            line-height: 0.9;
            margin-top: 10px;
            text-transform: uppercase;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            margin-bottom: 0;
          }

          .HomeHero-star-icon {
            margin-left: 5px;
            font-size: 2vw;
            margin-bottom: 10px;
          }

          .HomeHero-enquire-button {
            background-color: white;
            color: black;
            border: none;
            padding: 15px 40px;
            margin-top: 40px;
            font-family: 'Arial', sans-serif;
            font-size: 1.2vw;
            font-weight: 900;
            text-transform: uppercase;
            cursor: pointer;
            transition: background-color 0.3s ease;
            text-decoration: none;
          }

          .HomeHero-enquire-button:hover {
            background-color: #f0f0f0;
          }

          @media (max-width: 768px) {
            .HomeHero-section {
              display: none;
            }
          }
        `}
      </style>
      <div className="HomeHero-section" ref={sectionRef}>
        <div>
          <img
            src={transparentImage}
            alt={linkItemUrls?.link1?.altText || 'background'}
            className="transparent-alt-image"
          />
        </div>
        <div className="HomeHero-background-iframe">
          <img
            src={transparentImage}
            alt={videoItemUrls?.video1?.altText || 'background video'}
            className="transparent-alt-image"
          />
          <iframe
            src={videoItemUrls?.video1?.url}
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; muted; loop"
            allowFullScreen
            ref={videoRef}
          />
        </div>
        <div className="HomeHero-content-overlay">
          <h1 className="HomeHero-title" ref={titleRef}>ABCD</h1>
          <h2 className="HomeHero-subtitle" ref={subtitleRef}>
            STUDIOS
            <span className="HomeHero-star-icon" ref={starRef}>&#9733;</span>
          </h2>
          <button className="HomeHero-enquire-button" ref={buttonRef}>ENQUIRE NOW</button>
        </div>
      </div>
    </>
  );
}

function HomeHeroSecMobile({ ImageUrls, VideoUrls }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const starRef = useRef(null);
  const buttonRef = useRef(null);

  let imageItemUrls = ImageUrls;
  let videoItemUrls = VideoUrls;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const star = starRef.current;
    const button = buttonRef.current;

    const triggers = [];

    // Parallax effect for the background video (iframe)
    triggers.push(
      gsap.to(video, {
        y: '50%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }).scrollTrigger
    );

    // Fade-ins
    triggers.push(
      gsap.fromTo(
        title,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      ).scrollTrigger
    );

    triggers.push(
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitle,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      ).scrollTrigger
    );

    triggers.push(
      gsap.fromTo(
        star,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 0.8,
          scrollTrigger: {
            trigger: star,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      ).scrollTrigger
    );

    triggers.push(
      gsap.fromTo(
        button,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: button,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      ).scrollTrigger
    );

    // Shrink on scroll for mobile as well
    const shrinkTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    shrinkTl
      .to(title, { scale: 0.7, yPercent: -10, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(subtitle, { scale: 0.7, yPercent: -10, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(star, { scale: 0.7, yPercent: -10, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(button, { scale: 0.9, yPercent: -10, transformOrigin: 'center center', ease: 'none' }, 0);

    triggers.push(shrinkTl.scrollTrigger);

    return () => {
      triggers.forEach(t => t && t.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <style>
        {`
          .HomeHeroSecMobile-section {
            position: relative;
            width: 100%;
            height: 90vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
          }

          .HomeHeroSecMobile-background-iframe {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100vw;
            height: 100vh;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: -1;
            filter: brightness(0.1);
          }

          @media (min-aspect-ratio: 16/9) {
            .HomeHeroSecMobile-background-iframe iframe {
              height: 56.25vw;
              min-height: 100%;
              width: 100%;
            }
          }

          @media (max-aspect-ratio: 16/9) {
            .HomeHeroSecMobile-background-iframe iframe {
              width: 177.78vh;
              min-width: 100%;
              height: 100%;
            }
          }

          .HomeHeroSecMobile-content-overlay {
            position: relative;
            z-index: 1;
            padding: 20px;
            will-change: transform;
          }

          .HomeHeroSecMobile-title {
            font-family: 'Impact', 'Arial Black', sans-serif;
            font-size: 20vw;
            font-weight: 900;
            line-height: 0.9;
            margin: 0;
            text-transform: uppercase;
          }

          .HomeHeroSecMobile-subtitle {
            font-family: 'Impact', 'Arial Black', sans-serif;
            font-size: 20vw;
            font-weight: 900;
            line-height: 0.9;
            margin-top: 10px;
            text-transform: uppercase;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            margin-bottom: 0;
          }

          .HomeHeroSecMobile-star-icon {
            margin-left: 10px;
            font-size: 7vw;
            margin-bottom: 10px;
          }

          .HomeHeroSecMobile-enquire-button {
            background-color: white;
            color: black;
            border: none;
            padding: 12px 25px;
            margin-top: 40px;
            font-family: 'Arial', sans-serif;
            font-size: 3vw;
            font-weight: 900;
            text-transform: uppercase;
            cursor: pointer;
            transition: background-color 0.3s ease;
            text-decoration: none;
          }

          .HomeHeroSecMobile-enquire-button:hover {
            background-color: #f0f0f0;
          }

          @media (min-width: 769px) {
            .HomeHeroSecMobile-section {
              display: none;
            }
          }
        `}
      </style>
      <div className="HomeHeroSecMobile-section" ref={sectionRef}>
        <div className="HomeHeroSecMobile-background-iframe">
          <img
            src={transparentImage}
            alt={videoItemUrls?.video1?.altText || 'background video'}
            className="transparent-alt-image"
          />
          <iframe
            src={videoItemUrls?.video1?.url}
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; muted; loop"
            allowFullScreen
            ref={videoRef}
          />
        </div>
        <div className="HomeHeroSecMobile-content-overlay">
          <h1 className="HomeHeroSecMobile-title" ref={titleRef}>ABCD</h1>
          <h2 className="HomeHeroSecMobile-subtitle" ref={subtitleRef}>
            STUDIOS
            <span className="HomeHeroSecMobile-star-icon" ref={starRef}>&#9733;</span>
          </h2>
          <button className="HomeHeroSecMobile-enquire-button" ref={buttonRef}>ENQUIRE NOW</button>
        </div>
      </div>
    </>
  );
}

export { HomeHeroSection, HomeHeroSecMobile };