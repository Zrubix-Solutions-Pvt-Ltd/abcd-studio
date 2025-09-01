'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import Header from '../header/page';
import Footer from '../footer/page';
import { OurStudioHeroSec, OurStudioHeroSecMobile } from './components/OurStudioHeroSec';
import OurStudioClassesSection from '../our-class/page';
import OurEventsSection from '../our-events/page';

function OurStudio() {
  const [isMobile, setIsMobile] = useState(false);
//   const [isAdmin, setIsAdmin] = useState (true);

  let imageItemUrls = {
  
   //What's on Section Images
   image1: { url: "https://www.blackpoolgrand.co.uk/app/uploads/2020/01/Jinjo17_Credit_Belinda_Lawley-1.jpg", altText: "image1dfg" },
  

  }
  let videoItemUrls = {
    video1: {
        url: "https://www.youtube.com/embed/59Y05u5lD-w?autoplay=1&mute=1&loop=1&playlist=59Y05u5lD-w&controls=0&showinfo=0&rel=0",
        altText: "Your descriptive alt text for this video"
      }
  }

  let linkItemUrls = {
    link1: { url: "https://www.instagram.com/reel/DM5mzg4Tnbv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D", altText: "Insta embed code" }
  }

  
  useEffect(() => {
    const detectMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Regular expressions to detect common mobile devices
      if (/android/i.test(userAgent)) {
        return true;
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
      }
      // Add more checks for other mobile devices if needed
      return false;
    };

    setIsMobile(detectMobile());

    const handleResize = () => {
      setIsMobile(detectMobile() || window.innerWidth <= 768); // Combine userAgent with width for broader coverage
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <Helmet>
        <title>Our Studio | Dance, Art, Events & Performance Space in Salem</title>
        <meta name="description" content="Welcome to our studio in Salem! Discover a versatile space for dance, art, events, and performances. Explore our facilities, upcoming creative events, and backstage resources for artists and creators." />
        <meta name="keywords" content="Our Studio Salem, Studio Salem, Events Salem, Dance Salem, Art Salem, Performance Salem, Dance Studio Salem, Art Gallery Salem, Live Events Salem, Event Space Salem, Dance Classes Salem, Art Workshops Salem, Stage Performance Salem, Local Artists Salem, Venue Hire Salem, Backstage Access Salem, Best Dance Classes Salem, Top Art Workshops Salem, Live Music Salem, Creative Studio Salem, Professional Dance Studio Salem, Art Exhibition Salem, Performing Arts Salem, Backstage Support Salem, Event Management Salem, Dance Performance Salem, Art Studio Salem, Premier Event Venue Salem, Professional Dance Classes Salem, Live Performance Venue Salem, Salem Performing Arts Center, Creative Art Studio Salem, Salem Backstage Facilities, Local Artists Salem Exhibitions, Dance Performance Events Salem, Art Workshop Classes Salem, Salem Event Management Services, Modern Dance Studio Salem, Traditional Art Gallery Salem, Community Performance Space Salem, Best Multi-purpose Studio for Events in Salem, Top Rated Dance and Art Performance Venue Salem, Professional Backstage Facilities for Events in Salem, Comprehensive Dance and Art Education Programs Salem, Premier Destination for Live Performances and Events Salem, Salem's Leading Studio for Creative Arts and Dance, Exclusive Event Space with Backstage Access in Salem, High-Quality Dance Training and Performance Opportunities Salem, Showcasing Local Art and Talent in Salem Events, State-of-the-Art Performance Venue for Artists in Salem" />
      </Helmet>

      <Header />

      {/* <HomeHeroSection/> */}
      {isMobile ? <OurStudioHeroSecMobile LinkUrls ={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls}/> : <OurStudioHeroSec LinkUrls ={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls}/>}
      
      <Suspense><OurStudioClassesSection/></Suspense>

      <OurEventsSection/>
      <Footer/>
    </>
  );
}

export default OurStudio;