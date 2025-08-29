'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined' && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const transparentImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5ErkJggg=";

function FollowInsta({ ImageUrls = {}, VideoUrls = {}, LinkUrls = {} }) {
  const containerRef = useRef(null);
  const headerBarRef = useRef(null);
  const videosContainerRef = useRef(null);
  const videoItemRefs = useRef([]);

  // Build your list safely (fixing the image13/14 mismatch)
  const imageItemUrls = ImageUrls || {};
  const linkItemUrls = LinkUrls || {};
  const instagramVideos = [
    imageItemUrls.image9?.url && {
      id: 1,
      videoUrl:
        "https://www.instagram.com/reel/DM5mzg4Tnbv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnailUrl: imageItemUrls.image9.url,
      videoalt: "Play Video 1",
      alt: imageItemUrls.image9.altText || "Instagram Reel 1",
    },
    imageItemUrls.image9?.url && {
      id: 2,
      videoUrl:
        "https://www.instagram.com/reel/DM5mzg4Tnbv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnailUrl: imageItemUrls.image9.url,
      alt: imageItemUrls.image9.altText || "Instagram Reel 2",
      videoalt: "Play Video 2",
    },
    imageItemUrls.image10?.url && {
      id: 3,
      videoUrl:
        "https://www.instagram.com/reel/DM5mzg4Tnbv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnailUrl: imageItemUrls.image10.url,
      alt: imageItemUrls.image10.altText || "Instagram Reel 3",
      videoalt: "Play Video 3",
    },
    imageItemUrls.image11?.url && {
      id: 4,
      videoUrl:
        "https://www.instagram.com/reel/DM5mzg4Tnbv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnailUrl: imageItemUrls.image11.url,
      alt: imageItemUrls.image11.altText || "Instagram Reel 4",
      videoalt: "Play Video 4",
    },
    imageItemUrls.image12?.url && {
      id: 5,
      videoUrl:
        "https://www.instagram.com/reel/DM5mzg4Tnbv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnailUrl: imageItemUrls.image12.url,
      videoalt: "Play Video 5",
      alt: imageItemUrls.image12.altText || "Instagram Reel 5",
    },
    imageItemUrls.image13?.url && {
      id: 6,
      videoUrl:
        "https://www.instagram.com/reel/DM5mzg4Tnbv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      thumbnailUrl: imageItemUrls.image13.url,
      alt: imageItemUrls.image13.altText || "Instagram Reel 6", // fixed
      videoalt: "Play Video 6",
    },
  ].filter(Boolean);

  const handleVideoClick = (videoUrl) => {
    if (typeof window !== 'undefined') {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // GSAP intro anims (kept simple)
  useEffect(() => {
    const container = containerRef.current;
    const headerBar = headerBarRef.current;
    const videosContainer = videosContainerRef.current;
    const videoItems = videoItemRefs.current.filter(Boolean);

    if (headerBar) {
      gsap.fromTo(
        headerBar,
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (videosContainer) {
      gsap.fromTo(
        videosContainer,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (videoItems.length) {
      gsap.fromTo(
        videoItems,
        { opacity: 0, scale: 0.96, y: 14 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: videosContainer,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Drag to scroll (mouse + touch) on the row
  useEffect(() => {
    const track = videosContainerRef.current;
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    // Ensure overflow-x is enabled
    track.style.overflowX = 'auto';
    track.style.scrollBehavior = 'auto';

    const onDown = (x) => {
      isDown = true;
      startX = x;
      startScroll = track.scrollLeft;
      track.classList.add('dragging');
      track.style.cursor = 'grabbing';
    };
    const onMoveAbs = (x, e) => {
      if (!isDown) return;
      if (e && e.cancelable) e.preventDefault();
      const delta = startX - x;
      track.scrollLeft = startScroll + delta;
    };
    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('dragging');
      track.style.cursor = 'grab';
    };

    // mouse
    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      onDown(e.pageX);
    };
    const onMouseMove = (e) => onMoveAbs(e.pageX, e);
    const onMouseUp = () => onUp();
    const onMouseLeave = () => onUp();

    // touch
    const onTouchStart = (e) => onDown(e.touches[0].pageX);
    const onTouchMove = (e) => onMoveAbs(e.touches[0].pageX, e);
    const onTouchEnd = () => onUp();

    track.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: false });
    window.addEventListener('mouseup', onMouseUp);
    track.addEventListener('mouseleave', onMouseLeave);

    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: false });
    track.addEventListener('touchend', onTouchEnd);

    return () => {
      track.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      track.removeEventListener('mouseleave', onMouseLeave);

      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const profileUrl = linkItemUrls?.link1?.url || 'https://www.instagram.com/';
  const profileAlt = linkItemUrls?.link1?.altText || 'Instagram profile';

  return (
    <>
      <style jsx>{`
        .insta-container {
          background-color: #0b0e14;
          color: #fff;
          display: grid;
          grid-template-rows: auto 1fr;
        
        }

        .header-bar {
          background-color: rgba(12, 15, 22, 0.95);
          width: 100%;
          padding: 16px 12px;
          text-align: center;
          position: sticky;
          top: 0;
          z-index: 2;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
        }

        .header-text {
          color: white;
          font-size: 18px;
          margin: 0;
          font-family: system-ui, Arial, sans-serif;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        .header-text a {
          color: #fff;
          text-decoration: none;
          border-bottom: 1px dashed rgba(255,255,255,0.7);
        }

        /* Horizontal ROW — no wrap at any size */
        .videos-container {
          display: flex;
          flex-wrap: nowrap;           /* force single row */
          gap: 16px;
          padding: 20px 16px 28px;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #596070 transparent;
          touch-action: pan-x;         /* allow horizontal gestures */
          cursor: grab;
        }
        .videos-container.dragging {
          cursor: grabbing;
        }
        .videos-container::-webkit-scrollbar { height: 10px; }
        .videos-container::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #586070, #394052);
          border-radius: 10px;
        }

        .video-item-group {
          flex: 0 0 auto;              /* prevent shrinking and wrap */
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .video-thumbnail {
          width: clamp(180px, 32vw, 260px);
          height: clamp(180px, 32vw, 260px);
          background-color: #1a2230;
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 24px rgba(0,0,0,0.35);
        }
        .video-thumbnail:hover {
          box-shadow: 0 12px 28px rgba(0,0,0,0.45);
          transform: translateY(-2px);
        }

        .horizontal-track {
          display: flex;
          align-items: center;
          width: 100%;
          margin-top: 236px;
          gap: 8px;
              position: absolute;
        }
        .track-line {
          flex-grow: 1;
          height: 6px;
          background-color: #0f141d;
          border-radius: 6px;
        }
        .track-circle {
          width: 42px;
          height: 42px;
          border: 6px solid #0f141d;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        .play-button-container {
          width: 34px;
          height: 34px;
          background-color: #000;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .play-button-container:hover {
          transform: scale(1.06);
          background: #000;
        }
        .play-icon {
          width: 0;
          height: 0;
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;
          border-left: 14px solid white;
          margin-left: 3px;
        }

        .transparent-alt-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
        }

        /* IMPORTANT: keep horizontal layout on all breakpoints (no column switch) */
        @media (max-width: 520px) {
          .videos-container { gap: 14px; padding: 16px; }
          .video-thumbnail { width: 70vw; height: 70vw; }
          .horizontal-track { max-width: 70vw; }
        }
      `}</style>

      <div className="insta-container" ref={containerRef}>
        <div className="header-bar" ref={headerBarRef}>
          <p className="header-text">
            FOLLOW US ON INSTAGRAM:&nbsp;
            <a
              href={profileUrl}
              aria-label={profileAlt}
              target="_blank"
              rel="noopener noreferrer"
            >
              @_ABCD_STUDIO
            </a>
          </p>
        </div>

        <div className="videos-container" ref={videosContainerRef}>
          {instagramVideos.map((video, index) => (
            <div
              key={video.id}
              className="video-item-group"
              ref={(el) => (videoItemRefs.current[index] = el)}
            >
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={video.alt}
              >
                <div
                  className="video-thumbnail"
                  style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
                >
                  <img
                    src={transparentImage}
                    alt={video.alt}
                    className="transparent-alt-image"
                  />
                </div>
              </a>

              <div className="horizontal-track">
                <div className="track-line" />
                <div className="track-circle">
                  <div
                    className="play-button-container"
                    onClick={() => handleVideoClick(video.videoUrl)}
                    aria-label={video.videoalt}
                    title={video.videoalt}
                  >
                    <img
                      src={transparentImage}
                      alt={video.videoalt}
                      className="transparent-alt-image"
                    />
                    <div className="play-icon" />
                  </div>
                </div>
                <div className="track-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FollowInsta;