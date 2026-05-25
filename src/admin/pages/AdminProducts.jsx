import React, { useState } from 'react';
import { products, categories } from '../../data/products';
import { Search, Plus, Star, Edit, Trash2, Filter, X } from 'lucide-react';

const AdminProducts = () => {
  const [productList, setProductList] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [showAddDrawer, setShowAddDrawer] = useState(false);

  // Form states for adding product
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Raw Powder');
  const [newBadge, setNewBadge] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    const newProduct = {
      id: `rbp-${Date.now().toString().slice(-4)}`,
      name: newName,
      price: Number(newPrice),
      category: newCategory,
      rating: 5.0,
      reviewsCount: 1,
      image: `https://placehold.co/600x600/7B1C2E/FFF8F5?text=${encodeURIComponent(newName)}`,
      badge: newBadge || 'New Arrival',
      benefits: ['100% Organic', 'Nutritious']
    };

    setProductList([newProduct, ...productList]);
    setShowAddDrawer(false);
    
    // Reset Form
    setNewName('');
    setNewPrice('');
    setNewCategory('Raw Powder');
    setNewBadge('');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to remove this product from inventory?')) {
      setProductList(productList.filter(p => p.id !== id));
    }
  };

  // Filter logic
  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 relative animate-fade-in">
      
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-darkbrown-light/60">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search by ID or product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FFFDFB] border border-blush-dark/60 rounded-xl text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all shadow-sm"
          />
        </div>

        {/* Add Product Button */}
        <button
          onClick={() => setShowAddDrawer(true)}
          className="bg-[#7B1C2E] hover:bg-[#9E2C41] text-white px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-lg shadow-maroon/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-full border transition-all whitespace-nowrap ${
              (cat === 'All Products' && selectedCategory === 'All Products') || cat === selectedCategory
                ? 'bg-[#C8992A] text-white border-[#C8992A] shadow-md shadow-gold/20'
                : 'bg-[#FFFDFB] text-darkbrown-light border-blush-dark/50 hover:bg-blush'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List Table */}
      <div className="bg-[#FFFDFB] rounded-2xl border border-blush-dark/40 shadow-blush-normal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-blush-dark/20 text-[11px] uppercase tracking-wider font-bold text-darkbrown-light/70 bg-blush/25">
                <th className="py-4 px-6">Product details</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4 text-center">Rating</th>
                <th className="py-4 px-4 text-right">Price</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-dark/10">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-sm font-semibold text-darkbrown-light/50">
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="text-xs text-darkbrown hover:bg-blush/25 transition-colors duration-150 group">
                    <td className="py-3 px-6 flex items-center gap-4">
                      {/* Image Thumbnail */}
                      <div className="w-12 h-12 rounded-lg bg-blush border border-blush-dark/45 overflow-hidden shrink-0 flex items-center justify-center">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-maroon block mb-0.5">{product.id}</span>
                        <span className="font-bold text-darkbrown block leading-tight">{product.name}</span>
                        {product.badge && (
                          <span className="inline-block text-[9px] font-bold bg-[#C8992A]/10 text-[#C8992A] border border-[#C8992A]/20 px-1.5 py-0.2 rounded mt-1">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-darkbrown-light/80">{product.category}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-bold px-2 py-1 rounded border border-amber-100">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-[10px] text-amber-700/60 font-medium">({product.reviewsCount})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-sm text-darkbrown">₹{product.price}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-darkbrown-light/70 hover:text-maroon bg-blush/40 hover:bg-maroon/5 rounded-lg transition-all border border-transparent hover:border-maroon/10">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-darkbrown-light/70 hover:text-red-600 bg-blush/40 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Add Product Panel (Drawer) */}
      {showAddDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-darkbrown/40 backdrop-blur-sm transition-all duration-300">
          {/* Backdrop Dismiss Button */}
          <div className="absolute inset-0" onClick={() => setShowAddDrawer(false)}></div>
          
          <div className="relative w-full max-w-md bg-[#FFFDFB] h-full shadow-2xl border-l border-blush-dark/40 flex flex-col z-10 animate-slide-in-right">
            {/* Header */}
            <div className="p-6 border-b border-blush-dark/35 flex justify-between items-center bg-blush/20">
              <div>
                <h3 className="font-heading text-lg font-bold text-darkbrown">Add New Product</h3>
                <p className="text-xs text-darkbrown-light/60">Create a new item in your inventory catalogue</p>
              </div>
              <button 
                onClick={() => setShowAddDrawer(false)}
                className="p-1.5 rounded-lg border border-blush-dark hover:bg-blush text-darkbrown-light transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddProduct} className="flex-1 p-6 space-y-5 overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-darkbrown uppercase tracking-wider block">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red Banana powder 750g"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-xl text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-darkbrown uppercase tracking-wider block">Price (INR)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 649"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-xl text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-darkbrown uppercase tracking-wider block">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-xl text-darkbrown text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                >
                  {categories.filter(c => c !== 'All Products').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-darkbrown uppercase tracking-wider block">Badge (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Special Offer, Bestseller"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-xl text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                />
              </div>

              <div className="pt-6 border-t border-blush-dark/20 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddDrawer(false)}
                  className="flex-1 py-3 border border-blush-dark/80 hover:bg-blush font-bold text-xs tracking-wide rounded-xl text-darkbrown transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#7B1C2E] hover:bg-[#9E2C41] text-white font-bold text-xs tracking-wide rounded-xl shadow-lg shadow-maroon/25 transition-all"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;
