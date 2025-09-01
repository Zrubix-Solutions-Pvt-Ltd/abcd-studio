// page.js
'use client';

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from 'react-helmet';
import OurStudioClassDetails from "./components/OurClassDetails";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function OurStudioClassesSection({ ImageUrls = [], VideoUrls = [] }) {
  const imageData = [
    {
      src: "https://cdn.prod.website-files.com/5eea1fd06e21541535c81901/6256ebd82354f3764b2a5c18_Kids-5.jpeg",
      alt: "kids",
      text: "KIDS",
      classKey: "kids",
    },
    {
      src: "https://i.pinimg.com/236x/13/db/38/13db3809d9bdf410de0ffcf8e4012533.jpg",
      alt: "adult",
      text: "ADULT",
      classKey: "adult",
    },
    {
      src: "https://www.shutterstock.com/image-photo/athlete-asian-sportswoman-jumping-dance-600nw-2184753393.jpg",
      alt: "fitness",
      text: "FITNESS",
      classKey: "fitness",
    },
    {
      src: "https://static.wixstatic.com/media/c8c956_4a9ae9ec04644ec6890c4dd198952cce~mv2.jpeg/v1/fill/w_980,h_1307,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c8c956_4a9ae9ec04644ec6890c4dd198952cce~mv2.jpeg",
      alt: "online",
      text: "ONLINE",
      classKey: "online",
    },
    {
      src: "https://islarosedanceacademy.com/wp-content/uploads/2023/07/IRDA-Clases-Privadas.jpg",
      alt: "private",
      text: "PRIVATE",
      classKey: "private",
    },
  ];

  const containerRef = useRef(null);
  const imageCardRefs = useRef([]);
  const imgWrapRefs = useRef([]); // wrapper we parallax
  const svgPathRefs = useRef([]);

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    setShowDetails(Boolean(name));
  }, []);

  useEffect(() => {
    const ENABLE_ZOOM = true; // toggle if you want to disable zoom on scroll
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const cards = imageCardRefs.current.filter(Boolean);

      // Parallax for each image wrapper
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

      // Optional zoom on scroll for each card
      if (ENABLE_ZOOM) {
        imageCardRefs.current.forEach((card) => {
          if (!card) return;
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

      // If you use SVG paths animations, keep this. If not, safe to remove.
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

      // Ensure layout calculated after images load
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      return () => {
        window.removeEventListener('load', onLoad);
        // Kill all ScrollTriggers created within this context
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClassClick = (classKey) => {
    const url = `/our-class?name=${encodeURIComponent(classKey)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBackToGrid = () => {
    const { pathname } = window.location;
    window.history.pushState({}, '', pathname);
    setShowDetails(false);
  };

  if (showDetails) {
    return (
      <>
        <Helmet>
          <title>Class Details | Our Classes in Salem</title>
          <meta name="description" content="View detailed information about our classes." />
        </Helmet>
        <OurStudioClassDetails />
      </>
    );
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

      <style jsx>{`
        .section-wrapper {
          background: linear-gradient(180deg, rgb(26, 24, 24, 1) 0%);
          padding: 20px 20px 60px 20px;
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
          flex-wrap: wrap; /* fix: true -> wrap */
          width: 100%;
          max-width: 1500px;
          z-index: 2;
          position: relative;
        }

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
          will-change: transform; /* smooth zoom */
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
          font-size: 1.3rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 20px;
          margin-left: 20px;
          z-index: 1;
          pointer-events: none;
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.6);
        }

        @media (max-width: 900px) {
          .Classs {
            width: calc(50% - 20px);
            max-width: none;
          }
        }

        @media (max-width: 600px) {
          .Classs {
            width: 100%;
            height: 260px;
          }
        }
      `}</style>

      <div className="section-wrapper">
        <h2 className="section-heading">Our Classes</h2>
        <div className="menu-section-container" ref={containerRef}>
          {imageData.map((item, index) => (
            <div
              key={index}
              className="Classs"
              ref={(el) => (imageCardRefs.current[index] = el)}
              aria-label={item.text}
              onClick={() => handleClassClick(item.classKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClassClick(item.classKey);
              }}
            >
              {/* Parallax wrapper */}
              <div className="img-wrap" ref={(el) => (imgWrapRefs.current[index] = el)}>
                <Image
                  src={item.src}
                  alt={item.alt || item.text}
                  fill
                  className="Classs-image"
                  sizes="(max-width: 900px) 50vw, 33vw"
                  priority={false}
                  style={{ objectFit: "cover" }}
                  // If you can't configure next.config for external images, add: unoptimized
                />
              </div>

              <span className="star-icon" aria-hidden>
                ★
              </span>
              <div className="image-text">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OurStudioClassesSection;