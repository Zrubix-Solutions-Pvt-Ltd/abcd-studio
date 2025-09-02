// page.js
'use client';

import React, { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Helmet } from 'react-helmet'; // not needed here
import OurStudioClassDetails from "./components/OurClassDetails";
import Image from "next/image";
import "./OurStudioClassesSection.css";
import { useSearchParams } from "next/navigation"; // ADDED

gsap.registerPlugin(ScrollTrigger);

function OurStudioClassesSection() {
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
  const imgWrapRefs = useRef([]);     // wrapper we parallax and where Image lives
  const imageElRefs = useRef([]);     // the actual next/image <img> DOM for zoom
  const svgPathRefs = useRef([]);

  const searchParams = useSearchParams(); // ADDED

  // Set correctly on the very first render so there is no flash of the grid
  const [showDetails, setShowDetails] = useState(() => {
    // ADDED: avoid window on SSR, read from searchParams
    return Boolean(searchParams.get('name'));
  });

  // Keep in sync on browser back/forward or query changes
  useEffect(() => {
    // ADDED: react to searchParams changes
    setShowDetails(Boolean(searchParams.get('name')));
  }, [searchParams]);

  useEffect(() => {
    // If we're showing the details page, skip setting up grid animations
    if (showDetails) return;

    // Tuning constants
    const ENABLE_IMG_ZOOM = true;
    const ENABLE_CARD_ZOOM = true;
    const PARALLAX_FROM = -30;   // px translateY at card enter
    const PARALLAX_TO = 20;      // px translateY at card exit
    const IMG_ZOOM_SCALE = 1.2;  // end scale for image zoom
    const CARD_ZOOM_SCALE = 1.06;// end scale for card zoom

    const ctx = gsap.context(() => {
      const cards = imageCardRefs.current.filter(Boolean);

      // Performance hints
      gsap.set(imgWrapRefs.current, { willChange: "transform" });
      gsap.set(cards, { willChange: "transform" });

      cards.forEach((card, i) => {
        const wrap = imgWrapRefs.current[i];
        const imgEl = imageElRefs.current[i];
        if (!card || !wrap) return;

        // Parallax the wrapper vertically across card scroll
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

        // Zoom the image element as it scrolls
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

        // Zoom the entire card as it scrolls
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

      // Ensure layout calculated after images load
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      return () => {
        window.removeEventListener('load', onLoad);
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, containerRef);

    return () => ctx.revert();
  }, [showDetails]);

  const handleClassClick = (classKey) => {
    const url = `/our-class?name=${encodeURIComponent(classKey)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBackToGrid = () => {
    const { pathname } = window.location;
    window.history.pushState({}, '', pathname);
    setShowDetails(false);
  };

  // If ?name is present, render details immediately (no initial grid render)
  if (showDetails) {
    return (
      <>
            <Suspense fallback={null}> 
      
        <OurStudioClassDetails onBack={handleBackToGrid}/>
        </Suspense>
      </>
    );
  }

  return (
    <>
      {/* <Helmet> ... </Helmet> */}

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
                  // If external domains not whitelisted in next.config, uncomment:
                  // unoptimized
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

// Disable SSR so we can read window at first paint and avoid hydration flash
export default dynamic(() => Promise.resolve(OurStudioClassesSection), { ssr: false });

// export default OurStudioClassesSection;