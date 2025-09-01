'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image'; // Import Image from next/image
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ContactHeroSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const starRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const star = starRef.current;

    const triggers = []; // Array to store all ScrollTrigger instances for cleanup

    // Parallax effect for the background image
    if (image) {
      triggers.push(
        gsap.to(image, {
          y: '20%', // Moves the image up by 20% of its height as you scroll down
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }).scrollTrigger
      );
    }


    // Title animation (fade in and slight move up)
    if (title) {
      triggers.push(
        gsap.fromTo(title,
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
    }


    // Subtitle animation (fade in and slight move up, delayed)
    if (subtitle) {
      triggers.push(
        gsap.fromTo(subtitle,
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
    }


    // Star icon animation (pop in with a slight bounce)
    if (star) {
      triggers.push(
        gsap.fromTo(star,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: 0.8, // Delay after title and subtitle
            scrollTrigger: {
              trigger: star,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        ).scrollTrigger
      );
    }


    // Shrink group on scroll
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
      .to(star, { scale: 0.6, yPercent: -20, transformOrigin: 'center center', ease: 'none' }, 0);

    triggers.push(shrinkTl.scrollTrigger);


    return () => {
      triggers.forEach((t) => t && t.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <style>
        {`
          .ContactHero-section {
            position: relative;
            width: 100%;
            height: 80vh; /* Full viewport height */
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
          }

          .ContactHero-background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
            filter: brightness(0.5); /* Adjust brightness as needed to make text stand out */
          }

          .ContactHero-blur-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20%; /* 10% cover from the bottom */
            background: linear-gradient(to top, rgb(41 48 57), transparent); /* Gray blur effect */
            z-index: 0; /* Below content, above background image */
          }

          .ContactHero-content-overlay {
            position: relative;
            z-index: 1;
            padding: 20px;
          }

          .ContactHero-title {
            font-family: 'Impact', 'Arial Black', sans-serif; /* Closest common font */
            font-size: 7vw; /* Responsive font size */
            font-weight: 900;
            line-height: 0.9; /* Adjust line height for stacked text */
            margin: 0;
            text-transform: uppercase;
          }

          .ContactHero-subtitle {
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

          .ContactHero-star-icon {
            margin-left: 5px;
            font-size: 2vw;
            margin-bottom : 10px;
          }

          /* Responsive adjustments for mobile */
          @media (max-width: 768px) {
            .ContactHero-section {
              height: 70vh;
            }

           .ContactHero-title {
            font-family: 'Impact', 'Arial Black', sans-serif; /* Closest common font */
            font-size: 17vw; /* Responsive font size */
            font-weight: 900;
            line-height: 0.9; /* Adjust line height for stacked text */
            margin: 0;
            text-transform: uppercase;
          }

          .ContactHero-subtitle {
            font-family: 'Impact', 'Arial Black', sans-serif;
            font-size: 17vw;
            font-weight: 900;
            line-height: 0.9;
            margin-top: 10px;
            text-transform: uppercase;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            margin-bottom: 0;
          }

          .ContactHero-star-icon {
            margin-left: 5px;
            font-size: 7vw;
            margin-bottom : 10px;
          }
          }
        `}
      </style>
      <div className="ContactHero-section" ref={sectionRef}>
        <Image
          src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/cd2816f6-03aa-4b2e-9666-35211480ee53/CamilleBrown_2016V-embed.jpg?u%5Br%5D=2&u%5Bs%5D=0.5&u%5Ba%5D=0.8&u%5Bt%5D=0.03&quality=82w=640"
          alt="Contact Hero Background"
          layout="fill" // Use fill to make the image cover the parent
          objectFit="cover" // Cover the area without distorting aspect ratio
          className="ContactHero-background-image"
          ref={imageRef}
        />
        <div className="ContactHero-blur-overlay"></div>
        <div className="ContactHero-content-overlay">
          <h1 className="ContactHero-title" ref={titleRef}>CONTACT<span className="ContactHero-star-icon" ref={starRef}>&#9733;</span></h1>
          <h2 className="ContactHero-subtitle" ref={subtitleRef}>
            {/* <span className="ContactHero-star-icon">&#9733;</span> Unicode star character */}
          </h2>
        </div>
      </div>
    </>
  );
}

export default ContactHeroSection;