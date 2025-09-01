'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const transparentImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

function 
OurStudioHeroSec({ ImageUrls, VideoUrls, LinkUrls }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null); // Ref for the iframe
  const titleRef = useRef(null);
  const paragraphRef = useRef(null); // Ref for the new paragraph
  const starRef = useRef(null);
  const buttonRef = useRef(null); // Ref for the button

  let imageItemUrls = ImageUrls;
  let videoItemUrls = VideoUrls;
  let linkItemUrls = LinkUrls;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const paragraph = paragraphRef.current;
    const star = starRef.current;
    const button = buttonRef.current;

    // Parallax effect for the background video (iframe)
    gsap.to(video, {
      y: '50%', // Moves the video up by 50% of its height as you scroll down
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Title animation (fade in and slight move up)
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
    );

    // Paragraph animation (fade in and slight move up, delayed)
    gsap.fromTo(paragraph,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paragraph,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Star icon animation (pop in with a slight bounce)
    gsap.fromTo(star,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.8, // Delay after title and paragraph
        scrollTrigger: {
          trigger: star,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Button animation (fade in and slight move up, delayed)
    gsap.fromTo(button,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1.0, // Delay after star
        ease: 'power3.out',
        scrollTrigger: {
          trigger: button,
          start: 'top 90%', // Adjust start for button visibility
          toggleActions: 'play none none none',
        },
      }
    );

  }, []);

  return (
    <>
      <style>
        {`
          .OurStudio-section {
            position: relative;
            width: 100%;
            height: 100vh; /* Full viewport height */
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
          }

          .OurStudio-background-iframe {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100vw; /* Full viewport width */
            height: 100vh; /* Full viewport height */
            transform: translate(-50%, -50%);
            pointer-events: none; /* Allows clicks to pass through to elements behind */
            z-index: -1;
            filter: brightness(0.1); /* Darken the video to make text stand out */
          }

          /* Aspect ratio correction for iframe to cover the screen */
          .OurStudio-background-iframe iframe {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }

          /* This ensures the iframe covers the entire screen without black bars */
          @media (min-aspect-ratio: 16/9) {
            .OurStudio-background-iframe iframe {
              height: 56.25vw; /* 9 / 16 * 100 */
              min-height: 100%;
              width: 100%;
            }
          }

          @media (max-aspect-ratio: 16/9) {
            .OurStudio-background-iframe iframe {
              width: 177.78vh; /* 16 / 9 * 100 */
              min-width: 100%;
              height: 100%;
            }
          }

          /* Style for the transparent image behind the iframe */
          .OurStudio-background-iframe .transparent-alt-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0; /* Ensure it's behind the iframe but still within the container */
            pointer-events: none;
          }

          .OurStudio-bottom-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30%; /* 20% from the bottom */
            background: linear-gradient(to top, rgb(255, 255, 255), transparent); /* Gray blur effect */
            z-index: 0; /* Below content, above video */
            pointer-events: none;
          }



          .OurStudio-content-overlay {
            position: relative;
            z-index: 1;
            padding: 20px;
            max-width: 1200px; /* Limit width for better readability */
          }

          .OurStudio-title {
            font-family: 'Impact', 'Arial Black', sans-serif; /* Closest common font */
            font-size: 7vw; /* Responsive font size */
            font-weight: 900;
            line-height: 0.9; /* Adjust line height for stacked text */
            margin: 0;
            text-transform: uppercase;
          }

          .OurStudio-paragraph {
            font-family: 'Arial', sans-serif;
            font-size: 1.2vw;
            line-height: 1.5;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 0 20px;
          }

          .OurStudio-star-icon {
            margin-left: 5px;
            font-size: 2vw;
            margin-bottom : 10px;
          }

          .OurStudio-enquire-button {
            background-color: white;
            color: black;
            border: none;
            padding: 15px 40px;
            margin-top: 40px;
            font-family: 'Arial', sans-serif; /* A more standard font for the button */
            font-size: 1.2vw; /* Responsive button font size */
            font-weight: 900;
            text-transform: uppercase;
            cursor: pointer;
            transition: background-color 0.3s ease;
            text-decoration: none; /* For anchor tag if used */
          }

          .OurStudio-enquire-button:hover {
            background-color: #f0f0f0;
          }

          /* Responsive adjustments - These will be overridden by OurStudioHeroSecMobile on smaller screens */
          @media (max-width: 768px) {
            .OurStudio-section {
              display: none; /* Hide this component on smaller screens */
            }
          }
        `}
      </style>
      <div className="OurStudio-section" ref={sectionRef}>
        <div className="OurStudio-background-iframe">
          {/* Transparent image for alt text */}
          <img
            src={transparentImage}
            alt={videoItemUrls.video1.altText}
            className="transparent-alt-image"
          />
          <iframe
            src={videoItemUrls.video1.url}
            title="Background Video" // This title is for the iframe itself, not for screen readers in the same way alt text is.
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            ref={videoRef} // Add ref to the iframe
          ></iframe>
          <div className="OurStudio-bottom-overlay"></div>
        </div>
        <div className="OurStudio-content-overlay">
          <h1 className="OurStudio-title" ref={titleRef}>About Us <span className="OurStudio-star-icon" ref={starRef}>&#9733;</span></h1>
          <p className="OurStudio-paragraph" ref={paragraphRef}>
            Internationally acclaimed and recognised as a global brand, Dynamite Studios Australia is a platform for the world of performing arts excellence.
            At Dynamite Studios, we’re a family, a community of dreamers and doers, bound by our passion for excellence in the arts. As the premier performing arts school in Australia, we offer programs designed to nurture and empower students of all ages and aspirations. We believe in the power of individuality and celebrate each student’s journey with personalised attention and care. What truly sets us apart comes down to our tireless commitment to success. Dynamite Studios Australia is nestled right in the bustling hub of the entertainment industry, neighbouring international brands such as Village Studios, Warner Bros. Movie World, Sea World, and Dreamworld.
          </p>
          <button className="OurStudio-enquire-button" ref={buttonRef}>ENQUIRE NOW</button>
        </div>
      </div>
    </>
  );
}

