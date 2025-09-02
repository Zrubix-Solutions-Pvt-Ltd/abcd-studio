'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HomeHeroSection.module.css';
import stylesMobile from './HomeHeroSecMobile.module.css';

const transparentImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

function HomeHeroSection({ ImageUrls = {}, VideoUrls = {}, LinkUrls = {} }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const starRef = useRef(null);
  const buttonRef = useRef(null);

  const imageItemUrls = ImageUrls;
  const videoItemUrls = VideoUrls;
  const linkItemUrls = LinkUrls;

  useEffect(() => {
    if (!gsap.core.globals().ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const star = starRef.current;
    const button = buttonRef.current;

    const triggers = [];

    if (video) {
      triggers.push(
        gsap
          .to(video, {
            y: '50%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
          .scrollTrigger
      );
    }

    if (title) {
      triggers.push(
        gsap
          .fromTo(
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
          )
          .scrollTrigger
      );
    }

    if (subtitle) {
      triggers.push(
        gsap
          .fromTo(
            subtitle,
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
          )
          .scrollTrigger
      );
    }

    if (star) {
      triggers.push(
        gsap
          .fromTo(
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
          )
          .scrollTrigger
      );
    }

    if (button) {
      triggers.push(
        gsap
          .fromTo(
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
          )
          .scrollTrigger
      );
    }

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
      .to(star, { scale: 0.6, yPercent: -20, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(button, { scale: 0.75, yPercent: -20, transformOrigin: 'center center', ease: 'none' }, 0);

    triggers.push(shrinkTl.scrollTrigger);

    return () => {
      triggers.forEach((t) => t && t.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className={styles['HomeHero-section']} ref={sectionRef}>
      {/* Transparent overlay as an image via next/image (fills section) */}
      <div className={styles['transparent-alt-wrapper']}>
        <Image
          src={transparentImage}
          alt={linkItemUrls?.link1?.altText || 'background'}
          fill
          sizes="100vw"
          priority={false}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className={styles['HomeHero-background-iframe']}>
        <div className={styles['transparent-alt-wrapper']}>
          <Image
            src={transparentImage}
            alt={videoItemUrls?.video1?.altText || 'background video'}
            fill
            sizes="100vw"
            priority={false}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <iframe
          src={videoItemUrls?.video1?.url}
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media; muted; loop"
          allowFullScreen
          ref={videoRef}
        />
      </div>

      <div className={styles['HomeHero-content-overlay']}>
        <h1 className={styles['HomeHero-title']} ref={titleRef}>ABCD</h1>
        <h2 className={styles['HomeHero-subtitle']} ref={subtitleRef}>
          STUDIOS
          <span className={styles['HomeHero-star-icon']} ref={starRef}>&#9733;</span>
        </h2>
        <button className={styles['HomeHero-enquire-button']} ref={buttonRef}>ENQUIRE NOW</button>
      </div>
    </div>
  );
}

function HomeHeroSecMobile({ ImageUrls = {}, VideoUrls = {} }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const starRef = useRef(null);
  const buttonRef = useRef(null);

  const videoItemUrls = VideoUrls;

  useEffect(() => {
    if (!gsap.core.globals().ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const star = starRef.current;
    const button = buttonRef.current;

    const triggers = [];

    if (video) {
      triggers.push(
        gsap
          .to(video, {
            y: '50%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
          .scrollTrigger
      );
    }

    if (title) {
      triggers.push(
        gsap
          .fromTo(
            title,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
          .scrollTrigger
      );
    }

    if (subtitle) {
      triggers.push(
        gsap
          .fromTo(
            subtitle,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              delay: 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: subtitle,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
          .scrollTrigger
      );
    }

    if (star) {
      triggers.push(
        gsap
          .fromTo(
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
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
          .scrollTrigger
      );
    }

    if (button) {
      triggers.push(
        gsap
          .fromTo(
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
                start: 'top 95%',
                toggleActions: 'play none none none',
              },
            }
          )
          .scrollTrigger
      );
    }

    const shrinkTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    shrinkTl
      .to(title, { scale: 0.7, yPercent: -10, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(subtitle, { scale: 0.7, yPercent: -10, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(star, { scale: 0.7, yPercent: -10, transformOrigin: 'center center', ease: 'none' }, 0)
      .to(button, { scale: 0.9, yPercent: -10, transformOrigin: 'center center', ease: 'none' }, 0);

    triggers.push(shrinkTl.scrollTrigger);

    return () => {
      triggers.forEach((t) => t && t.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className={stylesMobile['HomeHeroSecMobile-section']} ref={sectionRef}>
      <div className={stylesMobile['HomeHeroSecMobile-background-iframe']}>
        <div className={stylesMobile['transparent-alt-wrapper']}>
          <Image
            src={transparentImage}
            alt={videoItemUrls?.video1?.altText || 'background video'}
            fill
            sizes="100vw"
            priority={false}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <iframe
          src={videoItemUrls?.video1?.url}
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media; muted; loop"
          allowFullScreen
          ref={videoRef}
        />
      </div>
      <div className={stylesMobile['HomeHeroSecMobile-content-overlay']}>
        <h1 className={stylesMobile['HomeHeroSecMobile-title']} ref={titleRef}>ABCD</h1>
        <h2 className={stylesMobile['HomeHeroSecMobile-subtitle']} ref={subtitleRef}>
          STUDIOS
          <span className={stylesMobile['HomeHeroSecMobile-star-icon']} ref={starRef}>&#9733;</span>
        </h2>
        <button className={stylesMobile['HomeHeroSecMobile-enquire-button']} ref={buttonRef}>ENQUIRE NOW</button>
      </div>
    </div>
  );
}

export { HomeHeroSection, HomeHeroSecMobile };