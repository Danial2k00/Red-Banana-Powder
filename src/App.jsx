import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './admin/AdminAuthContext';
import { ProductsProvider } from './context/ProductsContext';
import AdminProtectedRoute from './admin/AdminProtectedRoute';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AuthModal from './components/AuthModal';

// Admin Layout & Pages
import AdminLayout from './admin/layout/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProducts from './admin/pages/AdminProducts';
import AdminOrders from './admin/pages/AdminOrders';
import AdminQueries from './admin/pages/AdminQueries';
import AdminReports from './admin/pages/AdminReports';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';

// Scroll to Top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Customer Layout Wrapper
const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-cream text-darkbrown font-body">
      {/* Sticky global header */}
      <Header />

      {/* Drawers and modals */}
      <CartDrawer />
      <WishlistDrawer />
      <AuthModal />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <ProductsProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
              
              {/* Scroll reset */}
              <ScrollToTop />

              <Routes>
                {/* Public Customer Site Routes wrapped in CustomerLayout */}
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Fallback route */}
                  <Route path="*" element={<Home />} />
                </Route>

                {/* Admin Area Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                <Route 
                  element={
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  }
                >
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/queries" element={<AdminQueries />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                </Route>
              </Routes>

              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </ProductsProvider>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;

