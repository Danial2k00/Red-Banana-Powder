import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);

  // Helper to render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-gold fill-gold" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-gold fill-gold" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="group bg-white rounded-2xl border border-maroon/5 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-blush-md flex flex-col justify-between p-2.5 md:p-0">
      {/* Image container */}
      <div className="relative w-full h-[140px] md:h-auto md:aspect-square overflow-hidden bg-cream border-b border-maroon/5 rounded-xl md:rounded-none">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick Badges */}
        {product.badge && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-maroon text-white font-extrabold text-[8px] md:text-[10px] uppercase tracking-wider px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border border-gold shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 md:top-3 md:right-3 p-1.5 md:p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-maroon hover:scale-110 transition-all duration-300 border border-maroon/5"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
              isSaved ? 'fill-maroon text-maroon' : 'text-maroon/70'
            }`}
          />
        </button>
      </div>

      {/* Details */}
      <div className="p-1 md:p-4 mt-2 flex-1 flex flex-col justify-between space-y-2 md:space-y-3">
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-[10px] md:text-xs">
            <span className="font-extrabold text-gold uppercase tracking-widest leading-none">{product.category}</span>
            <div className="flex items-center gap-1 bg-blush px-1.5 py-0.5 rounded-full font-bold text-[9px] md:text-[10px] text-maroon max-w-fit">
              <span className="flex items-center">{renderStars(product.rating)}</span>
              <span className="text-darkbrown/60">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-[13px] md:text-sm font-extrabold text-darkbrown group-hover:text-maroon transition-colors line-clamp-1 leading-relaxed">
            {product.name}
          </h3>

          <p className="text-xs text-darkbrown/50 line-clamp-2 leading-relaxed hidden md:block">
            {product.shortDescription}
          </p>
        </div>

        <div className="space-y-2">
          {/* Price */}
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-[14px] md:text-base font-medium md:font-black text-maroon">₹{product.price}</span>
            <span className="text-[9px] md:text-[10px] text-darkbrown/40 font-bold line-through">₹{Math.floor(product.price * 1.25)}</span>
            <span className="text-[9px] md:text-[10px] text-green-600 font-bold">(20% OFF)</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-cream group-hover:bg-maroon border border-maroon/30 group-hover:border-gold text-maroon group-hover:text-white font-bold py-2 md:py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-gold-glow uppercase tracking-wider text-[12px] md:text-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
