import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // Import Script for external scripts

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ABCD Studios",
  description: "Welcome to ABCD Studios, a global leader in dance and performing arts education on the Gold Coast. We offer exceptional training in dance, singing, acting, musical theatre, and circus with state-of-the-art facilities.",
};

export default function RootLayout({ children }) {
  // Replace with your actual Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // e.g., G-ABC1234567

  // Replace with your actual Google Tag Manager Container ID
  const GTM_CONTAINER_ID = "GTM-XXXXXXX"; // e.g., GTM-ABC123

  // Replace with your actual Google Site Verification ID
  const GOOGLE_SITE_VERIFICATION_ID = "GRKxj45JySGl112vUtRk7E68ausnQtouK4_f2tpRY-7";

  return (
    <html lang="en">
      <head>
        {/* Font Awesome for social icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Site Verification Meta Tag */}
        {GOOGLE_SITE_VERIFICATION_ID && (
          <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION_ID} />
        )}

        {/* Google Analytics Global Site Tag (gtag.js) */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics-script"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager (GTM) - Head Part */}
        {GTM_CONTAINER_ID && (
          <Script
            id="google-tag-manager-head"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
              `,
            }}
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Google Tag Manager (GTM) - NoScript Part (immediately after the opening <body> tag) */}
        {GTM_CONTAINER_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}