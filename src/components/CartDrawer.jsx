import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartSubtotal, cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    alert('Thank you for your order! Checkout process initiated mock-ups.');
  };

  const handleShopNow = () => {
    setIsCartOpen(false);
    navigate('/products');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-darkbrown/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-cream shadow-blush-lg flex flex-col z-10 animate-slide-in-right">
        {/* Header */}
        <div className="p-5 border-b border-maroon/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-maroon" />
            <h2 className="text-xl font-bold font-heading text-maroon">Shopping Cart</h2>
            <span className="text-xs bg-gold text-white font-extrabold px-2.5 py-0.5 rounded-full ml-1">{cartCount}</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-maroon hover:bg-blush rounded-full transition-colors border border-maroon/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            /* EMPTY STATE */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-20 h-20 bg-blush rounded-full flex items-center justify-center text-maroon animate-pulse-subtle border border-maroon/10 shadow-blush-sm">
                <ShoppingBag className="w-9 h-9" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-maroon">Your cart feels a bit light!</h3>
                <p className="text-sm text-darkbrown/50 mt-1 max-w-xs mx-auto">Explore our raw red banana powders, capsules, and premium blends to kickstart your health.</p>
              </div>
              <button
                onClick={handleShopNow}
                className="bg-maroon hover:bg-maroon-hover text-white text-xs font-bold px-6 py-3 rounded-full border border-gold hover:shadow-gold-glow transition-all duration-300 uppercase tracking-widest"
              >
                Browse Superfoods
              </button>
            </div>
          ) : (
            /* CART LIST */
            cartItems.map((item) => (
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

                {/* Info and Actions */}
                <div className="flex-1 min-w-0 pr-6">
                  <h4 className="text-sm font-bold text-darkbrown truncate">{item.name}</h4>
                  <span className="text-xs text-gold uppercase tracking-wider font-extrabold">{item.category}</span>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-extrabold text-maroon">₹{item.price}</span>
                    
                    {/* Qty controller */}
                    <div className="flex items-center border border-maroon/15 rounded-full bg-cream">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2.5 text-maroon hover:bg-blush rounded-l-full transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-darkbrown px-2 min-w-[20px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2.5 text-maroon hover:bg-blush rounded-r-full transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute right-3 top-3 p-1.5 text-maroon/40 hover:text-maroon rounded-full hover:bg-red-50 transition-all duration-300"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-maroon/10 bg-white space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-darkbrown/60">Estimated Shipping</span>
                <span className="font-extrabold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-darkbrown">Subtotal Amount</span>
                <span className="text-lg font-black text-maroon">₹{cartSubtotal}</span>
              </div>
              <p className="text-[10px] text-darkbrown/40 font-semibold leading-relaxed">Tax, shipping, and promotional discounts will be calculated during the standard secure checkout.</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-maroon hover:bg-maroon-hover text-white font-bold py-4 rounded-xl border border-gold hover:border-gold hover:shadow-gold-glow flex items-center justify-center gap-2 group transition-all duration-300 uppercase tracking-widest text-xs"
            >
              Proceed to Secure Checkout
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
