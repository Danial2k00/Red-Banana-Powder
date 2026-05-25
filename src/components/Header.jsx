import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import SearchOverlay from './SearchOverlay';

const Header = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistItems, setIsWishlistOpen } = useWishlist();
  const { setIsAuthOpen, user } = useAuth();
  
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll listener to toggle sticky layout
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when routing changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (path, hash) => {
    setIsMobileMenuOpen(false);
    if (hash) {
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(path);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header 
        className={`w-full z-[100] transition-all duration-300 ${
          isSticky 
            ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-blush-md border-b border-maroon/5 h-16 md:h-auto flex items-center' 
            : 'relative bg-cream border-b border-maroon/10 h-16 md:h-auto flex items-center py-2 md:py-3'
        }`}
      >
        {/* Main top bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between gap-4">
          
          {/* Left Column: Hamburger (Mobile) or Store Locator (Desktop) */}
          <div className="flex-1 md:flex-initial flex items-center justify-start">
            {/* Hamburger Trigger for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-maroon hover:bg-blush rounded-xl border border-maroon/10 transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Store Locator Pill on Desktop */}
            <button 
              onClick={() => handleNavClick('/contact')}
              className="hidden md:flex items-center gap-2 bg-white/80 border border-maroon/15 hover:border-gold px-3.5 py-1.5 rounded-full text-xs font-black text-maroon hover:text-gold transition-all duration-300 hover:shadow-blush-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>Store Locator</span>
            </button>
          </div>

          {/* Center Column: Logo with single line display and scale bounds */}
          <div className="flex-grow flex justify-center max-w-fit md:max-w-none whitespace-nowrap">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="watercolor-logo-bg flex flex-col items-center justify-center py-1 group select-none max-w-fit"
            >
              {/* Floral Lotus symbol */}
              <span className="text-[9px] md:text-[10px] tracking-[0.4em] font-extrabold text-gold uppercase group-hover:text-maroon transition-colors">
                ESTD 2025
              </span>
              <span className="text-base md:text-2xl font-black font-heading text-maroon tracking-wider group-hover:scale-[1.02] transition-transform duration-300 whitespace-nowrap">
                Red Banana Powder
              </span>
              <div className="hidden md:block h-[1.5px] w-12 bg-gold mt-0.5 rounded-full group-hover:w-20 transition-all duration-500" />
            </Link>
          </div>

          {/* Right Column: Actions (36px circles on mobile, 20px icons, 8px gaps) */}
          <div className="flex-1 md:flex-initial flex items-center justify-end gap-2 md:gap-3">
            {/* Search Pill */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-blush text-maroon hover:scale-105 transition-all duration-300 border border-maroon/10 shrink-0"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5 md:w-4.5 md:h-4.5" />
            </button>

            {/* Profile trigger */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-blush text-maroon hover:scale-105 transition-all duration-300 border border-maroon/10 shrink-0 relative"
              aria-label="User account"
            >
              <User className="w-5 h-5 md:w-4.5 md:h-4.5" />
              {user && (
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
              )}
            </button>

            {/* Wishlist trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-blush text-maroon hover:scale-105 transition-all duration-300 border border-maroon/10 shrink-0 relative"
              aria-label="Wishlist saved items"
            >
              <Heart className="w-5 h-5 md:w-4.5 md:h-4.5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-white font-extrabold text-[8px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Cart trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-blush text-maroon hover:scale-105 transition-all duration-300 border border-maroon/10 shrink-0 relative bg-white/40"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5 md:w-4.5 md:h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-maroon text-white font-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse-subtle border border-gold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation bar below logo */}
        <nav className="hidden md:block w-full border-t border-maroon/5 mt-3 pt-3 bg-white/20">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 text-xs font-black uppercase tracking-wider text-darkbrown/80">
            <Link 
              to="/"
              className={`nav-link-hover py-1 transition-colors hover:text-maroon ${
                isActive('/') ? 'text-maroon font-black relative' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products"
              className={`nav-link-hover py-1 transition-colors hover:text-maroon ${
                isActive('/products') ? 'text-maroon font-black relative' : ''
              }`}
            >
              Products
            </Link>
            <button 
              onClick={() => handleNavClick('/', 'benefits')}
              className="nav-link-hover py-1 transition-colors hover:text-maroon text-left uppercase"
            >
              Benefits
            </button>
            <Link 
              to="/products?category=Recipes"
              className="nav-link-hover py-1 transition-colors hover:text-maroon"
            >
              Recipes
            </Link>
            <Link 
              to="/contact"
              className={`nav-link-hover py-1 transition-colors hover:text-maroon ${
                isActive('/contact') ? 'text-maroon font-black relative' : ''
              }`}
            >
              Contact Us
            </Link>
            
            {/* Bulk Order gold pill button */}
            <Link 
              to="/products?category=Bulk Orders"
              className="bg-gold hover:bg-gold-hover text-white font-extrabold px-5 py-2 rounded-full shadow-sm hover:shadow-gold-glow hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-widest text-[10px] border border-gold-dark/20"
            >
              Bulk Order
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Dropdown Menu (Full-width absolute dropdown, white bg, p-4, close on click) */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full bg-white border-t border-maroon/10 border-b-[0.5px] border-maroon/10 animate-slide-up p-4 space-y-4 shadow-blush-lg absolute left-0 right-0 top-16 z-[99]">
            <div className="flex flex-col gap-1 text-sm font-bold uppercase tracking-wider text-darkbrown/80">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-maroon/5 hover:text-maroon transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-maroon/5 hover:text-maroon transition-colors"
              >
                Products
              </Link>
              <button 
                onClick={() => {
                  handleNavClick('/', 'benefits');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 border-b border-maroon/5 hover:text-maroon text-left uppercase font-bold w-full"
              >
                Benefits
              </button>
              <Link 
                to="/products?category=Recipes" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-maroon/5 hover:text-maroon transition-colors"
              >
                Recipes
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-maroon/5 hover:text-maroon transition-colors"
              >
                Contact Us
              </Link>
              
              <Link 
                to="/products?category=Bulk Orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-gold hover:bg-gold-hover text-white font-extrabold py-3 rounded-xl text-center shadow-sm transition-all duration-300 uppercase tracking-widest text-xs mt-3 block"
              >
                Bulk Order
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Sticky header spacer to prevent page jumping */}
      {isSticky && <div className="h-16 md:h-[128px]" />}

      {/* Real-time search overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Header;
