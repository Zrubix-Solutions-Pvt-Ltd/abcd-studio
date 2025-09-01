'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined' && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

function MenuImagesSection({ ImageUrls, VideoUrls }) {
  const imageItemUrls = ImageUrls;

  const imageData = [
    {
      src: imageItemUrls.image4.url,
      alt: imageItemUrls.image4.altText || 'Our Studio',
      text: 'OUR STUDIO',
      navPath: '/studio',
    },
    {
      src: imageItemUrls.image5.url,
      alt: imageItemUrls.image5.altText || 'Our Agency',
      text: 'OUR AGENCY',
      navPath: '/agency',
    },
    {
      src: imageItemUrls.image6.url,
      alt: imageItemUrls.image6.altText || 'Our Gym',
      text: 'OUR GYM',
      navPath: '/gym',
    },
    {
      src: imageItemUrls.image7.url,
      alt: imageItemUrls.image7.altText || 'Our Creative Space',
      text: 'OUR CREATIVE SPACE',
      navPath: '/creative-space',
    },
  ];

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const imgWrapRefs = useRef([]); // animate wrapper for parallax

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Card entrance
    // const entrance = gsap.fromTo(
    //   cardRefs.current,
    //   { opacity: 0, y: 50, scale: 0.95 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scale: 1,
    //     duration: 0.7,
    //     ease: 'power3.out',
    //     stagger: 0.12,
    //     scrollTrigger: {
    //       trigger: containerRef.current,
    //       start: 'top 85%',
    //       toggleActions: 'play none none none',
    //     },
    //   }
    // );

    // Image entrance (wraps)
    // const imgEntrance = gsap.fromTo(
    //   imgWrapRefs.current,
    //   { opacity: 0.6, scale: 1.1 },
    //   {
    //     opacity: 1,
    //     scale: 1,
    //     duration: 0.9,
    //     ease: 'power2.out',
    //     stagger: 0.12,
    //     scrollTrigger: {
    //       trigger: containerRef.current,
    //       start: 'top 85%',
    //       toggleActions: 'play none none none',
    //     },
    //   }
    // );

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
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
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
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
        return t.scrollTrigger;
      })
      .filter(Boolean);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      entrance?.scrollTrigger?.kill();
      imgEntrance?.scrollTrigger?.kill();
      parallaxTriggers.forEach((st) => st && st.kill());
      zoomTriggers.forEach((st) => st && st.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .menu-section-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #293039;
          padding: 100px 20px;
          gap: 60px;
          flex-wrap: wrap;
        }
        .image-card {
          position: relative;
          width: 280px;
          height: 350px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          text-align: left;
          border: 1px solid #333;
          text-decoration: none;
          will-change: transform;
        }
        /* Wrapper we animate for parallax and entrance */
        .image-wrap {
          position: absolute;
          top: -10%;
          left: 0;
          width: 100%;
          height: 120%;
          filter: brightness(0.7);
          will-change: transform;
          transition: filter 0.25s ease;
        }
        .image-card:hover .image-wrap {
          filter: brightness(1);
        }
        .star-icon {
          position: absolute;
          top: 15px;
          right: 15px;
          color: white;
          font-size: 30px;
          z-index: 2;
          pointer-events: none;
        }
        .image-text {
          position: relative;
          color: white;
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 20px;
          margin-left: 20px;
          z-index: 1;
          pointer-events: none;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
        }
        @media (max-width: 768px) {
          .menu-section-container {
            flex-direction: column;
            padding: 50px 10px;
          }
          .image-text {
            font-size: 1rem;
            margin-left: 15px;
          }
        }
      `}</style>

      <div className="menu-section-container" ref={containerRef}>
        {imageData.map((item, index) => (
          <a
            href={item.navPath}
            key={index}
            className="image-card"
            ref={(el) => (cardRefs.current[index] = el)}
          >
            {/* Wrapper for next/image fill. We animate this wrapper. */}
            <div
              className="image-wrap"
              ref={(el) => (imgWrapRefs.current[index] = el)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="280px"
                priority={false}
                style={{ objectFit: 'cover' }}
                // If you can't update next.config.js yet, temporarily add:
                // unoptimized
              />
            </div>
            <span className="star-icon">★</span>
            <div className="image-text">{item.text}</div>
          </a>
        ))}
      </div>
    </>
  );
}

export default MenuImagesSection;