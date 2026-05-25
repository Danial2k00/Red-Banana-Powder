import React, { useState } from 'react';
import { categories } from '../../data/products';
import { useProducts } from '../../context/ProductsContext';
import { 
  Search, 
  Plus, 
  Star, 
  Edit, 
  Trash2, 
  X, 
  ImagePlus, 
  Image as ImageIcon 
} from 'lucide-react';

const AdminProducts = () => {
  const { products: productList, addProduct, updateProduct, deleteProduct, isLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [showAddDrawer, setShowAddDrawer] = useState(false);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Form states for adding/editing product
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Raw Powder');
  const [newBadge, setNewBadge] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [stock, setStock] = useState('50');
  const [status, setStatus] = useState(true);

  // File Upload base64 Conversion
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    setNewName(product.name);
    setNewPrice(product.price.toString());
    setNewCategory(product.category);
    setNewBadge(product.badge || '');
    setImage(product.image || null);
    setDescription(product.description || '');
    setDiscount(product.discount || '');
    setStock(product.stock || '50');
    setStatus(product.status !== undefined ? product.status : true);
    setShowAddDrawer(true);
  };

  const closeDrawer = () => {
    setShowAddDrawer(false);
    setIsEditing(false);
    setEditingProductId(null);
    setNewName('');
    setNewPrice('');
    setNewCategory('Raw Powder');
    setNewBadge('');
    setImage(null);
    setDescription('');
    setDiscount('');
    setStock('50');
    setStatus(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    if (isEditing) {
      // Edit Mode Save
      const currentProduct = productList.find(p => p.id === editingProductId) || {};
      updateProduct(editingProductId, {
        ...currentProduct,
        name: newName,
        price: Number(newPrice),
        category: newCategory,
        badge: newBadge || '',
        image: image || 'https://placehold.co/600x600/7B1C2E/FFF8F5?text=Product',
        description,
        discount,
        stock,
        status
      });
    } else {
      // Add Mode Save
      const newProduct = {
        name: newName,
        price: Number(newPrice),
        category: newCategory,
        rating: 5.0,
        reviewsCount: 1,
        image: image || 'https://placehold.co/600x600/7B1C2E/FFF8F5?text=Product',
        badge: newBadge || 'New Arrival',
        benefits: ['100% Organic', 'Nutritious'],
        description,
        discount,
        stock,
        status
      };

      addProduct(newProduct);
    }

    closeDrawer();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to remove this product from inventory?')) {
      deleteProduct(id);
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
          onClick={() => {
            setIsEditing(false);
            setShowAddDrawer(true);
          }}
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
                <th className="py-4 px-6 w-16 text-center">Image</th>
                <th className="py-4 px-6">Product Details</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4 text-center">Rating</th>
                <th className="py-4 px-4 text-right">Price</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-dark/10">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-4 border-maroon/20 border-t-maroon rounded-full animate-spin"></div>
                      <p className="text-xs font-bold text-darkbrown-light/60">Fetching inventory from Firebase...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-sm font-semibold text-darkbrown-light/50">
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="text-xs text-darkbrown hover:bg-blush/25 transition-colors duration-150 group">
                    {/* Image Thumbnail Column */}
                    <td className="py-3 px-6 text-center w-16">
                      {product.image ? (
                        <div className="w-12 h-12 rounded-[6px] border border-blush-dark/45 overflow-hidden shrink-0 flex items-center justify-center bg-blush shadow-inner">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350" 
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-[6px] bg-blush border border-blush-dark/45 flex items-center justify-center text-darkbrown-light/40 shrink-0 shadow-inner">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    
                    {/* Product Metadata Column */}
                    <td className="py-3 px-6">
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
                        <button 
                          onClick={() => handleEditClick(product)}
                          className="p-2 text-darkbrown-light/70 hover:text-maroon bg-blush/40 hover:bg-maroon/5 rounded-lg transition-all border border-transparent hover:border-maroon/10"
                        >
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

      {/* Slide-out Add/Edit Product Panel (Drawer) */}
      {showAddDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-darkbrown/40 backdrop-blur-sm transition-all duration-300">
          {/* Backdrop Dismiss Button */}
          <div className="absolute inset-0" onClick={closeDrawer}></div>
          
          <div className="relative w-full max-w-md bg-[#FFFDFB] h-full shadow-2xl border-l border-blush-dark/40 flex flex-col z-10 animate-slide-in-right">
            
            {/* Header: align title left, subtitle below, close button top-right */}
            <div className="p-6 border-b border-blush-dark/35 flex justify-between items-start bg-blush/20">
              <div>
                <h3 className="font-heading text-lg font-bold text-darkbrown">
                  {isEditing ? 'Edit Product' : 'Add New Product'}
                </h3>
                <p className="text-xs text-darkbrown-light/60 mt-0.5">
                  {isEditing ? 'Modify product details in your catalogue' : 'Create a new item in your inventory catalogue'}
                </p>
              </div>
              <button 
                type="button"
                onClick={closeDrawer}
                className="p-1.5 rounded-lg border border-blush-dark hover:bg-blush text-darkbrown-light transition-all shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form: flex layout with gap:20px */}
            <form onSubmit={handleSaveProduct} className="flex-1 p-6 flex flex-col gap-5 overflow-y-auto">
              
              {/* --- GROUP 1: IMAGE UPLOAD --- */}
              <div className="space-y-1.5 pb-2 border-b border-blush-dark/20">
                <label className="text-[13px] font-medium text-darkbrown-light/75 block">Product image</label>
                
                {image ? (
                  /* Image Preview Mode */
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-blush-dark/50 shadow-sm">
                    <img 
                      src={image} 
                      alt="Upload Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#7B1C2E] hover:bg-[#9E2C41] text-white flex items-center justify-center transition-colors shadow-md text-xs font-bold"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  /* Dashed Upload Box UI */
                  <label className="w-full h-40 border-2 border-dashed border-[#C8992A] rounded-xl bg-[#FFF8F5] flex flex-col items-center justify-center cursor-pointer hover:bg-blush/50 transition-colors p-4 relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                    <ImagePlus className="w-8 h-8 text-[#7B1C2E] group-hover:scale-105 transition-transform duration-200" />
                    <span className="text-xs font-bold text-darkbrown mt-2">Click to upload or drag & drop</span>
                    <span className="text-[13px] text-darkbrown-light/60 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
                  </label>
                )}
              </div>

              {/* --- GROUP 2: BASIC INFO --- */}
              <div className="flex flex-col gap-5 pb-2 border-b border-blush-dark/20">
                {/* Product Name */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-darkbrown-light/75 block">Product name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Red Banana powder 750g"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-lg text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-darkbrown-light/75 block">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-lg text-darkbrown text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  >
                    {categories.filter(c => c !== 'All Products').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-darkbrown-light/75 block">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Describe product nutritional values, organic status..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-lg text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all resize-none"
                  />
                </div>

                {/* Optional Badge */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-darkbrown-light/75 block">Badge (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Special Offer, Bestseller"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-lg text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  />
                </div>
              </div>

              {/* --- GROUP 3: PRICING & STOCK --- */}
              <div className="flex flex-col gap-5">
                {/* Price and Discount side-by-side in grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-darkbrown-light/75 block">Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 649"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-lg text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-darkbrown-light/75 block">Discount (%)</label>
                    <input
                      type="number"
                      placeholder="e.g. 10"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-lg text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                    />
                  </div>
                </div>

                {/* Stock and Status Toggle side-by-side in grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-darkbrown-light/75 block">Stock quantity</label>
                    <input
                      type="number"
                      placeholder="e.g. 100"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFF8F5] border border-blush-dark/60 rounded-lg text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 flex flex-col justify-between">
                    <label className="text-[13px] font-medium text-darkbrown-light/75 block">Status</label>
                    <button
                      type="button"
                      onClick={() => setStatus(!status)}
                      className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs border tracking-wide uppercase transition-all duration-300 ${
                        status 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/50' 
                          : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100/50'
                      }`}
                    >
                      {status ? 'Active' : 'Draft'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Stacked Save and Cancel buttons */}
              <div className="pt-6 border-t border-blush-dark/20 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full h-11 bg-[#7B1C2E] hover:bg-[#9E2C41] text-white font-bold text-xs tracking-wide rounded-xl shadow-lg shadow-maroon/25 transition-all active:scale-[0.98]"
                >
                  {isEditing ? 'Save Changes' : 'Save Product'}
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="w-full h-10 border border-blush-dark hover:bg-blush font-bold text-xs tracking-wide rounded-xl text-darkbrown transition-all"
                >
                  Cancel
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
