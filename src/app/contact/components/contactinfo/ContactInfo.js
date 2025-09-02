
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ContactInfo() {
  const contactData = {
    "title": "MORE WAYS TO REACH US",
    "contact_details": [
      {
        "type": "email",
        "value": "HELLO@DSA.COM.AU"
      },
      {
        "type": "phone",
        "value": "1300 363 207"
      },
      {
        "type": "address",
        "value": "UNIT 31/3 DALTON STREET"
      }
    ],
    "map_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.2957140719263!2d78.13483327452836!3d11.673442442009199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf0430ecd5e17%3A0xc42d204ef748d21c!2sABCD%20Dance%20Studio!5e0!3m2!1sen!2sin!4v1754740004641!5m2!1sen!2sin" // Example URL, replace with your actual map embed URL
  };

  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const mapRef = useRef(null);

  useEffect(() => {
    // GSAP animation for the title
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    // GSAP animation for contact cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    // GSAP animation for the map
    gsap.fromTo(mapRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  }, []);

  return (
    <>
      <style>
        {`
          .contact-info-wrapper {
            padding: 30px 20px;
            text-align: center;
          }

          .contact-info-title {
            font-family: 'Impact', 'Arial Black', sans-serif;
            font-size: 2.5em;
            color: black;
            margin-top: 0;
            margin-bottom: 40px;
            text-transform: uppercase;
          }

          .contact-cards-container {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap; /* Allow cards to wrap on smaller screens */
            margin-bottom: 40px; /* Add margin below cards before the map */
          }

          .contact-card {
            background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent white */
            color: black; /* Text color */
            padding: 30px;
            border-radius: 8px;
            width: 300px; /* Fixed width for each card */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 180px; /* Ensure consistent height */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px); /* Glass effect */
            border: 1px solid rgba(255, 255, 255, 0.3); /* Light border */
          }

          .contact-card svg {
            width: 50px;
            height: 50px;
            fill: black; /* Icon color */
            margin-bottom: 15px;
          }

          .contact-card p {
            font-size: 1.1em;
            margin: 5px 0;
            font-weight: bold;
          }

          .map-container {
            width: 100%;
            max-width: 1150px; /* Max width for the map */
            margin: 0 auto; /* Center the map */
            height: 450px; /* Fixed height for the map */
            border: 0;
            border-radius: 8px;
            overflow: hidden; /* Ensure border-radius applies */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          }

          .map-container iframe {
            width: 100%;
            height: 100%;
            border: none; /* Remove default iframe border */
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .contact-info-title {
              font-size: 2em;
            }
            .contact-info-wrapper {
              padding: 30px 20px;
              text-align: center;
            }
            .contact-cards-container {
              flex-direction: column;
              align-items: center;
            }
            .contact-card {
              width: 75%;
        max-width: 250px;
            }
            .map-container {
              height: 300px; /* Adjust map height for smaller screens */
            }
          }
        `}
      </style>
      <div className="contact-info-wrapper">
        <h3
          className="contact-info-title"
          ref={titleRef}
        >
          {contactData.title}
        </h3>
        <div className="contact-cards-container">
          {contactData.contact_details.map((detail, index) => (
            <div
              className="contact-card"
              key={index}
              ref={el => cardsRef.current[index] = el}
            >
              {detail.type === 'email' && (
                <svg viewBox="0 0 24 24">
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                </svg>
              )}
              {detail.type === 'phone' && (
                <svg viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1h-4c-1.1 0-2.05-.25-2.9-.72-.9-.47-1.75-1.17-2.5-2.02-1.23-1.23-2.29-2.68-3.02-4.24-.73-1.56-1.08-3.2-.98-4.84.07-1.1.49-2.12 1.17-2.9.7-.78 1.6-1.37 2.6-1.72.8-.28 1.6-.42 2.4-.42.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1z"/>
                </svg>
              )}
              {detail.type === 'address' && (
                <svg viewBox="0 0 24 24">
                  <path d="M12 2c-4.2 0-8 3.22-8 8.2 0 3.32 2.67 7.25 8 11.8 5.33-4.55 8-8.48 8-11.8C20 5.22 16.2 2 12 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
              )}
              {detail.type === 'email' && (
                <p><a href={`mailto:${detail.value}`} style={{ color: 'black', textDecoration: 'none' }}>{detail.value}</a></p>
              )}
              {detail.type === 'phone' && (
                <p><a href={`tel:${detail.value}`} style={{ color: 'black', textDecoration: 'none' }}>{detail.value}</a></p>
              )}
              {detail.type === 'address' && (
                <p>{detail.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Google Map Iframe */}
        {contactData.map_embed_url && (
          <div
            className="map-container"
            ref={mapRef}
          >
            <iframe
              src={contactData.map_embed_url}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}

export default ContactInfo;






























// 'use client';

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import styles from './ContactInfo.module.css';

// gsap.registerPlugin(ScrollTrigger);

// function ContactInfo() {
//   const contactData = {
//     title: 'MORE WAYS TO REACH US',
//     contact_details: [
//       { type: 'email',   value: 'HELLO@DSA.COM.AU' },
//       { type: 'phone',   value: '1300 363 207' },
//       { type: 'address', value: 'UNIT 31/3 DALTON STREET' },
//     ],
//     map_embed_url:
//       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.2957140719263!2d78.13483327452836!3d11.673442442009199!...',
//   };

//   const titleRef = useRef(null);
//   const cardsRef = useRef([]);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     gsap.fromTo(
//       titleRef.current,
//       { opacity: 0, y: -50 },
//       {
//         opacity: 1, y: 0, duration: 1, ease: 'power3.out',
//         scrollTrigger: {
//           trigger: titleRef.current,
//           start: 'top 80%',
//           toggleActions: 'play none none none',
//         },
//       }
//     );

//     cardsRef.current.forEach((card, index) => {
//       gsap.fromTo(
//         card,
//         { opacity: 0, y: 50, scale: 0.8 },
//         {
//           opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: index * 0.1,
//           scrollTrigger: {
//             trigger: card,
//             start: 'top 90%',
//             toggleActions: 'play none none none',
//           },
//         }
//       );
//     });

//     gsap.fromTo(
//       mapRef.current,
//       { opacity: 0, y: 50 },
//       {
//         opacity: 1, y: 0, duration: 1, ease: 'power3.out',
//         scrollTrigger: {
//           trigger: mapRef.current,
//           start: 'top 85%',
//           toggleActions: 'play none none none',
//         },
//       }
//     );
//   }, []);

//   return (
//     <div className={styles['contact-info-wrapper']}>
//       <h3 className={styles['contact-info-title']} ref={titleRef}>
//         {contactData.title}
//       </h3>

//       <div className={styles['contact-cards-container']}>
//         {contactData.contact_details.map((detail, index) => (
//           <div
//             className={styles['contact-card']}
//             key={index}
//             ref={(el) => (cardsRef.current[index] = el)}
//           >
//             {detail.type === 'email' && (
//               <svg viewBox="0 0 24 24">
//                 <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
//               </svg>
//             )}
//             {detail.type === 'phone' && (
//               <svg viewBox="0 0 24 24">
//                 <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1h-4c-1.1 0-2.05-.25-2.9-.72-.9-.47-1.75-1.17-2.5-2.02-1.23-1.23-2.29-2.68-3.02-4.24-.73-1.56-1.08-3.2-.98-4.84.07-1.1.49-2.12 1.17-2.9.7-.78 1.6-1.37 2.6-1.72.8-.28 1.6-.42 2.4-.42.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1z" />
//               </svg>
//             )}
//             {detail.type === 'address' && (
//               <svg viewBox="0 0 24 24">
//                 <path d="M12 2c-4.2 0-8 3.22-8 8.2 0 3.32 2.67 7.25 8 11.8 5.33-4.55 8-8.48 8-11.8C20 5.22 16.2 2 12 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
//               </svg>
//             )}

//             {detail.type === 'email' && (
//               <p>
//                 <a href={`mailto:${detail.value}`} style={{ color: 'black', textDecoration: 'none' }}>
//                   {detail.value}
//                 </a>
//               </p>
//             )}
//             {detail.type === 'phone' && (
//               <p>
//                 <a href={`tel:${detail.value}`} style={{ color: 'black', textDecoration: 'none' }}>
//                   {detail.value}
//                 </a>
//               </p>
//             )}
//             {detail.type === 'address' && <p>{detail.value}</p>}
//           </div>
//         ))}
//       </div>

//       {contactData.map_embed_url && (
//         <div className={styles['map-container']} ref={mapRef}>
//           <iframe
//             src={contactData.map_embed_url}
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             title="Google Map Location"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ContactInfo;