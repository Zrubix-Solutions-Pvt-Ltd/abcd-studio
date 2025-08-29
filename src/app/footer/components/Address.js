'use client';

import React from 'react';
import Image from 'next/image';

const transparentImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5ErkJggg=';

function Address({ ImageUrls = {}, VideoUrls = {} }) {
  const imageItemUrls = ImageUrls || {};
  const videoItemUrls = VideoUrls || {};

  // Resolve logo image with fallback
  const logoSrc = imageItemUrls?.image15?.url || transparentImage;
  const logoAlt = imageItemUrls?.image15?.altText || 'Logo';

  return (
    <>
      <style jsx>{`
        .address-footer-container {
          background-color: #293039;
          color: white;
          padding: 0 10px 0 10px;
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 40px;
          font-family: 'Arial', sans-serif;
          position: relative;
        }

        .address-left-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-bottom: 50px;
          padding-top: 50px;
        }

        .address-right-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          flex: 1;
          min-width: 200px;
        }

        .address-newsletter-form {
          flex: 1;
          min-width: 300px;
          max-width: 500px;
          padding-bottom: 50px;
          padding-top: 50px;
        }

        .address-logo-section {
          margin-bottom: 5px;
        }

        .address-logo-text {
          font-size: 48px;
          font-weight: 900;
          letter-spacing: 2px;
          margin-bottom: 5px;
          font-family: 'Georgia', serif;
        }

        .address-logo-subtext {
          font-size: 18px;
          letter-spacing: 1px;
          font-weight: 600;
          color: #ccc;
          margin-bottom: 20px;
          text-align: center;
        }

        .address-contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          font-size: 16px;
          letter-spacing: 3px;
          font-weight: 600;
        }

        .address-contact-item svg {
          margin-right: 10px;
          font-size: 20px;
        }

        .address-rto-info {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #ccc;
          margin-top: 20px;
        }

        .address-rto-text {
          display: flex;
          flex-direction: column;
          font-size: 15px;
          font-weight: bold;
          margin-top: 0;
        }

        .address-newsletter-header h3 {
          font-family: 'Georgia', serif;
          font-size: 36px;
          font-weight: normal;
          margin-bottom: 15px;
          position: relative;
          display: inline-block;
        }

        .address-newsletter-header h3::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -5px;
          height: 2px;
          background-color: white;
          border-radius: 2px;
        }

        .address-newsletter-header p {
          font-size: 18px;
          margin-top: 30px;
          margin-bottom: 30px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .address-newsletter-form label {
          display: block;
          margin-bottom: 10px;
          font-size: 16px;
          color: white;
          font-weight: 600;
        }

        .address-newsletter-form input[type='text'],
        .address-newsletter-form input[type='email'] {
          width: 100%;
          padding: 15px;
          margin-bottom: 25px;
          background-color: #333;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 16px;
          padding-left: 15px;
          padding-right: 15px;
        }

        .address-newsletter-form input::placeholder {
          color: #aaa;
        }

        .address-newsletter-form button {
          width: 100%;
          padding: 15px;
          background-color: white;
          color: black;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
          padding-left: 15px;
          padding-right: 15px;
        }

        .address-newsletter-form button:hover {
          background-color: #eee;
        }

        .vertical-separator {
          width: 1px;
          background-color: white;
          height: 80%;
          position: absolute;
          left: 45%;
          transform: translateX(-50%);
          top: 10%;
        }

        .address-paragraph-style {
          margin-bottom: 5px;
          margin-top: 5px;
          line-height: 1.5;
          color: #ccc;
          font-size: large;
        }

        @media (max-width: 1000px) {
          .address-footer-container {
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            text-align: center;
            gap: 30px;
          }
          .address-left-section,
          .address-right-section,
          .address-newsletter-form {
            min-width: unset;
            width: 100%;
            max-width: 400px;
            align-items: center;
            text-align: center;
          }
          .address-contact-item {
            justify-content: center;
          }
          .vertical-separator {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .address-footer-container {
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            text-align: center;
            gap: 30px;
          }
          .address-left-section,
          .address-right-section,
          .address-newsletter-form {
            min-width: unset;
            width: 100%;
            max-width: 400px;
            align-items: center;
            text-align: center;
          }
          .address-contact-item {
            justify-content: center;
          }
          .vertical-separator {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .address-footer-container {
            padding: 30px 15px;
            gap: 25px;
          }
          .address-logo-text {
            font-size: 40px;
          }
          .address-logo-subtext {
            font-size: 16px;
          }
          .address-contact-item {
            font-size: 15px;
            letter-spacing: 2px;
            margin-bottom: 20px;
          }
          .address-newsletter-header h3 {
            font-size: 28px;
          }
          .address-newsletter-header p {
            font-size: 16px;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .address-newsletter-form input[type='text'],
          .address-newsletter-form input[type='email'],
          .address-newsletter-form button {
            padding: 12px;
            font-size: 16px;
          }
          .address-rto-info {
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
          }
        }

        @media (max-width: 600px) {
          .address-footer-container {
            padding: 25px 10px;
            gap: 20px;
          }
          .address-logo-text {
            font-size: 36px;
          }
          .address-logo-subtext {
            font-size: 14px;
          }
          .address-contact-item {
            font-size: 14px;
            letter-spacing: 1.5px;
            margin-bottom: 15px;
          }
          .address-newsletter-header h3 {
            font-size: 24px;
          }
          .address-newsletter-header p {
            font-size: 14px;
            margin-top: 15px;
            margin-bottom: 15px;
          }
          .address-newsletter-form input[type='text'],
          .address-newsletter-form input[type='email'],
          .address-newsletter-form button {
            padding: 10px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .address-footer-container {
            padding: 20px 5px;
            gap: 15px;
          }
          .address-logo-text {
            font-size: 32px;
          }
          .address-logo-subtext {
            font-size: 12px;
          }
          .address-contact-item {
            font-size: 13px;
            letter-spacing: 1px;
            margin-bottom: 10px;
          }
          .address-newsletter-header h3 {
            font-size: 20px;
          }
          .address-newsletter-header p {
            font-size: 12px;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .address-newsletter-form input[type='text'],
          .address-newsletter-form input[type='email'],
          .address-newsletter-form button {
            padding: 15px;
            font-size: 12px;
            width: 75%;
          }
          .address-rto-text p {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="address-footer-container">
        <div className="address-left-section">
          <div className="address-logo-section">
            <p className="address-logo-text">
              <span style={{ color: 'white' }}>★</span>ABCD
              <span style={{ color: 'white' }}>★</span>
            </p>
            <p className="address-logo-subtext">STUDIOS SALEM</p>
          </div>

          <div className="address-contact-details">
            <p className="address-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
              UNIT 31/3 DALTON STREET
            </p>
            <p className="address-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              HELLO@DSA.COM.AU
            </p>
            <p className="address-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.12-.74-.03-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.27-.27.36-.66.24-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
              </svg>
              1300 363 207
            </p>
          </div>

          <div className="address-rto-info">
            {/* next/image for logo */}
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={120}         // adjust to your design
              height={40}         // keep aspect ratio close to your logo
              priority={false}
              loading="lazy"
              style={{ height: 'auto', width: 'auto', maxWidth: '100%' }}
            />
            <div className="address-rto-text">
              <p className="address-paragraph-style">RTO 40479</p>
              <p className="address-paragraph-style">CRICOS 04174A</p>
            </div>
          </div>
        </div>

        <div className="vertical-separator"></div>

        <div className="address-newsletter-form">
          <div className="address-newsletter-header">
           <h3>Let&apos;s get to know each other.</h3>
            <p className="address-paragraph-style">STAY IN THE LOOP</p>
          </div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />
          <button>Join Newsletter</button>
        </div>
      </div>
    </>
  );
}

export default Address;