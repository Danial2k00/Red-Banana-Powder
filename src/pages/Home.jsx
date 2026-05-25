import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Leaf, Star, ArrowRight, Quote, HeartPulse } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import InstagramSection from '../components/InstagramSection';
import { categories } from '../data/products';
import { useProducts } from '../context/ProductsContext';

const Home = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  // Filter 4 featured products for display
  const featuredProducts = products.slice(0, 4);

  const handleCategoryClick = (categoryName) => {
    if (categoryName === 'All Products') {
      navigate('/products');
    } else {
      navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    }
  };

  return (
    <div className="w-full space-y-8 md:space-y-16 animate-fade-in bg-floral-pattern pb-8">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Category Strip */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl p-5 md:p-6 border border-maroon/5 shadow-blush-sm flex flex-col md:flex-row items-center justify-between gap-6 py-8 px-4 md:py-6 md:px-6">
          <div className="text-center md:text-left space-y-1 min-w-[200px]">
            <h3 className="font-heading font-black text-xl md:text-lg text-maroon uppercase tracking-wider">Quick Categories</h3>
            <p className="text-xs text-darkbrown/50 font-semibold">Select an option to refine your search</p>
          </div>
          
          <div className="flex-1 w-full flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-2.5 md:gap-3 py-1 overflow-x-auto hide-scrollbar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className="flex-shrink-0 bg-cream/70 hover:bg-maroon hover:text-white border border-maroon/15 hover:border-gold px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[13px] md:text-xs font-black text-maroon transition-all duration-300 hover:shadow-blush-sm uppercase tracking-wider"
              >
                {cat === 'All Products' ? 'Show All' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits section (Anchor target for header nav) */}
      <section id="benefits" className="max-w-7xl mx-auto px-4 md:px-6 scroll-mt-24 py-8 md:py-16">
        <div className="bg-blush/40 rounded-3xl p-5 md:p-12 border border-maroon/5 flex flex-col lg:flex-row gap-10 items-center">
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-xs font-black text-gold uppercase tracking-[0.2em] flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-maroon animate-pulse" />
              Royal Health Traditions
            </span>
            <h2 className="text-2xl md:text-3.5xl font-black font-heading text-maroon leading-tight">
              Why Is Red Banana Powder A Natural Superfood?
            </h2>
            <p className="text-sm text-darkbrown/70 leading-relaxed font-medium">
              Red Bananas are naturally loaded with superior nutritional payloads compared to standard yellow bananas. They possess higher concentrations of essential vitamins, beta-carotene, and gut-nourishing prebiotic fibers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-maroon/5">
                <div className="w-10 h-10 bg-blush rounded-xl flex items-center justify-center text-gold font-extrabold text-lg">★</div>
                <div>
                  <h4 className="text-xs font-bold text-darkbrown uppercase tracking-wide">3x Vitamin C</h4>
                  <p className="text-[10px] text-darkbrown/50 font-semibold">Boosts natural energy and immunity.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-maroon/5">
                <div className="w-10 h-10 bg-blush rounded-xl flex items-center justify-center text-gold font-extrabold text-lg">★</div>
                <div>
                  <h4 className="text-xs font-bold text-darkbrown uppercase tracking-wide">High Potassium</h4>
                  <p className="text-[10px] text-darkbrown/50 font-semibold">Supports healthy muscles &amp; pressure.</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/products')}
              className="w-full md:w-auto bg-maroon hover:bg-maroon-hover text-white text-xs font-bold px-8 py-3.5 rounded-full border border-gold hover:shadow-gold-glow flex items-center justify-center gap-2 group transition-all duration-300 uppercase tracking-widest min-h-[44px]"
            >
              <span>Shop Our Superfoods</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-blush-lg border-2 border-gold/10">
              <img
                src="https://placehold.co/800x550/C8992A/FFF8F5?text=Red+Banana+Estate+Harvest"
                alt="Estate harvest"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-maroon/10 shadow-md">
                <h4 className="text-xs font-extrabold text-maroon uppercase tracking-wide">Orchard Direct Sourcing</h4>
                <p className="text-[10px] text-darkbrown/60 font-semibold mt-1">Grown naturally in mineral-rich soil using traditional rainwater irrigation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Products (2 columns on mobile) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em]">Our Signature Selection</span>
          <h2 className="text-2xl md:text-3.5xl font-black font-heading text-maroon">
            Featured Products
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/products')}
            className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-black text-maroon hover:text-gold transition-colors duration-300 border border-maroon/30 hover:border-gold px-8 py-3.5 rounded-full uppercase tracking-wider bg-white shadow-blush-sm min-h-[44px]"
          >
            Show All Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="bg-cream py-8 md:py-16 border-y border-maroon/5 bg-floral-pattern">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          <div className="bg-white rounded-2xl p-6 border border-maroon/5 shadow-blush-sm text-center space-y-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-blush rounded-xl flex items-center justify-center text-maroon mx-auto border border-maroon/10">
              <Leaf className="w-6 h-6 text-maroon" />
            </div>
            <h3 className="text-sm font-black font-heading text-maroon uppercase tracking-wider">100% Natural</h3>
            <p className="text-xs text-darkbrown/60 leading-relaxed font-semibold">
              Harvested organically and processed naturally without any synthetic fillers, added sugars, or chemical interference.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-maroon/5 shadow-blush-sm text-center space-y-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-blush rounded-xl flex items-center justify-center text-maroon mx-auto border border-maroon/10">
              <ShieldCheck className="w-6 h-6 text-maroon" />
            </div>
            <h3 className="text-sm font-black font-heading text-maroon uppercase tracking-wider">Lab Tested</h3>
            <p className="text-xs text-darkbrown/60 leading-relaxed font-semibold">
              Rigorous laboratory quality checking protocols to ensure standard nutrition payloads and maximum safety metrics.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-maroon/5 shadow-blush-sm text-center space-y-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-blush rounded-xl flex items-center justify-center text-maroon mx-auto border border-maroon/10">
              <Truck className="w-6 h-6 text-maroon" />
            </div>
            <h3 className="text-sm font-black font-heading text-maroon uppercase tracking-wider">Free Shipping above ₹499</h3>
            <p className="text-xs text-darkbrown/60 leading-relaxed font-semibold">
              Fast, completely secure packaging and door shipping across the subcontinent. Orders packed inside double-seal packs.
            </p>
          </div>

        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em]">Customer Stories</span>
          <h2 className="text-2xl md:text-3.5xl font-black font-heading text-maroon">
            Trusted By Thousands
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl p-6 border border-maroon/5 shadow-blush-sm flex flex-col justify-between relative overflow-hidden group hover:border-maroon/10 transition-all duration-300">
            <Quote className="absolute right-4 top-4 w-10 h-10 text-blush-dark/30 z-0" />
            <div className="space-y-4 relative z-10">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-xs text-darkbrown/70 leading-relaxed font-semibold italic">
                "Absolutely pure and rich in flavor! I mix it daily into my son's morning porridge and have noticed a massive improvement in digestion."
              </p>
            </div>
            <div className="pt-4 border-t border-maroon/5 mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blush text-maroon font-bold text-xs flex items-center justify-center border border-gold/10">SK</div>
              <div>
                <h4 className="text-xs font-bold text-darkbrown">Sarah K.</h4>
                <span className="text-[10px] text-gold font-extrabold uppercase">Verified Mother</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-maroon/5 shadow-blush-sm flex flex-col justify-between relative overflow-hidden group hover:border-maroon/10 transition-all duration-300">
            <Quote className="absolute right-4 top-4 w-10 h-10 text-blush-dark/30 z-0" />
            <div className="space-y-4 relative z-10">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-xs text-darkbrown/70 leading-relaxed font-semibold italic">
                "As an athlete, finding natural, high-potassium supplements is essential. These capsules are highly concentrated and work like magic."
              </p>
            </div>
            <div className="pt-4 border-t border-maroon/5 mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blush text-maroon font-bold text-xs flex items-center justify-center border border-gold/10">RV</div>
              <div>
                <h4 className="text-xs font-bold text-darkbrown">Rajesh V.</h4>
                <span className="text-[10px] text-gold font-extrabold uppercase">Marathon runner</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-maroon/5 shadow-blush-sm flex flex-col justify-between relative overflow-hidden group hover:border-maroon/10 transition-all duration-300">
            <Quote className="absolute right-4 top-4 w-10 h-10 text-blush-dark/30 z-0" />
            <div className="space-y-4 relative z-10">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-xs text-darkbrown/70 leading-relaxed font-semibold italic">
                "The premium gift pack is gorgeous! Modeled like a royal jewelry box, it makes the perfect, healthy gift for family gatherings."
              </p>
            </div>
            <div className="pt-4 border-t border-maroon/5 mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blush text-maroon font-bold text-xs flex items-center justify-center border border-gold/10">PM</div>
              <div>
                <h4 className="text-xs font-bold text-darkbrown">Priya M.</h4>
                <span className="text-[10px] text-gold font-extrabold uppercase">Nutrition Consultant</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Instagram Section */}
      <InstagramSection />
    </div>
  );
};

export default Home;
