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
        stars.push(<Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-3.5 h-3.5 text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-3.5 h-3.5 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="group bg-white rounded-2xl border border-maroon/5 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-blush-md flex flex-col justify-between">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-cream border-b border-maroon/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick Badges */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-maroon text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-maroon hover:scale-110 transition-all duration-300 border border-maroon/5"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-maroon text-maroon' : 'text-maroon/70'
            }`}
          />
        </button>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-gold uppercase tracking-widest">{product.category}</span>
            <div className="flex items-center gap-1 bg-blush px-2 py-0.5 rounded-full font-bold text-[10px] text-maroon">
              <span className="flex items-center">{renderStars(product.rating)}</span>
              <span className="text-darkbrown/60">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-sm font-extrabold text-darkbrown group-hover:text-maroon transition-colors line-clamp-1 leading-relaxed">
            {product.name}
          </h3>

          <p className="text-xs text-darkbrown/50 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="space-y-2">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-base font-black text-maroon">₹{product.price}</span>
            <span className="text-[10px] text-darkbrown/40 font-bold line-through">₹{Math.floor(product.price * 1.25)}</span>
            <span className="text-[10px] text-green-600 font-bold">(20% OFF)</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-cream group-hover:bg-maroon border border-maroon/30 group-hover:border-gold text-maroon group-hover:text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-gold-glow uppercase tracking-wider text-xs"
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
