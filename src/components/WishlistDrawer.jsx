import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistDrawer = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isWishlistOpen]);

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id); // Remove from wishlist when added to cart, a typical premium experience
  };

  const handleShopNow = () => {
    setIsWishlistOpen(false);
    navigate('/products');
  };

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-darkbrown/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-cream shadow-blush-lg flex flex-col z-10 animate-slide-in-right">
        {/* Header */}
        <div className="p-5 border-b border-maroon/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-maroon fill-maroon" />
            <h2 className="text-xl font-bold font-heading text-maroon">My Wishlist</h2>
            <span className="text-xs bg-gold text-white font-extrabold px-2.5 py-0.5 rounded-full ml-1">{wishlistItems.length}</span>
          </div>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-maroon hover:bg-blush rounded-full transition-colors border border-maroon/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistItems.length === 0 ? (
            /* EMPTY WISHLIST */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-20 h-20 bg-blush rounded-full flex items-center justify-center text-maroon animate-pulse-subtle border border-maroon/10 shadow-blush-sm">
                <Heart className="w-9 h-9 text-maroon/50" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-maroon">Your wishlist is empty</h3>
                <p className="text-sm text-darkbrown/50 mt-1 max-w-xs mx-auto font-medium">Browse our exclusive collections and save your favorite items for later.</p>
              </div>
              <button
                onClick={handleShopNow}
                className="bg-maroon hover:bg-maroon-hover text-white text-xs font-bold px-6 py-3 rounded-full border border-gold hover:shadow-gold-glow transition-all duration-300 uppercase tracking-widest"
              >
                Discover Superfoods
              </button>
            </div>
          ) : (
            /* WISHLIST ITEMS */
            wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-4 p-3 bg-white rounded-2xl border border-maroon/5 shadow-blush-sm items-center relative overflow-hidden group hover:border-maroon/10 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream flex-shrink-0 border border-maroon/5">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-12">
                  <h4 className="text-sm font-bold text-darkbrown truncate">{item.name}</h4>
                  <span className="text-xs text-gold uppercase tracking-wider font-extrabold">{item.category}</span>
                  <div className="text-sm font-extrabold text-maroon mt-1">₹{item.price}</div>
                  
                  {/* Quick Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 text-xs font-bold text-maroon hover:text-gold flex items-center gap-1.5 transition-colors border border-maroon/20 hover:border-gold px-3 py-1.5 rounded-full bg-cream/35 hover:bg-white"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute right-3 top-3 p-1.5 text-maroon/40 hover:text-maroon rounded-full hover:bg-red-50 transition-all duration-300"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
