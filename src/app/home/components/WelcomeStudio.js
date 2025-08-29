"use client";

import React, { useEffect, useRef } from 'react';


import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function WelcomeStudio() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRefs = useRef([]);

  const content = {
    title: 'WELCOME TO ABCD!',
    paragraphs: [
      "Based on the Gold Coast, Dynamite Studios Australia is recognised globally for its exceptional dance education and performing arts training. Our facility uniquely combines state-of-the-art studios with a creative space and a fully equipped gym, distinguishing us as a reputable institution in the performing arts industry.",
      "At Dynamite Studios Australia, we are committed to excellence, offering students the guidance of industry professionals and a curriculum designed to prepare them for all avenues of the performing arts (dance, singing, acting, musical theatre, and circus). Our approach is innovative and trailblazing, setting new standards in the industry and fostering an environment where students can achieve their full potential.",
      "As a global leader in performing arts education, Dynamite Studios Australia is dedicated to delivering a transformative experience that encourages our community to dream, believe, and achieve."
    ]
  };

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const paragraphs = paragraphRefs.current;

    // Animation for the title
    gsap.fromTo(title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', // Animation starts when the top of the section is 80% down from the viewport top
          toggleActions: 'play none none none', // Play once when entering, do nothing otherwise
        },
      }
    );

    // Staggered animation for paragraphs
    gsap.fromTo(paragraphs,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2, // Delay between each paragraph animation
        scrollTrigger: {
          trigger: section,
          start: 'top 70%', // Start slightly later than the title
          toggleActions: 'play none none none',
        },
      }
    );

  }, []);

  return (
    <>
      <style jsx>{`
        .welcome-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          background-color: white;
          color: black;
          text-align: center;
        }

        @media (max-width: 1200px) {
          .welcome-container {
            padding: 4rem 8rem;
          }
        }

        @media (max-width: 768px) {
          .welcome-container {
            padding: 3rem 2rem;
          }
        }

        .welcome-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 2.5rem; /* Adjust font size as needed */
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          color: black;
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }
        }
          
        .welcome-paragraph {
        font-family: 'Arial', sans-serif;
          font-weight : 700;
          max-width : 1200px;
          font-size: 1.1rem; /* Adjust font size as needed */
          line-height: 1.4;
          margin-bottom: 0.8rem;
          color: #333;
        }

        @media (max-width: 768px) {
          .welcome-paragraph {
            font-size: 1rem;
            margin-bottom: 1rem;
          }
        }

        .welcome-paragraph:last-child {
          margin-bottom: 0;
        }
      `}</style>

      <div className="welcome-container" ref={sectionRef}>
        <h3 className="welcome-title" ref={titleRef}>{content.title}</h3>
        {content.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="welcome-paragraph"
            ref={el => (paragraphRefs.current[index] = el)} // Assign ref to each paragraph
          >
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );
}

export default WelcomeStudio;