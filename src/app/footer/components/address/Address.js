'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Address.module.css';

const transparentImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5ErkJggg=';

function Address({ ImageUrls = {}, VideoUrls = {} }) {
  const imageItemUrls = ImageUrls || {};
  const videoItemUrls = VideoUrls || {};

  const logoSrc = imageItemUrls?.image15?.url || transparentImage;
  const logoAlt = imageItemUrls?.image15?.altText || 'Logo';

  return (
    <div className={styles.addressFooterContainer}>
      <div className={styles.addressLeftSection}>
        <div className={styles.addressLogoSection}>
          <p className={styles.addressLogoText}>
            <span style={{ color: 'white' }}>★</span>ABCD
            <span style={{ color: 'white' }}>★</span>
          </p>
          <p className={styles.addressLogoSubtext}>STUDIOS SALEM</p>
        </div>

        <div className={styles.addressContactDetails}>
          <p className={styles.addressContactItem}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
            </svg>
            UNIT 31/3 DALTON STREET
          </p>
          <p className={styles.addressContactItem}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            HELLO@DSA.COM.AU
          </p>
          <p className={styles.addressContactItem}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.12-.74-.03-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.27-.27.36-.66.24-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
            </svg>
            1300 363 207
          </p>
        </div>

        <div className={styles.addressRtoInfo}>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={120}
            height={40}
            priority={false}
            loading="lazy"
            style={{ height: 'auto', width: 'auto', maxWidth: '100%' }}
          />
          <div className={styles.addressRtoText}>
            <p className={styles.addressParagraphStyle}>RTO 40479</p>
            <p className={styles.addressParagraphStyle}>CRICOS 04174A</p>
          </div>
        </div>
      </div>

      <div className={styles.verticalSeparator}></div>

      <div className={styles.addressNewsletterForm}>
        <div className={styles.addressNewsletterHeader}>
          <h3>Let&apos;s get to know each other.</h3>
          <p className={styles.addressParagraphStyle}>STAY IN THE LOOP</p>
        </div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Email" />
        <button>Join Newsletter</button>
      </div>
    </div>
  );
}

export default Address;