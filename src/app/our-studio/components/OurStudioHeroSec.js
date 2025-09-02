'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// If you prefer component-scoped imports, uncomment these lines:
import './OurStudioHeroSec.css';
import './OurStudioHeroSecMobile.css';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const transparentImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

function OurStudioHeroSec({ ImageUrls, VideoUrls, LinkUrls }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const starRef = useRef(null);
  const buttonRef = useRef(null);

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

    // Parallax for background video (iframe)
    gsap.to(video, {
      y: '50%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Title reveal
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
    );

    // Paragraph reveal
    gsap.fromTo(
      paragraph,
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

    // Star pop-in
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
    );

    // Button reveal
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
    );

    // Shrink-on-scroll effect (desktop)
    const shrinkTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    shrinkTl
      .to(title, { scale: 0.9, yPercent: -8, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(paragraph, { scale: 0.9, yPercent: -8, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(star, { scale: 0.85, yPercent: -8, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(button, { scale: 0.95, yPercent: -8, transformOrigin: 'center center', ease: 'none' }, 0);
  }, []);

  return (
    <div className="OurStudio-section" ref={sectionRef}>
      <div className="OurStudio-background-iframe">
        <Image
          src={transparentImage}
          alt={videoItemUrls.video1?.altText}
          className="transparent-alt-image"
          width={1000 }
          height={1000}
        />
        <iframe
          src={videoItemUrls.video1?.url}
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          ref={videoRef}
        ></iframe>
        <div className="OurStudio-bottom-overlay"></div>
      </div>
      <div className="OurStudio-content-overlay">
        <h1 className="OurStudio-title" ref={titleRef}>
          About Us <span className="OurStudio-star-icon" ref={starRef}>&#9733;</span>
        </h1>
        <p className="OurStudio-paragraph" ref={paragraphRef}>
          Internationally acclaimed and recognised as a global brand, Dynamite Studios Australia is a platform for the world of performing arts excellence.
          At Dynamite Studios, we’re a family, a community of dreamers and doers, bound by our passion for excellence in the arts. As the premier performing arts school in Australia, we offer programs designed to nurture and empower students of all ages and aspirations. We believe in the power of individuality and celebrate each student’s journey with personalised attention and care. What truly sets us apart comes down to our tireless commitment to success. Dynamite Studios Australia is nestled right in the bustling hub of the entertainment industry, neighbouring international brands such as Village Studios, Warner Bros. Movie World, Sea World, and Dreamworld.
        </p>
        <button className="OurStudio-enquire-button" ref={buttonRef}>ENQUIRE NOW</button>
      </div>
    </div>
  );
}

function OurStudioHeroSecMobile({ ImageUrls, VideoUrls }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const starRef = useRef(null);
  const buttonRef = useRef(null);

  let imageItemUrls = ImageUrls;
  let videoItemUrls = VideoUrls;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const paragraph = paragraphRef.current;
    const star = starRef.current;
    const button = buttonRef.current;

    // Parallax for background video (iframe)
    gsap.to(video, {
      y: '50%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Title reveal
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
    );

    // Paragraph reveal
    gsap.fromTo(
      paragraph,
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

    // Star pop-in
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
    );

    // Button reveal
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
    );

    // Shrink-on-scroll effect (mobile)
    const shrinkTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    shrinkTl
      .to(title, { scale: 0.92, yPercent: -6, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(paragraph, { scale: 0.92, yPercent: -6, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(star, { scale: 0.88, yPercent: -6, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(button, { scale: 0.96, yPercent: -6, transformOrigin: 'center center', ease: 'none' }, 0);
  }, []);

  return (
    <div className="OurStudioMobile-section" ref={sectionRef}>
      <div className="OurStudioMobile-background-iframe">
        <Image
          src={transparentImage}
          alt={videoItemUrls.video1?.altText}
          className="transparent-alt-image"
        />
        <iframe
          src={videoItemUrls.video1?.url}
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          ref={videoRef}
        ></iframe>
      </div>
      <div className="OurStudioMobile-content-overlay">
        <h1 className="OurStudioMobile-title" ref={titleRef}>
          About Us <span className="OurStudioMobile-star-icon" ref={starRef}>&#9733;</span>
        </h1>
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
  );
}

export { OurStudioHeroSec, OurStudioHeroSecMobile };