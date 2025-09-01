'use client';

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { classData } from "./ClassData";

import Image from "next/image";
import Header from "../../header/page";
import Footer from "../../footer/page";

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
  }, []);

  return (
    <>
      <style jsx>{`
        .ContactHero-section {
          position: relative;
          width: 100%;
          height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
        }

        .ContactHero-image-wrap {
          position: absolute;
          inset: 0;
          z-index: -1;
        }

        /* FIX: use object-fit: cover and remove width constraints */
        .ContactHero-background-image {
          // object-fit: cover; /* change to 'contain' if you don't want any cropping */
          filter: brightness(0.5);
          width:100%;
          height:100%
        }


        .ContactHero-blur-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20%;
          background: linear-gradient(to top, rgb(140, 126, 126), transparent);
          z-index: 0;
        }

        .ContactHero-content-overlay {
          position: relative;
          z-index: 1;
          padding: 20px;
        }

        .ContactHero-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 7vw;
          font-weight: 900;
          line-height: 0.9;
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
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .ContactHero-section {
            height: 70vh;
          }
          .ContactHero-title { font-size: 17vw; }
          .ContactHero-subtitle { font-size: 17vw; }
          .ContactHero-star-icon { font-size: 7vw; }
        }
      `}</style>

      <div className="ContactHero-section" ref={sectionRef}>
        <div className="ContactHero-image-wrap" ref={imageWrapRef}>
          <Image
            src={hero?.backgroundImage || ""}
            alt="Contact Hero Background"
             
          width={1200}
    height={800}
    // sizes="(max-width: 600px) 100vw, (max-width: 800px) 50vw, 33vw"
    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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

  // Group into 2-3-2-3 as in your design
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
    <>
      <style jsx>{`
        .image-grid-container {
          padding: 40px;
          background-color: #293039;
        }

        .gallery-heading {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          color: white;
          max-width: 1400px;
          margin: 0 auto 40px auto;
        }

        .image-row {
          display: grid;
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
          margin-bottom: 20px;
          justify-content: center;
        }

        .image-row-2-cols {
          grid-template-columns: repeat(2, minmax(250px, 1fr));
        }

        .image-row-3-cols {
          grid-template-columns: repeat(3, minmax(250px, 1fr));
        }

        .image-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .image-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        /* wrapper for next/image  */
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 340px;
        }

        @media (max-width: 768px) {
          .image-row-2-cols,
          .image-row-3-cols {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          .image-grid-container {
            padding: 30px;
            background-color: #293039;
          }
          .gallery-heading {
            margin: 0 auto 10px auto;
            font-size: 2.5rem;
          }
        }
      `}</style>
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
    </>
  );
}

