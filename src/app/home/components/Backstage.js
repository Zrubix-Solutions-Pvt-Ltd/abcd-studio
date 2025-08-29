"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Backstage({ ImageUrls, VideoUrls }) {
  const imageItemUrls = ImageUrls;
  const videoItemUrls = VideoUrls;

  const content = {
    titlePart1: 'THE',
    titlePart2: 'BACKSTAGE',
    titlePart3: 'PASS',
    buttonText: 'LISTEN NOW',
    imageSrc: imageItemUrls.image8.url,
    alt: imageItemUrls.image8.altText,
    starIconSrc: 'https://www.svgheart.com/wp-content/uploads/2020/10/-353.png',
  };

  const containerRef = useRef(null);
  const titlePart3Ref = useRef(null); // PASS text
  const mainImageRef = useRef(null);
  const rightSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;

      // PASS horizontal parallax (unchanged)
      gsap.fromTo(
        titlePart3Ref.current,
        { x: -300 },
        {
          x: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // PASS color cycle across scroll (4 colors)
      // Adjust colors and positions as desired.
      gsap.to(titlePart3Ref.current, {
        keyframes: {
          color: ['#000000', '#ff0015ff', '#239de9ff', '#1de6ceff'], // black → red → blue → teal
          easeEach: 'none',
        },
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 20%',
          scrub: true,
        },
      });

      // Right image: scale-in on scroll while sticky (kept from your version)
      gsap.fromTo(
        mainImageRef.current,
        { scale: 0.9 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 99%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style jsx>{`
        .backstage-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          padding: 60px 40px;
          gap: 150px;
          flex-wrap: wrap;
        }

        .backstage-left-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          text-align: left;
          max-width: 400px;
          padding: 20px;
        }

        .backstage-title-part1 {
          font-family: 'Georgia', serif;
          font-size: 2.5rem;
          font-style: italic;
          color: black;
          margin-bottom: -10px;
        }

        .backstage-title-part2 {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: black;
          margin-bottom: -10px;
          margin-top: 0;
          line-height: 0.95;
        }

        .backstage-title-part3 {
          font-family: 'Georgia', serif;
          font-size: 2.5rem;
          font-style: italic;
          color: black;
          margin-bottom: 30px;
          margin-top: 0;
          margin-left: 280px; /* visual offset; GSAP animates x */
          will-change: transform, color; /* enable smooth color + x */
        }

        .backstage-listen-button {
          background-color: black;
          color: white;
          font-family: 'Impact','Arial', sans-serif;
          font-size: 1rem;
          padding: 15px 30px;
          border: 2px solid black;
          cursor: pointer;
          text-transform: uppercase;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .backstage-listen-button:hover {
          background-color: #fff;
          color: black;
        }

        /* Right side: sticky */
        .backstage-right-section {
          position: -webkit-sticky;
          position: sticky;
          top: 80px; /* adjust as needed for navbar spacing */
          padding: 20px;
          border: 1px solid #293039;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
          height: fit-content;
        }

        .backstage-main-image {
          max-width: 700px;
          height: 400px;
          display: block;
          object-fit: cover;
          will-change: transform;
        }

        .backstage-star-icon {
          position: absolute;
          top: -40px;
          right: -20px;
          width: 80px;
          height: auto;
          pointer-events: none;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .backstage-container {
            flex-direction: column;
            padding: 30px;
            gap: 30px;
          }

          .backstage-left-section {
            align-items: center;
            text-align: center;
            max-width: 100%;
            padding: 10px;
          }

          .backstage-title-part1,
          .backstage-title-part2,
          .backstage-title-part3 {
            font-size: 1.8rem;
            margin-bottom: 0;
            margin-left: 0;
          }

          .backstage-title-part2 {
            font-size: 3.5rem;
            line-height: 1;
          }

          .backstage-title-part3 {
            font-size: 2rem;
          }

          .backstage-listen-button {
            padding: 12px 25px;
            font-size: 0.9rem;
          }

          .backstage-right-section {
            width: 90%;
            padding: 15px;
            position: static; /* disable sticky on small screens */
          }

          .backstage-main-image {
            max-width: 100%;
            height: 250px;
          }

          .backstage-star-icon {
            top: -10px;
            right: -10px;
            width: 60px;
          }
        }
      `}</style>

      <div className="backstage-container" ref={containerRef}>
        <div className="backstage-left-section">
          <h3 className="backstage-title-part1">{content.titlePart1}</h3>
          <h3 className="backstage-title-part2">{content.titlePart2}</h3>
          <h3 className="backstage-title-part3" ref={titlePart3Ref}>
            {content.titlePart3}
          </h3>
          <button className="backstage-listen-button">{content.buttonText}</button>
        </div>

        <div className="backstage-right-section" ref={rightSectionRef}>
          <img
            src={content.imageSrc}
            alt={content.alt}
            className="backstage-main-image"
            ref={mainImageRef}
          />
          <img
            src={content.starIconSrc}
            alt="Star Icon"
            className="backstage-star-icon"
          />
        </div>
      </div>
    </>
  );
}

export default Backstage;