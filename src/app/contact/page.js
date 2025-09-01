'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import Header from '../header/page';
import Footer from '../footer/page';
import ContactHeroSection from './components/ContactHeroSection';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

function Contact() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState (true);
  const contactFormRef = useRef(null);

  let imageItemUrls = {
  
   //What's on Section Images
   image1: { url: "https://www.blackpoolgrand.co.uk/app/uploads/2020/01/Jinjo17_Credit_Belinda_Lawley-1.jpg", altText: "image1dfg" },

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
      <Header />
      <ContactHeroSection />
      <ContactForm ref={contactFormRef} />
      <ContactInfo />
      <Footer/>
    </>
  );
}

export default Contact;

// Helper function to scroll to the contact form
export const scrollToContactForm = () => {
  gsap.to(window, { duration: 1, scrollTo: "#contact-form-wrapper" });
};