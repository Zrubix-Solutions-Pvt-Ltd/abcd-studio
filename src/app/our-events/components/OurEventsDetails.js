// OurStudioEventsDetails.jsx
'use client';

import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EventData } from "./EventsData";

import Image from "next/image";
import Header from "../../header/page";
import Footer from "../../footer/page";

import { useSearchParams } from "next/navigation";

import { Helmet } from "react-helmet";
import styles from "./OurStudioEventsDetails.module.css";

gsap.registerPlugin(ScrollTrigger);

// ------------------------ HERO ------------------------
function EventsDetailsHeroSec({ hero }) {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const starRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const star = starRef.current;

    gsap.to(imageWrap, {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 80%" },
      }
    );

    gsap.fromTo(
      subtitle,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: subtitle, start: "top 80%" },
      }
    );

    gsap.fromTo(
      star,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.8,
        scrollTrigger: { trigger: star, start: "top 80%" },
      }
    );

    const shrinkTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    shrinkTl
      .to(title, { scale: 0.9, yPercent: -8, transformOrigin: "center center", ease: "none" }, 0)
      .to(subtitle, { scale: 0.9, yPercent: -8, transformOrigin: "center center", ease: "none" }, 0)
      .to(star, { scale: 0.85, yPercent: -8, transformOrigin: "center center", ease: "none" }, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Class Details | Our Classes in Salem</title>
        <meta name="description" content="View detailed information about our classes." />
      </Helmet>

      <div className={styles.contactHeroSection} ref={sectionRef}>
        <div className={styles.contactHeroImageWrap} ref={imageWrapRef}>
          <Image
            src={hero?.backgroundImage || ""}
            alt="Contact Hero Background"
            width={1920}
            height={1080}
            priority
            className={styles.contactHeroBackgroundImage}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.5)" }}
          />
        </div>
        <div className={styles.contactHeroBlurOverlay}></div>
        <div className={styles.contactHeroContentOverlay}>
          <h1 className={styles.contactHeroTitle} ref={titleRef}>
            {hero?.title || ""}{" "}
            <span className={styles.contactHeroStarIcon} ref={starRef}>
              &#9733;
            </span>
          </h1>
          <h2 className={styles.contactHeroSubtitle} ref={subtitleRef}>
            {hero?.subtitle || ""}
          </h2>
        </div>
      </div>
    </>
  );
}

