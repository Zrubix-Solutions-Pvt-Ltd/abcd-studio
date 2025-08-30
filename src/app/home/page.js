// src/app/HomePage.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head'; // Import Head for meta tags
import Script from 'next/script'; // Import Script for JSON-LD
import dynamic from 'next/dynamic';

import { HomeHeroSection, HomeHeroSecMobile } from './components/HomeHeroSection';
import WelcomeStudio from './components/WelcomeStudio';
import { Whatson, WhatsonMobile } from './components/WhatsOn';
import MenuImagesSection from './components/MenuImageSection';
import { Backstage, BackstageMobile } from './components/Backstage';

// Dynamically import Header with ssr: false
const Header = dynamic(() => import('../header/page'), { ssr: false });

import Footer from '../footer/page';

function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Assuming this is for admin features, not directly SEO related

  let imageItemUrls = {
    //What's on Section Images
    image1: { url: "https://www.blackpoolgrand.co.uk/app/uploads/2020/01/Jinjo17_Credit_Belinda_Lawley-1.jpg", altText: "Dynamic dance performance at ABCD Studios" },
    image2: { url: "https://m.media-amazon.com/images/I/31rXhchkvrL._UF894,1000_QL80_.jpg", altText: "Behind the scenes at ABCD Studios" },
    image3: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s", altText: "Students practicing at ABCD Studios" },

    //menuImage Section Images
    image4: { url: "https://us.123rf.com/450wm/sanches1980/sanches19801802/sanches1980180200449/96461064-young-beautiful-female-dancer-is-posing-in-the-studio.jpg?ver=6", altText: "Our state-of-the-art dance studio" },
    image5: { url: "https://us.123rf.com/450wm/sanches1980/sanches19801802/sanches1980180200449/96461064-young-beautiful-female-dancer-is-posing-in-the-studio.jpg?ver=6", altText: "ABCD Talent Agency" },
    image6: { url: "https://us.123rf.com/450wm/sanches1980/sanches19801802/sanches1980180200449/96461064-young-beautiful-female-dancer-is-posing-in-the-studio.jpg?ver=6", altText: "Fully equipped gym at ABCD Studios" },
    image7: { url: "https://us.123rf.com/450wm/sanches1980/sanches19801802/sanches1980180200449/96461064-young-beautiful-female-dancer-is-posing-in-the-studio.jpg?ver=6", altText: "Creative space for performing arts" },

    //Backstage Section Images
    image8: { url: "https://ledimoredelquartetto.eu/lddqwp/wp-content/uploads/2024/04/dimore_quartetto_backstage-conversations.jpg.jpg", altText: "Backstage conversations at ABCD Studios" },
  };

  let videoItemUrls = {
    video1: { url: "https://www.youtube.com/embed/tTl40cZnVyk?autoplay=1&mute=1&loop=1&playlist=tTl40cZnVyk&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0", altText: "Dynamic dance video showcasing ABCD Studios" }
  };

  let linkItemUrls = {
    link1: { url: "https://www.instagram.com/reel/DM5mzg4Tnbv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D", altText: "Instagram reel from ABCD Studios" }
  };

  useEffect(() => {
    const detectMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android|ipad|iphone|ipod/i.test(userAgent) && !window.MSStream;
    };

    setIsMobile(detectMobile());

    const handleResize = () => {
      setIsMobile(detectMobile() || window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>ABCD Studios - Premier Dance & Performing Arts Education Gold Coast</title>
        <meta name="description" content="Welcome to ABCD Studios, a global leader in dance and performing arts education on the Gold Coast. We offer exceptional training in dance, singing, acting, musical theatre, and circus with state-of-the-art facilities." />
        <meta name="keywords" content="ABCD Studios, dance education, performing arts, Gold Coast, dance classes, singing lessons, acting classes, musical theatre, circus training, performing arts school, dance studio, talent agency, gym" />
        <link rel="canonical" href="https://yourwebsite.com/" /> {/* Replace with your actual website URL */}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" /> {/* Replace with your actual website URL */}
        <meta property="og:title" content="ABCD Studios - Premier Dance & Performing Arts Education Gold Coast" />
        <meta property="og:description" content="Welcome to ABCD Studios, a global leader in dance and performing arts education on the Gold Coast. We offer exceptional training in dance, singing, acting, musical theatre, and circus with state-of-the-art facilities." />
        <meta property="og:image" content={imageItemUrls.image1.url} /> {/* Use a relevant image URL */}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourwebsite.com/" /> {/* Replace with your actual website URL */}
        <meta property="twitter:title" content="ABCD Studios - Premier Dance & Performing Arts Education Gold Coast" />
        <meta property="twitter:description" content="Welcome to ABCD Studios, a global leader in dance and performing arts education on the Gold Coast. We offer exceptional training in dance, singing, acting, musical theatre, and circus with state-of-the-art facilities." />
        <meta property="twitter:image" content={imageItemUrls.image1.url} /> {/* Use a relevant image URL */}
      </Head>

      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ABCD Studios",
            "url": "https://yourwebsite.com/", // Replace with your actual website URL
            "logo": "https://yourwebsite.com/logo.png", // Replace with your actual logo URL
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-123-4567", // Replace with your actual phone number
              "contactType": "Customer Service"
            },
            "sameAs": [
              "https://www.instagram.com/abcdstudios/", // Replace with your actual Instagram URL
              "https://www.facebook.com/abcdstudios/" // Replace with your actual Facebook URL
            ]
          })
        }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Home Page - ABCD Studios",
            "url": "https://yourwebsite.com/", // Replace with your actual website URL
            "description": "Official homepage of ABCD Studios, offering world-class dance and performing arts training on the Gold Coast.",
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "name": "ABCD Studios",
              "url": "https://yourwebsite.com/" // Replace with your actual website URL
            }
          })
        }}
      />

      <Header />
      {isMobile ? <HomeHeroSecMobile LinkUrls={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls} /> : <HomeHeroSection LinkUrls={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls} />}
      <WelcomeStudio />
      {isMobile ? <WhatsonMobile LinkUrls={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls} /> : <Whatson LinkUrls={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls} />}
      <MenuImagesSection ImageUrls={imageItemUrls} VideoUrls={videoItemUrls} />
      {isMobile ? <BackstageMobile LinkUrls={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls} /> : <Backstage LinkUrls={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls} />}
      <Footer />
    </>
  );
}

export default HomePage;