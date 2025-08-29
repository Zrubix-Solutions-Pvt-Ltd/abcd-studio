/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['your-cdn.com', 'images.instagram.com', 'ssda.in', 'gatorprints.com', 'www.svgheart.com','ledimoredelquartetto.eu',
        
        'your-image-host-1.com',
      'your-image-host-2.com', 
      'us.123rf.com',
      'files-accl.zohoexternal.com',
      'www.blackpoolgrand.co.uk',
      'm.media-amazon.com',
      'encrypted-tbn0.gstatic.com',
      'www.freeiconspng.com',
      '...']
    // or remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
};


export default nextConfig;