// ------------------------ LAYOUT ------------------------
function DanceClassLayout({ layout }) {
  const [activeMenuItem, setActiveMenuItem] = useState("introduction");
  const contentRef = useRef(null);
  const menuRefs = useRef({});

  const menuItems = layout?.menuItems || [];
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
    <>
      <style jsx>{`
        .dance-layout-container {
          display: flex;
          min-height: 100vh;
          background-color: #293039;
          color: #fff;
          font-family: 'Arial', sans-serif;
        }

        .sidebar {
          width: 220px;
          padding: 40px 0 40px 40px;
          border-right: 1px solid white;
        }

        .sidebar-heading {
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          margin-bottom: 30px;
          color: #aaa;
        }

        .menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .menu-item {
          cursor: pointer;
          position: relative;
          padding: 20px 0;
          transition: background-color 0.3s ease;
        }

        .menu-item:last-child {
          margin-bottom: 0;
        }

        .menu-item-text {
          font-size: 1rem;
          font-weight: bold;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #fff;
          padding-left: 10px;
        }

        .menu-item.active .menu-item-text {
          color: #fff;
        }

        .menu-item.active {
          background-color: #222;
        }

        .menu-item-arrow {
          content: '→';
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          opacity: 0;
          pointer-events: none;
        }

        .menu-item.active .menu-item-arrow {
          opacity: 1;
        }

        .menu-item-divider {
          border-bottom: 1px solid white;
        }

        .content-area {
          flex-grow: 1;
          padding: 40px;
          max-width: 1000px;
          margin-left: 60px;
        }

        .content-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 30px;
          line-height: 1.1;
        }

        .content-text {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 40px;
          color: #ccc;
        }

        /* new wrapper for next/image */
        .content-image-wrapper {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 8px;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .dance-layout-container {
            flex-direction: column;
          }
          .sidebar {
            width: 90%;
            padding: 20px;
            border-right: none;
            border-bottom: 1px solid #333;
          }
          .sidebar-heading {
            text-align: center;
            margin-bottom: 30px;
          }
          .menu-list {
            display: block;
            padding: 0;
            margin: 0;
          }
          .menu-item {
            margin: 0;
            padding: 10px 20px;
            border-radius: 0;
            text-align: center;
          }
          .menu-item-arrow {
            display: none;
          }
          .menu-item-divider {
            display: none;
          }
          .content-area {
            margin-left: 0;
            padding: 20px;
          }
          .content-title {
            font-size: 2.5rem;
            text-align: center;
          }
          .content-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          .dance-layout-container {
            flex-direction: column;
          }
          .sidebar {
            width: 90%;
            padding: 20px;
            border-right: none;
            border-bottom: 1px solid #333;
          }
          .sidebar-heading {
            text-align: center;
            margin-bottom: 30px;
          }
          .menu-list {
            display: block;
            padding: 0;
            margin: 0;
          }
          .menu-item {
            margin: 0;
            padding: 10px 20px;
            border-radius: 0;
            text-align: center;
          }
          .menu-item-arrow {
            display: none;
          }
          .menu-item-divider {
            display: none;
          }
          .content-area {
            margin-left: 0;
            padding: 20px;
          }
          .content-title {
            font-size: 2.5rem;
            text-align: center;
          }
          .content-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .content-title {
            font-size: 2rem;
          }
          .sidebar {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border-right: none;
            border-bottom: 1px solid #333;
          }
          .menu-item {
            font-size: 0.9rem;
            padding: 15px 15px;
          }
        }

        @media (max-width: 360px) {
          .content-title {
            font-size: 2rem;
          }
          .sidebar {
            width: 88%;
            padding: 20px;
            border-right: none;
            border-bottom: 1px solid #333;
          }
          .menu-item {
            font-size: 0.9rem;
            padding: 15px 15px;
          }
        }
      `}</style>

      <div className="dance-layout-container">
        <div className="sidebar">
          <h4 className="sidebar-heading">DANCE STAGES</h4>
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <li
                  className={`menu-item ${
                    activeMenuItem === item.id ? "active" : ""
                  }`}
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
    </>
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
    <>
      <style jsx>{`
        .video-grid-container {
          padding: 40px 40px 60px 40px;
          background-color: #1a1a1a;
        }

        .video-gallery-heading {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          color: white;
          max-width: 1400px;
          text-align: center;
          margin: 0 auto 60px auto;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .video-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          border: 1px solid #3a3a3a;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
        }

        .video-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
        }

        .video-card:nth-child(odd) {
          margin-bottom: 80px;
        }

        .video-card:nth-child(even) {
          margin-top: 80px;
        }

        .video-card iframe {
          width: 100%;
          height: 180px;
          border: none;
        }

        .video-info {
          padding: 12px;
          text-align: center;
        }

        .video-info h4 {
          font-size: 1.1rem;
          color: white;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .video-grid {
            grid-template-columns: 1fr;
          }
          .video-gallery-heading {
            font-size: 2.5rem;
            margin: 0 auto 30px auto;
          }
          .video-card:nth-child(odd),
          .video-card:nth-child(even) {
            margin-bottom: 0;
            margin-top: 0;
          }
        }
      `}</style>

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
    </>
  );
}

// ------------------------ PAGE WRAPPER ------------------------
function OurStudioClassDetails() {
  const [classKey, setClassKey] = useState("kids");

  useEffect(() => {
    const readFromURL = () => {
      // Prefer clean query /our-class?name=...
      const params = new URLSearchParams(window.location.search);
      const name = params.get("name");

      if (name && classData[name]) {
        setClassKey(name);
      } else {
        // Fallback default
        setClassKey("kids");
      }
    };

    // Initial read
    readFromURL();

    // Back/forward support
    const onPop = () => readFromURL();
    window.addEventListener("popstate", onPop);

    return () => {
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  const data = classData[classKey] || classData.kids;

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