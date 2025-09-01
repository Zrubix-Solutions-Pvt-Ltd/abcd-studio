/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'your-cdn.com',
      'images.instagram.com',
      'ssda.in',
      'gatorprints.com',
      'www.svgheart.com',
      'ledimoredelquartetto.eu',

      'your-image-host-1.com',
      'your-image-host-2.com',
      'us.123rf.com',
      'files-accl.zohoexternal.com',
      'www.blackpoolgrand.co.uk',
      'm.media-amazon.com',
      'encrypted-tbn0.gstatic.com',
      'www.freeiconspng.com',
      'static.vecteezy.com',
      'pi.tedcdn.com',
      'placehold.co',
      'cdn.prod.website-files.com',
      'i.pinimg.com',
      'www.shutterstock.com',
      'static.wixstatic.com',
      'danceparties.biz',
      'attdstudio.com',
      'static.wixstatic.com',
      'topdancefloor.com',
      'whataftercollege.com',

      // ADDED from your classData usage
      'islarosedanceacademy.com',

      // keep this at the end to remind future additions
      '...'
    ],
    // If you ever need more control, you can switch to remotePatterns
    // remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;