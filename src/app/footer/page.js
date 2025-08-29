'use client';

import React, { useState, useEffect } from 'react';

import FollowInsta from './components/Followinsta';
import Address from './components/Address';
import PrivacySec from './components/PrivacySection';

function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState (true)


  let imageItemUrls = {
  
    //Backstage Section Images
    image9: { url: "https://ssda.in/blog/wp-content/uploads/2020/12/JAZZFUNK-min.jpg", altText: "image9test" },
    image10: { url: "https://ssda.in/blog/wp-content/uploads/2020/12/JAZZFUNK-min.jpg", altText: "image10test" },
    image11: { url: "https://ssda.in/blog/wp-content/uploads/2020/12/JAZZFUNK-min.jpg", altText: "image11test" },
    image12: { url: "https://ssda.in/blog/wp-content/uploads/2020/12/JAZZFUNK-min.jpg", altText: "image12test" },
    image13: { url: "https://ssda.in/blog/wp-content/uploads/2020/12/JAZZFUNK-min.jpg", altText: "image13test" },
    image14: { url: "https://ssda.in/blog/wp-content/uploads/2020/12/JAZZFUNK-min.jpg", altText: "image14test" },

    //Logo Section Images
    image15: { url: "https://gatorprints.com/wp-content/uploads/2015/04/Sample-Logo1.png", altText: "image15test" },
 
 
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
      setIsMobile(detectMobile() || window.innerWidth <= 768); 
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* {isMobile ? <HomeHeroSecMobile /> : <HomeHeroSection/>} */}
      {/* <FollowInsta ImageUrls={imageItemUrls} VideoUrls={videoItemUrls} LinkUrls ={linkItemUrls}/> */}
      <PrivacySec/>
      <Address ImageUrls={imageItemUrls} VideoUrls={videoItemUrls}/> 

    </>
  );
} 

export default Footer;