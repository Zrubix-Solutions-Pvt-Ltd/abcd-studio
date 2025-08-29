'use client';


import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PrivacySec() {
  const content = {
    paragraphs: [
      "At ABCD Studios, the safety and protection of children are at the heart of everything we do. We recognise that every person deserves to feel safe, nurtured, and free from harm or exploitation. We believe that meaningful change must begin at the top, and we are committed to leading the way.",
      "Every person deserves to feel safe, nurtured, and free from harm and exploitation. We are committed to fostering an environment where every child feels safe, valued, and empowered. With a zero-tolerance approach to harm, we take all concerns seriously, acting swiftly and ethically to protect children.",
      "Our policies reflect our dedication to cultural inclusion, supporting children from diverse backgrounds, and ensuring the wellbeing of all children."
    ],
    policyLinkText: "To learn more about our Child Safety Policy, visit the link here.",
    footerText: "ABCD Studios Salem © 2025 – All rights reserved."
  };

  const containerRef = useRef(null);
  const paragraphRefs = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const paragraphs = paragraphRefs.current;
    const footer = footerRef.current;

    // Animation for the main container/paragraphs
    gsap.fromTo(paragraphs,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2, // Stagger animation for each paragraph
        scrollTrigger: {
          trigger: container,
          start: 'top 80%', // Animation starts when the top of the container is 80% down from the viewport top
          toggleActions: 'play none none none',
        },
      }
    );

    // Animation for the footer
    gsap.fromTo(footer,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%', // Animation starts when the top of the footer is 90% down from the viewport top
          toggleActions: 'play none none none',
        },
      }
    );

  }, []);

  return (
    <>
      <style jsx>{`
        .privacy-container {
          font-family: 'Arial', sans-serif;
          color: black;
          padding: 60px 60px;
          text-align: center;
          max-width: 1400px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .privacy-paragraph {
          margin-bottom: 25px;
          font-size: 16px;
          line-height: 1.8;
        }

        .privacy-link {
          color: #0000EE; /* Standard blue link color */
          text-decoration: underline;
        }

        .privacy-footer {
          margin-top: 40px;
          font-weight: bold;
          font-size: 16px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .privacy-container {
            padding: 40px 20px;
          }

          .privacy-paragraph {
            font-size: 15px;
          }

          .privacy-footer {
            font-size: 14px;
          }
        }
      `}</style>
      <div className="privacy-container" ref={containerRef}>
        {content.paragraphs.map((paragraph, index) => (
          <p key={index} className="privacy-paragraph" ref={el => (paragraphRefs.current[index] = el)}>
            {paragraph}
          </p>
        ))}
        <p className="privacy-paragraph" ref={el => (paragraphRefs.current[content.paragraphs.length] = el)}>
          {content.policyLinkText.split('visit the link here.')[0]}
          <a href="#" className="privacy-link">visit the link here.</a>
        </p>
        <p className="privacy-footer" ref={footerRef}>
          {content.footerText}
        </p>
      </div>
    </>
  );
}

export default PrivacySec;