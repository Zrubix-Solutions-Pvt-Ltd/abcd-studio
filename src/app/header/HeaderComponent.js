'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './HeaderComponent.module.css';

// Define menu items as a JSON array
const menuItems = [
  { title: 'HOME', link: '/', type: 'link' },
  { title: 'OUR STUDIO', link: '/our-studio', type: 'link' },
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
      { name: 'Wedding', link: '/our-events?name=wedding' },
      { name: 'Birthday', link: '/our-events?name=birthday' },
      { name: 'Surprise', link: '/our-events?name=surprise' },
      { name: 'Private Party', link: '/our-events?name=privateParty' },
      { name: 'Collage Event', link: '/our-events?name=collegeEvents' },
    ],
  },
  { title: 'CONTACT', link: '/contact', type: 'link' },
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

  if (pathname === '/' && !search) {
    return { main: 'HOME', sub: null };
  }
  return { main: null, sub: null };
};

function HeaderComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState({ main: null, sub: null }); // retained state (unused)
  const socialLayerRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activeLink, setActiveLink] = useState({ main: null, sub: null });

  // Loading overlay state
  const [isPageLoading, setIsPageLoading] = useState(false);
  const navigationStartRef = useRef(null);
  const MIN_LOADING_MS = 400;

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

  useEffect(() => {
    const nextActive = getActiveLinkFromPath(pathname || '/', searchParams || new URLSearchParams());
    setActiveLink(nextActive);

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

  const startLoadingOverlay = () => {
    navigationStartRef.current = Date.now();
    setIsPageLoading(true);
  };

  const handleMenuItemClick = () => {
    startLoadingOverlay();
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles['header-root']}>
      {/* Social Layer */}
      <div className={styles['social-layer-container']} ref={socialLayerRef}>
        <div className={styles['social-layer-text']}>
          JOIN OUR COMMUNITY OF OVER 200,000+ DREAMERS & DOERS
        </div>
        <div className={styles['social-icons-wrapper']}>
          <a href="#" className={styles['social-icon-link']}><i className="fa fa-facebook" /></a>
          <a href="#" className={styles['social-icon-link']}><i className="fa fa-youtube" /></a>
          <a href="#" className={styles['social-icon-link']}><i className="fa fa-instagram" /></a>
          <a href="#" className={styles['social-icon-link']}><i className="fa fa-twitter" /></a>
        </div>
      </div>

      {/* Placeholder for sticky header */}
      {isSticky && <div style={{ height: `${headerHeight}px` }} />}

      {/* Header */}
      <header
        ref={headerRef}
        className={`${styles['header-container']} ${isSticky ? styles['sticky'] : ''}`}
      >
        <div className={styles['header-logo']}>
          <div className={styles['header-logo-main']}>
            <span className={styles['header-logo-star']}>&#9733;</span>
            ABCD
            <span className={styles['header-logo-star']}>&#9733;</span>
          </div>
          <div className={styles['header-logo-sub']}>STUDIOS SALEM</div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles['header-nav']}>
          {menuItems.map((item, idx) =>
            item.type === 'link' ? (
              <a
                key={idx}
                href={item.link}
                className={`${styles['header-nav-item']} ${activeLink.main === item.title ? styles['active'] : ''}`}
                onClick={handleMenuItemClick}
              >
                {item.title}
              </a>
            ) : (
              <div
                key={idx}
                className={`${styles['header-nav-item']} ${styles['header-nav-item-dropdown']} ${activeLink.main === item.title ? styles['active'] : ''}`}
              >
                {item.title} <span className={styles['dropdown-arrow']}>&#9660;</span>
                <ul className={styles['dropdown-menu']}>
                  {item.submenu.map((sub, sIdx) => (
                    <li key={sIdx}>
                      <a
                        href={sub.link}
                        className={`${activeLink.sub === sub.name ? styles['active'] : ''}`}
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
          <div className={styles['hamburger-menu']} onClick={toggleMobileMenu}>
            <span></span><span></span><span></span>
          </div>
        )}
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`${styles['mobile-nav-overlay']} ${isMobileMenuOpen ? styles['open'] : ''}`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        onItemClick={handleMenuItemClick}
        activeLink={activeLink}
      />

      {/* Page Loading Overlay */}
      {isPageLoading && (
        <div className={styles['page-loading-overlay']}>
          <div className={styles['spinner']} />
        </div>
      )}
    </div>
  );
}

function MobileNav({ isOpen, onClose, onItemClick, activeLink }) {
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    if (activeLink.main && menuItems.find(item => item.title === activeLink.main && item.type === 'dropdown')) {
      setOpenGroups((g) => ({ ...g, [activeLink.main]: true }));
    }
  }, [activeLink.main]);

  const toggleGroup = (title) =>
    setOpenGroups((g) => ({ ...g, [title]: !g[title] }));

  return (
    <nav className={`${styles['mobile-nav']} ${isOpen ? styles['open'] : ''}`}>
      <div className={styles['close-button']} onClick={onClose}>&times;</div>
      {menuItems.map((item, idx) =>
        item.type === 'link' ? (
          <a
            key={idx}
            href={item.link}
            className={`${styles['mobile-nav-item']} ${activeLink.main === item.title ? styles['active'] : ''}`}
            onClick={onItemClick}
          >
            {item.title}
          </a>
        ) : (
          <div className={styles['mobile-dropdown']} key={idx}>
            <button
              className={`${styles['mobile-dropdown-toggle']} ${activeLink.main === item.title ? styles['active'] : ''}`}
              onClick={() => toggleGroup(item.title)}
            >
              {item.title}
              <span className={styles['dropdown-arrow']}>
                {openGroups[item.title] ? '▲' : '▼'}
              </span>
            </button>
            <ul className={`${styles['mobile-dropdown-menu']} ${openGroups[item.title] ? styles['open'] : ''}`}>
              {item.submenu.map((sub, sIdx) => (
                <li key={sIdx}>
                  <a
                    href={sub.link}
                    className={`${activeLink.sub === sub.name ? styles['active'] : ''}`}
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