// ------------------------ GALLERY ------------------------
function EventsDetailsImages({ gallery }) {
  const rowRefs = useRef([]);

  const images = Array.isArray(gallery?.images) ? gallery.images : [];
  const rows = [
    images.slice(0, 2),
    images.slice(2, 5),
    images.slice(5, 7),
    images.slice(7, 10),
  ];

  useEffect(() => {
    rowRefs.current.forEach((rowElement) => {
      if (rowElement) {
        gsap.fromTo(
          rowElement,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rowElement,
              start: "top 85%",
              end: "bottom 15%",
              scrub: true,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className={styles.imageGridContainer}>
      <h2 className={styles.galleryHeading}>{gallery?.title || ""}</h2>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`${styles.imageRow} ${row.length === 2 ? styles.imageRow2Cols : styles.imageRow3Cols}`}
          ref={(el) => (rowRefs.current[rowIndex] = el)}
        >
          {row.map((image, imageIndex) => (
            <div key={`${rowIndex}-${imageIndex}`} className={styles.imageCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={image.src}
                  alt={image.alt || ""}
                  width={1200}
                  height={800}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ------------------------ LAYOUT ------------------------
function DanceClassLayout({ layout }) {
  const [activeMenuItem, setActiveMenuItem] = useState("introduction");
  const contentRef = useRef(null);
  const menuRefs = useRef({});

  const menuItems = useMemo(() => layout?.menuItems || [], [layout?.menuItems]);
  theContent: {
  }
  const contentData = layout?.contentData || {};
  const currentContent = contentData[activeMenuItem] || {};

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }

    menuItems.forEach((item) => {
      const menuItemElement = menuRefs.current[item.id];
      if (menuItemElement) {
        gsap.to(menuItemElement.querySelector(`.${styles.menuItemArrow}`), {
          opacity: 0,
          x: 0,
          duration: 0.3,
          ease: "power1.out",
        });
        gsap.to(menuItemElement.querySelector(`.${styles.menuItemText}`), {
          color: "#fff",
          duration: 0.3,
          ease: "power1.out",
        });
      }
    });

    const activeMenuItemElement = menuRefs.current[activeMenuItem];
    if (activeMenuItemElement) {
      gsap.to(activeMenuItemElement.querySelector(`.${styles.menuItemArrow}`), {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power1.out",
      });
      gsap.to(activeMenuItemElement.querySelector(`.${styles.menuItemText}`), {
        color: "#fff",
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [activeMenuItem, menuItems]);

  const handleMouseEnter = (e, itemId) => {
    if (itemId !== activeMenuItem) {
      gsap.to(e.currentTarget.querySelector(`.${styles.menuItemText}`), {
        color: "#ccc",
        duration: 0.3,
        ease: "power1.out",
      });
      gsap.to(e.currentTarget.querySelector(`.${styles.menuItemArrow}`), {
        opacity: 0.5,
        x: 5,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = (e, itemId) => {
    if (itemId !== activeMenuItem) {
      gsap.to(e.currentTarget.querySelector(`.${styles.menuItemText}`), {
        color: "#fff",
        duration: 0.3,
        ease: "power1.out",
      });
      gsap.to(e.currentTarget.querySelector(`.${styles.menuItemArrow}`), {
        opacity: 0,
        x: 0,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  };

  return (
    <div className={styles.danceLayoutContainer}>
      <div className={styles.sidebar}>
        <h4 className={styles.sidebarHeading}>DANCE STAGES</h4>
        <ul className={styles.menuList}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <li
                className={`${styles.menuItem} ${activeMenuItem === item.id ? styles.active : ""}`}
                onClick={() => setActiveMenuItem(item.id)}
                onMouseEnter={(e) => handleMouseEnter(e, item.id)}
                onMouseLeave={(e) => handleMouseLeave(e, item.id)}
                ref={(el) => (menuRefs.current[item.id] = el)}
              >
                <span className={styles.menuItemText}>{item.label}</span>
                <span className={styles.menuItemArrow}>→</span>
              </li>
              {index < menuItems.length - 1 && (
                <div className={styles.menuItemDivider}></div>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className={styles.contentArea} ref={contentRef}>
        <h2 className={styles.contentTitle}>{currentContent.title}</h2>
        <p className={styles.contentText}>{currentContent.text}</p>
        {currentContent.imageSrc && (
          <div className={styles.contentImageWrapper}>
            <Image
              src={currentContent.imageSrc}
              alt={
                currentContent.title
                  ? `${currentContent.title} - Dance Performance`
                  : "Dance Performance"
              }
              width={1200}
              height={800}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------ VIDEOS ------------------------
function EventsDetailsVideos({ videos }) {
  const videoGridRef = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.set([headingRef.current, ...(videoGridRef.current?.children || [])], {
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      headingRef.current,
      { y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    if (videoGridRef.current) {
      tl.fromTo(
        videoGridRef.current.children,
        { y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
        },
        "<0.2"
      );
    }
  }, []);

  const links = Array.isArray(videos?.videoLinks) ? videos.videoLinks : [];

  return (
    <div ref={containerRef} className={styles.videoGridContainer}>
      <h2 ref={headingRef} className={styles.videoGalleryHeading}>
        {videos?.title || ""}
      </h2>
      <div ref={videoGridRef} className={styles.videoGrid}>
        {links.map((video, index) => (
          <div key={index} className={styles.videoCard}>
            <iframe
              src={video.src}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className={styles.videoInfo}>
              <h4>{video.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------ PAGE WRAPPER ------------------------
function OurStudioEventsDetails() {
  const searchParams = useSearchParams();
  const name = searchParams?.get("name");

  // Pick from URL if valid, else fallback to "wedding"
  const classKey = name && EventData[name] ? name : "wedding";
  const data = EventData[classKey];

  return (
    <>
      <Header />
      <EventsDetailsHeroSec hero={data.hero} />
      <DanceClassLayout layout={data.layout} />
      <EventsDetailsImages gallery={data.gallery} />
      <EventsDetailsVideos videos={data.videos} />
      <Footer />
    </>
  );
}

export default OurStudioEventsDetails;