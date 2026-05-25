import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, X, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States for filters
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [maxPrice, setMaxPrice] = useState(1300);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  
  // Mobile filter drawer state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All Products');
    }

    if (searchParam) {
      // If there is a direct search highlight or filter, let's keep all, but we can do extra checks if we want
    }
  }, [searchParams]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('All Products');
    setMaxPrice(1300);
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let result = [...products];

    // 1. Search Query filter (from search overlay redirect)
    const searchId = searchParams.get('search');
    if (searchId) {
      result = result.filter((p) => p.id === searchId);
    }

    // 2. Category Filter
    if (selectedCategory !== 'All Products') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 3. Price Filter
    result = result.filter((p) => p.price <= maxPrice);

    // 4. Rating Filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // 5. Client-Side Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in space-y-8 bg-floral-pattern min-h-[80vh]">
      
      {/* Page Heading */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-gold uppercase tracking-[0.25em]">Organic Sourced Catalog</span>
        <h1 className="text-3.5xl font-black font-heading text-maroon">Our Premium Superfoods</h1>
        <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
      </div>

      {/* Sorting & Filter Header Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-maroon/5 shadow-blush-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-cream hover:bg-blush border border-maroon/15 px-4 py-2 rounded-xl text-xs font-black text-maroon transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <span className="text-xs font-bold text-darkbrown/60">
            Showing <strong className="text-maroon font-black">{filteredProducts.length}</strong> delicious superfoods
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <ArrowUpDown className="w-4 h-4 text-gold" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-cream border border-maroon/15 hover:border-gold rounded-xl px-3 py-2 text-xs font-bold text-darkbrown outline-none focus:ring-2 focus:ring-gold/30 transition-all cursor-pointer"
          >
            <option value="featured">Featured / Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated ★</option>
          </select>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Filters (Hidden on Mobile, Visible on Desktop) */}
        <aside className="hidden lg:block bg-white rounded-3xl p-6 border border-maroon/5 shadow-blush-sm space-y-8 sticky top-28">
          <div className="flex justify-between items-center pb-4 border-b border-maroon/5">
            <h3 className="font-heading font-black text-maroon text-base uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-4.5 h-4.5 text-gold" />
              Refine Sourcing
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[10px] text-gold hover:text-maroon font-extrabold flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              <RefreshCw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          {/* Filter 1: Category */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-darkbrown/80 uppercase tracking-widest">Collection Type</h4>
            <div className="space-y-2">
              {categories.map((cat, idx) => (
                <label 
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-darkbrown/70 font-semibold cursor-pointer group hover:text-maroon transition-colors"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => {
                      setSelectedCategory(cat);
                      setSearchParams(cat === 'All Products' ? {} : { category: cat });
                    }}
                    className="w-3.5 h-3.5 accent-maroon cursor-pointer"
                  />
                  <span className={selectedCategory === cat ? 'text-maroon font-bold' : ''}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 2: Price range */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-black text-darkbrown/80 uppercase tracking-widest">Max Budget Price</h4>
              <span className="font-extrabold text-maroon bg-blush px-2 py-0.5 rounded">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="199"
              max="1300"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-maroon cursor-ew-resize bg-blush h-1 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-darkbrown/40 font-bold">
              <span>₹199</span>
              <span>₹1,300</span>
            </div>
          </div>

          {/* Filter 3: Minimum Rating */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-black text-darkbrown/80 uppercase tracking-widest">Quality Rating</h4>
            <div className="space-y-2">
              {[0, 4.6, 4.8, 4.9].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-2.5 text-xs text-darkbrown/70 font-semibold cursor-pointer hover:text-maroon transition-colors"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                    className="w-3.5 h-3.5 accent-maroon cursor-pointer"
                  />
                  <span>
                    {rating === 0 ? 'All Ratings' : `${rating} ★ & Above`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Content Area: Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 border border-maroon/5 shadow-blush-sm text-center space-y-4 max-w-xl mx-auto mt-8">
              <div className="w-16 h-16 bg-blush text-maroon rounded-full flex items-center justify-center mx-auto text-xl font-bold border border-maroon/10">!</div>
              <h3 className="text-lg font-bold font-heading text-maroon">No matching superfoods found</h3>
              <p className="text-sm text-darkbrown/50">Try broadening your pricing budget, lowering rating filters, or looking into our raw powders.</p>
              <button
                onClick={handleResetFilters}
                className="bg-maroon hover:bg-maroon-hover text-white text-xs font-bold px-6 py-3 rounded-full border border-gold hover:shadow-gold-glow transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Collapsible Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden flex justify-start">
          <div 
            className="absolute inset-0 bg-darkbrown/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsMobileFiltersOpen(false)}
          />

          <div className="relative w-full max-w-xs h-full bg-cream shadow-blush-lg p-5 z-10 flex flex-col justify-between animate-slide-in-right">
            <div className="space-y-6 overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-maroon/10">
                <h3 className="font-heading font-black text-maroon text-base uppercase tracking-wider">Refine Search</h3>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-blush text-maroon border border-maroon/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter 1: Category */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black text-darkbrown/80 uppercase tracking-widest">Collections</h4>
                <div className="space-y-2">
                  {categories.map((cat, idx) => (
                    <label 
                      key={idx}
                      className="flex items-center gap-2 text-xs text-darkbrown/70 font-semibold cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mobile-category"
                        checked={selectedCategory === cat}
                        onChange={() => {
                          setSelectedCategory(cat);
                          setSearchParams(cat === 'All Products' ? {} : { category: cat });
                        }}
                        className="w-3.5 h-3.5 accent-maroon"
                      />
                      <span className={selectedCategory === cat ? 'text-maroon font-bold' : ''}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Filter 2: Price */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <h4 className="font-black text-darkbrown/80 uppercase tracking-widest">Max Budget</h4>
                  <span className="font-extrabold text-maroon">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="199"
                  max="1300"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-maroon"
                />
              </div>

              {/* Mobile Filter 3: Rating */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black text-darkbrown/80 uppercase tracking-widest">Ratings</h4>
                <div className="space-y-2">
                  {[0, 4.6, 4.8, 4.9].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 text-xs text-darkbrown/70 font-semibold cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mobile-rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-3.5 h-3.5 accent-maroon"
                      />
                      <span>
                        {rating === 0 ? 'All Ratings' : `${rating} ★ & Above`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-maroon/10 flex gap-2">
              <button
                onClick={() => { handleResetFilters(); setIsMobileFiltersOpen(false); }}
                className="flex-1 bg-cream hover:bg-blush border border-maroon/20 py-2.5 rounded-xl text-xs font-black text-maroon transition-all uppercase tracking-wider"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 bg-maroon text-white py-2.5 rounded-xl text-xs font-bold border border-gold hover:shadow-gold-glow transition-all uppercase tracking-wider"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