function OurStudioHeroSecMobile({ ImageUrls, VideoUrls }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null); // Ref for the iframe
  const titleRef = useRef(null);
  const paragraphRef = useRef(null); // Ref for the new paragraph
  const starRef = useRef(null);
  const buttonRef = useRef(null); // Ref for the button

  let imageItemUrls = ImageUrls;
  let videoItemUrls = VideoUrls;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const paragraph = paragraphRef.current;
    const star = starRef.current;
    const button = buttonRef.current;

    // Parallax effect for the background video (iframe)
    gsap.to(video, {
      y: '50%', // Moves the video up by 50% of its height as you scroll down
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Title animation (fade in and slight move up)
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
    );

    // Paragraph animation (fade in and slight move up, delayed)
    gsap.fromTo(paragraph,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paragraph,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Star icon animation (pop in with a slight bounce)
    gsap.fromTo(star,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.8, // Delay after title and paragraph
        scrollTrigger: {
          trigger: star,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Button animation (fade in and slight move up, delayed)
    gsap.fromTo(button,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1.0, // Delay after star
        ease: 'power3.out',
        scrollTrigger: {
          trigger: button,
          start: 'top 90%', // Adjust start for button visibility
          toggleActions: 'play none none none',
        },
      }
    );

  }, []);

  return (
    <>
      <style>
        {`
          .OurStudioMobile-section {
            position: relative;
            width: 100%;
            height: 90vh; /* Full viewport height */
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;

          }

          .OurStudioMobile-background-iframe {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100vw; /* Full viewport width */
            height: 100vh; /* Full viewport height */
            transform: translate(-50%, -50%);
            pointer-events: none; /* Allows clicks to pass through to elements behind */
            z-index: -1;
            filter: brightness(0.1); /* Darken the video to make text stand out */
          }

          /* Aspect ratio correction for iframe to cover the screen */
          @media (min-aspect-ratio: 16/9) {
            .OurStudioMobile-background-iframe iframe {
              height: 56.25vw; /* 9 / 16 * 100 */
              min-height: 100%;
              width: 100%;
            }
          }

          @media (max-aspect-ratio: 16/9) {
            .OurStudioMobile-background-iframe iframe {
              width: 177.78vh; /* 16 / 9 * 100 */
              min-width: 100%;
              height: 100%;
            }
          }

          /* Style for the transparent image behind the iframe */
          .OurStudioMobile-background-iframe .transparent-alt-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0; /* Ensure it's behind the iframe but still within the container */
            pointer-events: none;
          }


          .OurStudioMobile-content-overlay {
            position: relative;
            z-index: 1;
            padding: 20px;
            max-width: 90%; /* Limit width for better readability on mobile */
          }

          .OurStudioMobile-title {
            font-family: 'Impact', 'Arial Black', sans-serif; /* Closest common font */
            font-size: 20vw; /* Responsive font size for mobile */
            font-weight: 900;
            line-height: 0.9; /* Adjust line height for stacked text */
            margin: 0;
            text-transform: uppercase;
          }

          .OurStudioMobile-paragraph {
            font-family: 'Arial', sans-serif;
            font-size: 3.5vw; /* Adjusted for mobile */
            line-height: 1.5;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 0 10px;
          }

          .OurStudioMobile-star-icon {
            margin-left: 10px; /* Adjusted for smaller screens */
            font-size: 7vw; /* Adjusted for smaller screens */
            margin-bottom : 10px;
          }

          .OurStudioMobile-enquire-button {
            background-color: white;
            color: black;
            border: none;
            padding: 12px 25px; /* Adjusted for smaller screens */
            margin-top: 40px;
            font-family: 'Arial', sans-serif; /* A more standard font for the button */
            font-size: 3vw; /* Responsive button font size for mobile */
            font-weight: 900;
            text-transform: uppercase;
            cursor: pointer;
            transition: background-color 0.3s ease;
            text-decoration: none; /* For anchor tag if used */
          }

          .OurStudioMobile-enquire-button:hover {
            background-color: #f0f0f0;
          }

          /* Show this component only on smaller screens */
          @media (min-width: 769px) {
            .OurStudioMobile-section {
              display: none;
            }
          }
        `}
      </style>
      <div className="OurStudioMobile-section" ref={sectionRef}>
        <div className="OurStudioMobile-background-iframe">
          {/* Transparent image for alt text */}
          <img
            src={transparentImage}
            alt={videoItemUrls.video1.altText}
            className="transparent-alt-image"
          />
          <iframe
            src={videoItemUrls.video1.url}
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            ref={videoRef} // Add ref to the iframe
          ></iframe>
        </div>
        <div className="OurStudioMobile-content-overlay">
        <h1 className="OurStudioMobile-title" ref={titleRef}>About Us <span className="OurStudioMobile-star-icon" ref={starRef}>&#9733;</span></h1>
          <p className="OurStudioMobile-paragraph" ref={paragraphRef}>
            Internationally acclaimed and recognised as a global brand, Dynamite Studios Australia is a platform for the world of performing arts excellence.
            At Dynamite Studios, we’re a family, a community of dreamers 
            and doers, bound by our passion for excellence in the arts. 
            As the premier performing arts school in Australia, we offer programs 
            designed to nurture and empower students of all ages and aspirations. 
          </p>
          <button className="OurStudioMobile-enquire-button" ref={buttonRef}>ENQUIRE NOW</button>
        </div>
      </div>
    </>
  );
}

export { OurStudioHeroSec, OurStudioHeroSecMobile };