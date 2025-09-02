'use client';

import React, { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { classData } from "./ClassData";

import Image from "next/image";
import Header from "../../header/page";
import Footer from "../../footer/page";

import { useSearchParams } from "next/navigation";

import { Helmet } from "react-helmet";
import "./OurStudioClassDetails.css"; // new external CSS

gsap.registerPlugin(ScrollTrigger);

// ------------------------ HERO ------------------------

function ClassDetailsHeroSec({ hero }) {
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

    // Small shrink effect on scroll
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

      <div className="ContactHero-section" ref={sectionRef}>
        <div className="ContactHero-image-wrap" ref={imageWrapRef}>
          <Image
            src={hero?.backgroundImage || ""}
            alt="Contact Hero Background"
            width={1920}
            height={1080}
            priority
            className="ContactHero-background-image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "brightness(0.5)",
            }}
          />
        </div>
        <div className="ContactHero-blur-overlay"></div>
        <div className="ContactHero-content-overlay">
          <h1 className="ContactHero-title" ref={titleRef}>
            {hero?.title || ""}{" "}
            <span className="ContactHero-star-icon" ref={starRef}>
              &#9733;
            </span>
          </h1>
          <h2 className="ContactHero-subtitle" ref={subtitleRef}>
            {hero?.subtitle || ""}
          </h2>
        </div>
      </div>
    </>
  );
}

// ------------------------ GALLERY ------------------------
function ClassDetailsImages({ gallery }) {
  const rowRefs = useRef([]);

  const images = Array.isArray(gallery?.images) ? gallery.images : [];

  // Group into 2-3-2-3
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
    <div className="image-grid-container">
      <h2 className="gallery-heading">{gallery?.title || ""}</h2>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`image-row ${
            row.length === 2 ? "image-row-2-cols" : "image-row-3-cols"
          }`}
          ref={(el) => (rowRefs.current[rowIndex] = el)}
        >
          {row.map((image, imageIndex) => (
            <div key={`${rowIndex}-${imageIndex}`} className="image-card">
              <div className="image-wrapper">
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
        gsap.to(menuItemElement.querySelector(".menu-item-arrow"), {
          opacity: 0,
          x: 0,
          duration: 0.3,
          ease: "power1.out",
        });
        gsap.to(menuItemElement.querySelector(".menu-item-text"), {
          color: "#fff",
          duration: 0.3,
          ease: "power1.out",
        });
      }
    });

    const activeMenuItemElement = menuRefs.current[activeMenuItem];
    if (activeMenuItemElement) {
      gsap.to(activeMenuItemElement.querySelector(".menu-item-arrow"), {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power1.out",
      });
      gsap.to(activeMenuItemElement.querySelector(".menu-item-text"), {
        color: "#fff",
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [activeMenuItem, menuItems]);

  const handleMouseEnter = (e, itemId) => {
    if (itemId !== activeMenuItem) {
      gsap.to(e.currentTarget.querySelector(".menu-item-text"), {
        color: "#ccc",
        duration: 0.3,
        ease: "power1.out",
      });
      gsap.to(e.currentTarget.querySelector(".menu-item-arrow"), {
        opacity: 0.5,
        x: 5,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = (e, itemId) => {
    if (itemId !== activeMenuItem) {
      gsap.to(e.currentTarget.querySelector(".menu-item-text"), {
        color: "#fff",
        duration: 0.3,
        ease: "power1.out",
      });
      gsap.to(e.currentTarget.querySelector(".menu-item-arrow"), {
        opacity: 0,
        x: 0,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  };

  return (
    <div className="dance-layout-container">
      <div className="sidebar">
        <h4 className="sidebar-heading">DANCE STAGES</h4>
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <li
                className={`menu-item ${activeMenuItem === item.id ? "active" : ""}`}
                onClick={() => setActiveMenuItem(item.id)}
                onMouseEnter={(e) => handleMouseEnter(e, item.id)}
                onMouseLeave={(e) => handleMouseLeave(e, item.id)}
                ref={(el) => (menuRefs.current[item.id] = el)}
              >
                <span className="menu-item-text">{item.label}</span>
                <span className="menu-item-arrow">→</span>
              </li>
              {index < menuItems.length - 1 && (
                <div className="menu-item-divider"></div>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className="content-area" ref={contentRef}>
        <h2 className="content-title">{currentContent.title}</h2>
        <p className="content-text">{currentContent.text}</p>
        {currentContent.imageSrc && (
          <div className="content-image-wrapper">
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
function ClassDetailsVideos({ videos }) {
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
    <div ref={containerRef} className="video-grid-container">
      <h2 ref={headingRef} className="video-gallery-heading">
        {videos?.title || ""}
      </h2>
      <div ref={videoGridRef} className="video-grid">
        {links.map((video, index) => (
          <div key={index} className="video-card">
            <iframe
              src={video.src}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="video-info">
              <h4>{video.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ------------------------ PAGE WRAPPER ------------------------
function OurStudioClassDetails() {
  const searchParams = useSearchParams();
  const name = searchParams?.get("name");

  // Pick from URL if valid, else fallback to "kids"
  const classKey = name && classData[name] ? name : "kids";
  const data = classData[classKey];

  return (
    <>
      <Header />
      <ClassDetailsHeroSec hero={data.hero} />
      <DanceClassLayout layout={data.layout} />
      <ClassDetailsImages gallery={data.gallery} />
      <ClassDetailsVideos videos={data.videos} />
      <Footer />
    </>
  );
}

export default OurStudioClassDetails;