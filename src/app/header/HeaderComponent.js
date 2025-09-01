'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Define menu items as a JSON array
const menuItems = [
  {
    title: 'HOME',
    link: '/', // Changed to a unique ID for demonstration
    type: 'link',
  },
  {
    title: 'OUR STUDIO',
    link: '/our-studio',
    type: 'link',
  },
  {
    title: 'CLASSES',
    type: 'dropdown',
    submenu: [
      { name: 'Kids', link: '/our-class?name=kids' },
      { name: 'Adult', link: '/our-class?name=adult' },
      { name: 'Fitness', link: '/our-class?name=fitness' },
      { name: 'Online', link: '/our-class?name=online' },
      { name: 'Private', link: '/our-class?name=private' },
    ],
  },
 {
    title: 'EVENTS',
    type: 'dropdown',
    submenu: [
      { name: 'Wedding', link: '/events/wedding' },
      { name: 'Birthday', link: '/events/birthday' },
      { name: 'Surprise', link: '/events/surprise' },
      { name: 'Private Party', link: '/events/private-party' },
      { name: 'Collage Event', link: '/events/collage-event' },
    ],
  },
  {
    title: 'CONTACT',
    link: '/contact',
    type: 'link',
  },
];

// Helper function to determine the active link based on the current URL
const getActiveLinkFromPath = (pathname, searchParams) => {
  const search = searchParams.toString();
  const fullCurrentUrl = search ? `${pathname}?${search}` : pathname;

  for (const item of menuItems) {
    if (item.type === 'link') {
      if (item.link === fullCurrentUrl) {
        return { main: item.title, sub: null };
      }
    } else if (item.type === 'dropdown') {
      for (const subItem of item.submenu) {
        if (subItem.link === fullCurrentUrl) {
          return { main: item.title, sub: subItem.name };
        }
      }
    }
  }

  // Special handling for the home page
  if (pathname === '/' && !search) {
    return { main: 'HOME', sub: null };
  }

  return { main: null, sub: null }; // No active link found
};

function HeaderComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState({ main: null, sub: null }); // retained state (unused)
  const socialLayerRef = useRef(null);
  const headerRef = useRef(null); // Ref for the header element
  const [headerHeight, setHeaderHeight] = useState(0); // State to store header height
  const [activeLink, setActiveLink] = useState({ main: null, sub: null });

  // Loading overlay state
  const [isPageLoading, setIsPageLoading] = useState(false);
  const navigationStartRef = useRef(null);
  const MIN_LOADING_MS = 400; // set to 3000-4000 for 3-4 seconds hard delay

  useEffect(() => {
    const handleScroll = () => {
      if (socialLayerRef.current) {
        const bottom = socialLayerRef.current.getBoundingClientRect().bottom;
        setIsSticky(bottom <= 0);
      }
    };
    const updateHeaderHeight = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update active link whenever Next.js pathname or search params change
  useEffect(() => {
    const nextActive = getActiveLinkFromPath(pathname || '/', searchParams || new URLSearchParams());
    setActiveLink(nextActive);

    // When the route updates, end the loading overlay after minimum time
    if (navigationStartRef.current) {
      const elapsed = Date.now() - navigationStartRef.current;
      const delay = Math.max(0, MIN_LOADING_MS - elapsed);
      const t = setTimeout(() => {
        setIsPageLoading(false);
        navigationStartRef.current = null;
      }, delay);
      return () => clearTimeout(t);
    }
  }, [pathname, searchParams]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  // Called by links just before navigation occurs
  const startLoadingOverlay = () => {
    navigationStartRef.current = Date.now();
    setIsPageLoading(true);
  };

  const handleMenuItemClick = (e) => {
    // Start loading overlay right away
    startLoadingOverlay();
    setIsMobileMenuOpen(false);
    // Do not prevent default; let the browser/Next handle navigation
  };

  return (
    <>
      <style jsx global>{`
        /* Wrap everything under .header-root to isolate from global CSS */
        .header-root .social-layer-container {
          background-color: #293039;
          color: #fff;
          padding: 1rem 12rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1001;
        }
        @media (max-width: 768px) {
          .header-root .social-layer-container {
            display: none;
          }
        }
        .header-root .social-layer-text {
          font-size: 1rem;
          font-family: 'Arial Black', sans-serif;
          font-weight: lighter;
          letter-spacing: 0.1em;
        }
        .header-root .social-icons-wrapper {
          display: flex;
          gap: 1rem;
        }
        .header-root .social-icon-link {
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease, transform 0.3s ease;
          text-decoration: none !important;
          color: #000 !important;
        }
        .header-root .social-icon-link:hover {
          background-color: #e0e0e0;
          transform: scale(1.05);
        }

        .header-root .header-container {
          background: #fff;
          color: #000;
          padding: 1.5rem 12rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease-in-out; /* Smooth transition for all properties */
          position: relative;
          z-index: 1000;
        }
        .header-root .header-container.sticky {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 1.5rem 12rem;
          box-sizing: border-box;
          transition: all 0.3s ease-in-out; /* Ensure smooth transition for sticky state */
        }

        .header-root .header-logo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .header-root .header-logo-main {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;
        }
        .header-root .header-logo-star {
          font-size: 1.2rem;
          margin: 0 0.1em;
          color: #000;
        }
        .header-root .header-logo-sub {
          font-family: sans-serif;
          font-size: 0.7rem;
          font-weight: bold;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #555;
        }

        /* Desktop nav */
        .header-root .header-nav {
          display: flex;
          gap: 2rem;
        }
        .header-root .header-nav-item {
          font-family: sans-serif;
          font-size: 0.9rem;
          font-weight: 900;
          text-transform: uppercase;
          color: #000 !important;
          text-decoration: none !important;
          position: relative;
          padding-bottom: 0.3rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .header-root .header-nav-item:hover {
          color: #555 !important;
        }
        .header-root .header-nav-item::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #000;
          transform: scaleX(0);
          transform-origin: bottom left;
          transition: transform 0.3s ease-out;
        }
        .header-root .header-nav-item:hover::after {
          transform: scaleX(0.5); /* Hover effect */
        }
        .header-root .header-nav-item.active::after {
          transform: scaleX(0.7); /* Reduced width for active underline */
          background: #000; /* Ensure color for active underline */
        }
        .header-root .header-nav-item.active {
          color: #555 !important; /* Active link color */
        }
        .header-root .header-nav-item-dropdown {
          display: flex;
          align-items: center;
          position: relative;
        }
        .header-root .header-nav-item-dropdown .dropdown-arrow {
          margin-left: 0.3rem;
          font-size: 0.6rem;
          transform: translateY(1px);
        }
        .header-root .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          list-style: none;
          padding: 0.5rem 0;
          margin: 0;
          display: none;
          flex-direction: column;
          z-index: 1001;
        }
        .header-root .header-nav-item-dropdown:hover .dropdown-menu {
          display: flex;
        }
        .header-root .dropdown-menu li a {
          padding: 0.75rem 1.5rem;
          font-family: sans-serif;
          font-size: 1rem;
          font-weight: 900;
          color: #000 !important;
          text-decoration: none !important;
          display: block;
          transition: background-color 0.2s ease, color 0.2s ease;
          text-transform: none;
        }
        .header-root .dropdown-menu li a:hover,
        .header-root .dropdown-menu li a.active {
          background: #000;
          color: #fff !important;
        }

        /* Mobile nav */
        .header-root .hamburger-menu {
          display: none;
          flex-direction: column;
          cursor: pointer;
          padding: 0.5rem;
        }
        .header-root .hamburger-menu span {
          height: 3px;
          width: 25px;
          background: #000;
          margin-bottom: 4px;
          border-radius: 2px;
          transition: all 0.3s ease-in-out;
        }
        .header-root .hamburger-menu span:last-child {
          margin-bottom: 0;
        }

        .header-root .mobile-nav-overlay {
          display: none;
          position: fixed;
          top: 0,
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 999;
          transition: opacity 0.3s ease-in-out;
          opacity: 0;
          pointer-events: none;
        }
        .header-root .mobile-nav-overlay.open {
          opacity: 1;
          pointer-events: auto;
          display: block;
        }

        .header-root .mobile-nav {
          display: none;
          position: fixed;
          top: 0;
          right: -300px;
          width: 300px;
          height: 100%;
          background: #fff;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
          flex-direction: column;
          padding-top: 4rem;
          transition: right 0.3s ease-in-out;
          z-index: 1000;
        }
        .header-root .mobile-nav.open {
          display: flex;
          right: 0;
        }
        .header-root .close-button {
          position: fixed;
          top: 1.5rem;
          right: 2rem;
          font-size: 2rem;
          color: #000;
          cursor: pointer;
          z-index: 1002;
        }

        .header-root .mobile-nav-item {
          padding: 1rem 2rem;
          font-family: sans-serif;
          font-size: 1rem;
          font-weight: 900;
          text-transform: uppercase;
          color: #000 !important;
          text-decoration: none !important;
          border-bottom: 1px solid #eee;
          transition: background-color 0.2s ease;
        }
        .header-root .mobile-nav-item:hover,
        .header-root .mobile-nav-item.active {
          background: #f5f5f5;
        }

        .header-root .mobile-dropdown {
          display: block;
        }
        .header-root .mobile-dropdown-toggle {
          padding: 1rem 2rem;
          font-family: sans-serif;
          font-size: 1rem;
          font-weight: 900;
          text-transform: uppercase;
          color: #000 !important;
          background: transparent;
          border: 0;
          width: 100%;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }
        .header-root .mobile-dropdown-menu {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
          background: #fff;
        }
        .header-root .mobile-dropdown-menu.open {
          max-height: 500px;
        }
        .header-root .mobile-dropdown-menu li a {
          display: block;
          padding: 0.75rem 2rem;
          font-family: sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #333 !important;
          text-decoration: none !important;
          border-bottom: 1px solid #eee;
        }
        .header-root .mobile-dropdown-menu li a:hover,
        .header-root .mobile-dropdown-menu li a.active {
          background: #000;
          color: #fff !important;
        }

        @media (max-width: 1200px) {
          .header-root .social-layer-container,
          .header-root .header-container {
            padding-left: 5rem;
            padding-right: 5rem;
          }
          .header-root .header-container.sticky {
            padding: 1.5rem 5rem;
          }
        }
        @media (max-width: 992px) {
          .header-root .header-nav {
            display: none;
          }
          .header-root .hamburger-menu {
            display: flex;
          }
        }
        @media (max-width: 768px) {
          .header-root .header-container {
            padding: 1rem 2rem;
          }
          .header-root .header-container.sticky {
            padding: 1rem 2rem;
          }
          .header-root .header-logo-main {
            font-size: 1.2rem;
          }
          .header-root .header-logo-sub {
            font-size: 0.6rem;
          }
          .header-root .mobile-nav {
            width: 250px;
          }
          .header-root .close-button {
            top: 1rem;
            right: 1.5rem;
          }
        }

        /* Page loading overlay */
        .page-loading-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 1);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          transition: opacity 0.2s ease;
        }
        .spinner {
          width: 56px;
          height: 56px;
          border: 4px solid #000;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

     <div className="header-root">
        {/* Social Layer */}
        <div className="social-layer-container" ref={socialLayerRef}>
          <div className="social-layer-text">JOIN OUR COMMUNITY OF OVER 200,000+ DREAMERS & DOERS</div>
          <div className="social-icons-wrapper">
            <a href="#" className="social-icon-link"><i className="fa fa-facebook" /></a>
            <a href="#" className="social-icon-link"><i className="fa fa-youtube" /></a>
            <a href="#" className="social-icon-link"><i className="fa fa-instagram" /></a>
            <a href="#" className="social-icon-link"><i className="fa fa-twitter" /></a>
          </div>
        </div>

        {/* Placeholder for sticky header */}
        {isSticky && <div style={{ height: `${headerHeight}px` }} />}

        {/* Header */}
        <header ref={headerRef} className={`header-container ${isSticky ? 'sticky' : ''}`}>
          <div className="header-logo">
            <div className="header-logo-main">
              <span className="header-logo-star">&#9733;</span>ABCD<span className="header-logo-star">&#9733;</span>
            </div>
            <div className="header-logo-sub">STUDIOS SALEM</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {menuItems.map((item, idx) =>
              item.type === 'link' ? (
                <a
                  key={idx}
                  href={item.link}
                  className={`header-nav-item ${activeLink.main === item.title ? 'active' : ''}`}
                  onClick={handleMenuItemClick}
                >
                  {item.title}
                </a>
              ) : (
                <div
                  key={idx}
                  className={`header-nav-item header-nav-item-dropdown ${activeLink.main === item.title ? 'active' : ''}`}
                >
                  {item.title} <span className="dropdown-arrow">&#9660;</span>
                  <ul className="dropdown-menu">
                    {item.submenu.map((sub, sIdx) => (
                      <li key={sIdx}>
                        <a
                          href={sub.link}
                          className={`${activeLink.sub === sub.name ? 'active' : ''}`}
                          onClick={handleMenuItemClick}
                        >
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </nav>

          {/* Hamburger Menu */}
          {!isMobileMenuOpen && (
            <div className="hamburger-menu" onClick={toggleMobileMenu}>
              <span></span><span></span><span></span>
            </div>
          )}
        </header>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} />

        {/* Mobile Navigation */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          onItemClick={handleMenuItemClick}
          activeLink={activeLink}
        />

        {/* Page Loading Overlay */}
        {isPageLoading && (
          <div className="page-loading-overlay">
            <div className="spinner" />
          </div>
        )}
      </div>
    </>
  );
}

function MobileNav({ isOpen, onClose, onItemClick, activeLink }) {
  const [openGroups, setOpenGroups] = useState({});

  // Initialize openGroups based on the active main link
  useEffect(() => {
    if (activeLink.main && menuItems.find(item => item.title === activeLink.main && item.type === 'dropdown')) {
      setOpenGroups((g) => ({ ...g, [activeLink.main]: true }));
    }
  }, [activeLink.main]);

  const toggleGroup = (title) =>
    setOpenGroups((g) => ({ ...g, [title]: !g[title] }));

  return (
    <nav className={`mobile-nav ${isOpen ? 'open' : ''}`}>
      <div className="close-button" onClick={onClose}>&times;</div>
      {menuItems.map((item, idx) =>
        item.type === 'link' ? (
          <a
            key={idx}
            href={item.link}
            className={`mobile-nav-item ${activeLink.main === item.title ? 'active' : ''}`}
            onClick={onItemClick}
          >
            {item.title}
          </a>
        ) : (
          <div className="mobile-dropdown" key={idx}>
            <button
              className={`mobile-dropdown-toggle ${activeLink.main === item.title ? 'active' : ''}`}
              onClick={() => toggleGroup(item.title)}
            >
              {item.title}
              <span className="dropdown-arrow">{openGroups[item.title] ? '▲' : '▼'}</span>
            </button>
            <ul className={`mobile-dropdown-menu ${openGroups[item.title] ? 'open' : ''}`}>
              {item.submenu.map((sub, sIdx) => (
                <li key={sIdx}>
                  <a
                    href={sub.link}
                    className={`${activeLink.sub === sub.name ? 'active' : ''}`}
                    onClick={onItemClick}
                  >
                    {sub.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </nav>
  );
}

export default HeaderComponent;