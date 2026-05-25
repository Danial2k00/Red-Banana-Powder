import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      setResults([]);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Real-time filtering
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (overlayRef.current && !overlayRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleResultClick = (productId) => {
    onClose();
    // Navigate to products and pass category/product to highlight, or just scroll to product
    navigate(`/products?search=${encodeURIComponent(productId)}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-darkbrown/40 backdrop-blur-sm z-[999] flex flex-col justify-start pt-16 transition-opacity duration-300 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div 
        ref={overlayRef}
        className="w-full bg-cream border-b border-maroon/10 shadow-blush-lg px-4 md:px-8 py-6 animate-slide-up"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3 bg-white border border-maroon/20 rounded-full px-5 py-3 focus-within:ring-2 focus-within:ring-gold/50 focus-within:border-gold transition-all duration-300">
            <Search className="w-5 h-5 text-maroon/60" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Red Banana Powder, Capsules, Recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-darkbrown font-medium placeholder-darkbrown/40 text-lg"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="p-1 hover:bg-blush rounded-full text-maroon transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="flex items-center justify-center p-3 rounded-full hover:bg-blush text-maroon hover:rotate-90 transition-all duration-300 border border-maroon/15"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        {query && (
          <div className="max-w-6xl mx-auto mt-6 bg-white rounded-2xl border border-maroon/10 shadow-blush-md overflow-hidden max-h-[60vh] flex flex-col">
            <div className="px-6 py-3 bg-blush/40 border-b border-maroon/5 flex justify-between items-center text-sm font-semibold text-maroon">
              <span>Search Results ({results.length})</span>
              {results.length > 0 && <span className="text-gold">Showing match details</span>}
            </div>

            <div className="overflow-y-auto p-4 flex-1">
              {results.length === 0 ? (
                <div className="py-12 text-center text-darkbrown/50">
                  <p className="text-lg font-medium font-heading text-maroon">No matching superfoods found</p>
                  <p className="text-sm mt-1">Try search terms like '100g', 'capsules', 'smoothie' or 'bulk'</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleResultClick(product.id)}
                      className="group flex gap-4 p-3 rounded-xl border border-transparent hover:border-maroon/10 hover:bg-cream/40 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-maroon/5 bg-cream flex-shrink-0 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-gold uppercase tracking-wider">{product.category}</span>
                          <span className="text-xs font-semibold bg-blush text-maroon px-2 py-0.5 rounded-full">{product.badge}</span>
                        </div>
                        <h4 className="text-sm font-bold text-darkbrown truncate group-hover:text-maroon transition-colors mt-0.5">{product.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm font-extrabold text-maroon">₹{product.price}</span>
                          <span className="text-xs text-gold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                            View Product <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
