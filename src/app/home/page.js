// src/app/HomePage.jsx
"use client"; 

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

import { HomeHeroSection, HomeHeroSecMobile } from './components/HomeHeroSection';
// import Header from '../header/page'; // Remove direct import
import WelcomeStudio from './components/WelcomeStudio';
import WhatsOn from './components/WhatsOn';
import MenuImagesSection from './components/MenuImageSection';
import Backstage from './components/Backstage';

// Dynamically import Header with ssr: false
const Header = dynamic(() => import('../header/page'), { ssr: false });

import Footer from '../footer/page';

function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState (true)

  let imageItemUrls = {
  
   //What's on Section Images
   image1: { url: "https://www.blackpoolgrand.co.uk/app/uploads/2020/01/Jinjo17_Credit_Belinda_Lawley-1.jpg", altText: "image1dfg" },
   image2: { url: "https://m.media-amazon.com/images/I/31rXhchkvrL._UF894,1000_QL80_.jpg", altText: "image2" },
   image3: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s", altText: "image3" },

   //menuImage Section Images
   image4: { url: "https://us.123rf.com/450wm/sanches1980/sanches19801802/sanches1980180200449/96461064-young-beautiful-female-dancer-is-posing-in-the-studio.jpg?ver=6", altText: "image4test" },
   image5: { url: "https://us.123rf.com/450wm/sanches1980/sanches19801802/sanches1980180200449/96461064-young-beautiful-female-dancer-is-posing-in-the-studio.jpg?ver=6", altText: "image5test" },
   image6: { url: "https://us.123rf.com/450wm/sanches1980/sanches19801802/sanches1980180200449/96461064-young-beautiful-female-dancer-is-posing-in-the-studio.jpg?ver=6", altText: "image6test" },
   image7: { url: "https://us.123rf.com/450wm/sanches1980/sanches19801802/sanches1980180200449/96461064-young-beautiful-female-dancer-is-posing-in-the-studio.jpg?ver=6", altText: "image7test" },

   //Backstage Section Images
   image8: { url: "https://ledimoredelquartetto.eu/lddqwp/wp-content/uploads/2024/04/dimore_quartetto_backstage-conversations.jpg.jpg", altText: "image8test" },


  }
  let videoItemUrls = {
    video1: { url: "https://www.youtube.com/embed/tTl40cZnVyk?autoplay=1&mute=1&loop=1&playlist=tTl40cZnVyk&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0", altText: "Satish moving in the background" }
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
      <Header /> {/* This will now be dynamically imported */}
      {/* <HomeHeroSection/> */}
      {isMobile ? <HomeHeroSecMobile LinkUrls ={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls}/> : <HomeHeroSection LinkUrls ={linkItemUrls} ImageUrls={imageItemUrls} VideoUrls={videoItemUrls}/>}
      <WelcomeStudio/>
      <WhatsOn ImageUrls={imageItemUrls} VideoUrls={videoItemUrls}/>
      <MenuImagesSection ImageUrls={imageItemUrls} VideoUrls={videoItemUrls}/>
      <Backstage ImageUrls={imageItemUrls} VideoUrls={videoItemUrls}/>
      <Footer/> 
    </>
  );
}

export default HomePage;