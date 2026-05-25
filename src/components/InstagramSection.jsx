import React from 'react';
import { Instagram } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    image: 'https://placehold.co/500x500/7B1C2E/FFF8F5?text=Smoothie+Bowl+Recipe',
    tag: '#MorningRoutine',
    likes: '1.2k'
  },
  {
    id: 2,
    image: 'https://placehold.co/500x500/C8992A/FFF8F5?text=Fresh+Red+Bananas',
    tag: '#OrganicHarvest',
    likes: '958'
  },
  {
    id: 3,
    image: 'https://placehold.co/500x500/7B1C2E/FFF8F5?text=Healthy+Banana+Baking',
    tag: '#BakeClean',
    likes: '1.5k'
  },
  {
    id: 4,
    image: 'https://placehold.co/500x500/C8992A/FFF8F5?text=Daily+Immunity+Capsule',
    tag: '#PureWellness',
    likes: '2.1k'
  }
];

const InstagramSection = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-white to-blush overflow-hidden">
      {/* Soft Floral SVG Overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none z-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Elegant flower patterns */}
          <path d="M10 20 C 15 15, 20 15, 20 20 C 20 25, 15 25, 10 20 Z" fill="#7B1C2E" />
          <path d="M20 20 C 25 15, 30 15, 30 20 C 30 25, 25 25, 20 20 Z" fill="#7B1C2E" />
          <path d="M15 15 C 15 10, 20 5, 25 5 C 30 5, 30 10, 25 15 Z" fill="#7B1C2E" />
          
          <path d="M80 80 C 85 75, 90 75, 90 80 C 90 85, 85 85, 80 80 Z" fill="#7B1C2E" />
          <path d="M90 80 C 95 75, 100 75, 100 80 C 100 85, 95 85, 90 80 Z" fill="#7B1C2E" />
          <path d="M85 75 C 85 70, 90 65, 95 65 C 100 65, 100 70, 95 75 Z" fill="#7B1C2E" />

          <circle cx="15" cy="20" r="3" fill="#C8992A" />
          <circle cx="85" cy="80" r="3" fill="#C8992A" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-maroon hover:text-gold transition-colors duration-300 group cursor-pointer">
            <Instagram className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm font-black uppercase tracking-[0.2em] font-body">Follow Us on Instagram</span>
          </div>
          <h2 className="text-2xl md:text-3.5xl font-black font-heading text-maroon">
            @redbanana.powder
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
        </div>

        {/* Posts Grid (Horizontal scroll on mobile, Grid on desktop) */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-4 select-none">
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className="w-[200px] h-[200px] shrink-0 snap-start lg:w-auto lg:h-auto lg:aspect-square group relative rounded-2xl overflow-hidden border-4 border-white shadow-blush-sm hover:shadow-blush-md transition-all duration-300 cursor-pointer bg-cream"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={`Instagram Post ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-maroon/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                <Instagram className="w-8 h-8 text-gold animate-bounce" />
                <span className="text-sm font-bold mt-2 font-heading tracking-wide">{post.tag}</span>
                <span className="text-xs text-white/70 font-semibold mt-1">❤ {post.likes} Likes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
