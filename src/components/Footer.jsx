import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setSuccess(true);
    setEmail('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <footer className="w-full bg-[#3D0A13] text-cream pt-16 pb-8 border-t-2 border-gold/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
        
        {/* Column 1: About Us */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-gold" />
            <h3 className="text-lg font-bold font-heading text-white tracking-wide">About Us</h3>
          </div>
          <p className="text-xs text-cream/70 leading-relaxed font-medium">
            Red Banana Powder is committed to bringing raw, organic, and premium-grade dietary superfoods to modern households. Inspired by ancient royal wellness traditions and tested by standard laboratories, our products deliver daily vitality and gut nourishment.
          </p>
          <div className="pt-2">
            <span className="text-[10px] bg-gold/15 text-gold font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-gold/30">
              100% Lab Tested Superfoods
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-heading text-white tracking-wide">Quick Links</h3>
          <ul className="space-y-2.5 text-xs text-cream/70 font-semibold">
            <li>
              <Link to="/products" className="hover:text-gold transition-colors flex items-center gap-1.5 group">
                <span className="w-1.5 h-1.5 bg-gold rounded-full group-hover:scale-150 transition-transform" />
                Ready To Ship Catalog
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-gold transition-colors flex items-center gap-1.5 group">
                <span className="w-1.5 h-1.5 bg-gold rounded-full group-hover:scale-150 transition-transform" />
                Raw Organic Powders
              </Link>
            </li>
            <li>
              <Link to="/products?category=Capsules" className="hover:text-gold transition-colors flex items-center gap-1.5 group">
                <span className="w-1.5 h-1.5 bg-gold rounded-full group-hover:scale-150 transition-transform" />
                Concentrated Capsules
              </Link>
            </li>
            <li>
              <Link to="/products?category=Bulk Orders" className="hover:text-gold transition-colors flex items-center gap-1.5 group">
                <span className="w-1.5 h-1.5 bg-gold rounded-full group-hover:scale-150 transition-transform" />
                Wholesale &amp; Bulk Packs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition-colors flex items-center gap-1.5 group">
                <span className="w-1.5 h-1.5 bg-gold rounded-full group-hover:scale-150 transition-transform" />
                Get In Touch With Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-heading text-white tracking-wide">Contact Details</h3>
          <ul className="space-y-3.5 text-xs text-cream/70 font-semibold">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Red Banana Premium Estates, 
                <br />
                Western Ghats, Tamil Nadu, 
                <br />
                India - 627001
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              <span>+91 44 2838 9000 | +91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              <span>wellness@redbananapowder.com</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Follow Us & Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-heading text-white tracking-wide">Follow &amp; Subscribe</h3>
          <p className="text-xs text-cream/70 leading-relaxed font-semibold">
            Subscribe to receive royal healthy recipes, wellness tips, and exclusive discount updates.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="flex bg-white/15 border border-white/20 rounded-xl p-1 items-center focus-within:ring-2 focus-within:ring-gold/50 transition-all duration-300">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-cream/40 px-3 py-2"
              required
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-hover text-white p-2.5 rounded-lg transition-colors border border-gold-dark/25 hover:shadow-gold-glow flex items-center justify-center flex-shrink-0"
              aria-label="Subscribe to newsletter"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {success && (
            <p className="text-[10px] text-gold font-bold animate-fade-in">✓ Subscription successful! Thank you.</p>
          )}

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="#facebook" 
              className="p-2 bg-white/10 rounded-full hover:bg-gold text-white hover:text-white transition-all duration-300 border border-white/5 hover:scale-105"
              aria-label="Visit Facebook page"
            >
              <Facebook className="w-4.5 h-4.5" />
            </a>
            <a 
              href="#instagram" 
              className="p-2 bg-white/10 rounded-full hover:bg-gold text-white hover:text-white transition-all duration-300 border border-white/5 hover:scale-105"
              aria-label="Visit Instagram page"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a 
              href="#youtube" 
              className="p-2 bg-white/10 rounded-full hover:bg-gold text-white hover:text-white transition-all duration-300 border border-white/5 hover:scale-105"
              aria-label="Visit YouTube channel"
            >
              <Youtube className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-cream/45">
        <div>
          © 2025 Red Banana Powder. All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <a href="#privacy" className="hover:text-cream transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#terms" className="hover:text-cream transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#shipping" className="hover:text-cream transition-colors">Shipping Info</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
