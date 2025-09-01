'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function OurEventsSection({ ImageUrls = [], VideoUrls = [] }) {
  const imageData = [
    {
      src:
        "https://static.wixstatic.com/media/04481b_e89953016ff04e098e577b2a57db0734~mv2.png/v1/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/04481b_e89953016ff04e098e577b2a57db0734~mv2.png",
      alt: "wedding",
      text: "WEDDING",
      navPath: "#",
    },
    {
      src:
        "https://danceparties.biz/wp-content/uploads/2020/05/Colour-edited-1-480x400.jpg",
      alt: "birthday",
      text: "BIRTHDAY",
      navPath: "#",
    },
    {
      src:
        "https://attdstudio.com/wp-content/uploads/2024/09/HIP-HOP-768x614.jpg",
      alt: "surprise",
      text: "SURPRISE",
      navPath: "#",
    },
    {
      src:
        "https://topdancefloor.com/wp-content/uploads/2023/06/LED-dance-floor-for-party-1.jpg",
      alt: "private party",
      text: "PRIVATE PARTY",
      navPath: "#",
    },
    {
      src:
        "https://whataftercollege.com/wp-content/uploads/2019/03/Cover-image-4-1024x535.jpg",
      alt: "collage event",
      text: "COLLEGE EVENT",
      navPath: "#",
    },
  ];

  const containerRef = useRef(null);
  const imageCardRefs = useRef([]);
  const imgWrapRefs = useRef([]); // wrapper we parallax

  useEffect(() => {
    const ENABLE_ZOOM = true;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const cards = imageCardRefs.current.filter(Boolean);

  

      // Parallax on image wrappers
      imgWrapRefs.current.forEach((wrap, i) => {
        const card = imageCardRefs.current[i];
        if (!wrap || !card) return;

        gsap.fromTo(
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
      });

      // Optional zoom on card
      if (ENABLE_ZOOM) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 1 },
            {
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        window.removeEventListener("load", onLoad);
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style jsx>{`
        .section-wrapper {
          background: linear-gradient(180deg, rgb(26, 24, 24) 0%);
          padding: 20px 20px 100px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .section-heading {
          color: #fff;
          font-family: "Impact", "Arial Black", sans-serif;
          font-size: 3rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 42px;
          text-align: center;
          z-index: 2;
          position: relative;
        }

        .menu-section-container {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 30px;
          flex-wrap: wrap;
          width: 100%;
          max-width: 1500px;
          z-index: 2;
          position: relative;
        }

        /* base card */
        .Classs {
          position: relative;
          width: calc(33.333% - 20px);
          min-width: 200px;
          max-width: 250px;
          height: 300px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          text-align: left;
          border-radius: 8px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
          text-decoration: none;
          background: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.45));
          will-change: transform; /* smooth zoom */
        }

        .Classs:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.45);
        }

        /* Parallax wrapper for the image */
        .img-wrap {
          position: absolute;
          top: -10%;
          left: 0;
          width: 100%;
          height: 120%;
          filter: brightness(0.55) saturate(1.05);
          will-change: transform; /* smooth parallax */
          transition: filter 0.35s ease;
        }

        /* Next/Image fills inside wrapper */
        .Classs-image {
          object-fit: cover;
        }

        .Classs:hover .img-wrap {
          filter: brightness(1) saturate(1.05);
        }

        .star-icon {
          position: absolute;
          top: 14px;
          right: 14px;
          color: #ffd966;
          font-size: 28px;
          z-index: 3;
          pointer-events: none;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        .image-text {
          position: relative;
          color: white;
          font-family: "Impact", "Arial Black", sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 16px;
          margin-left: 16px;
          z-index: 1;
          pointer-events: none;
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.6);
          padding: 6px 10px;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.35);
        }

        /* Mobile responsiveness */
        @media (max-width: 1024px) {
          .Classs {
            width: calc(50% - 20px);
          }
        }

        @media (max-width: 768px) {
          .section-heading {
            font-size: 2rem;
            margin-bottom: 24px;
          }

          .menu-section-container {
            padding: 0 10px;
          }

          .Classs {
            width: 100%;
            max-width: none;
            height: 240px;
          }

          .image-text {
            font-size: 0.95rem;
            margin-left: 12px;
            margin-bottom: 12px;
          }
        }
      `}</style>

      <div className="section-wrapper">
        <h2 className="section-heading">Our Events</h2>

        <div className="menu-section-container" ref={containerRef}>
          {imageData.map((item, index) => {
            return (
              <a
                href={item.navPath}
                key={index}
                className="Classs"
                ref={(el) => (imageCardRefs.current[index] = el)}
                aria-label={item.text}
              >
                {/* Parallax wrapper */}
                <div
                  className="img-wrap"
                  ref={(el) => (imgWrapRefs.current[index] = el)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt || item.text}
                    fill
                    className="Classs-image"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    priority={false}
                    style={{ objectFit: "cover" }}
                    // If external domains not in next.config, optionally add: unoptimized
                  />
                </div>

                <span className="star-icon" aria-hidden>
                  ★
                </span>
                <div className="image-text">{item.text}</div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default OurEventsSection;