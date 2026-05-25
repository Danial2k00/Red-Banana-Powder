import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../AdminAuthContext';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Artificial delay to make it feel premium & authentic
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F5] bg-floral-pattern flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-md animate-slide-up">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#7B1C2E] shadow-lg shadow-maroon/20 mb-4 border border-[#C8992A]/30">
            <span className="font-heading text-xl font-bold text-white tracking-wider">R</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-darkbrown tracking-wide">
            Red Banana Powder
          </h2>
          <p className="text-[12px] text-darkbrown-light/75 uppercase tracking-widest mt-1 font-semibold">
            Administrative Access
          </p>
        </div>

        {/* Card Panel */}
        <div className="bg-[#FFFDFB] rounded-2xl p-8 border border-blush-dark shadow-blush-heavy glass-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-darkbrown uppercase tracking-wider block">
                Admin Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-darkbrown-light/60">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rbp.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#FFF8F5] border border-blush-dark/60 rounded-xl text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-darkbrown uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-darkbrown-light/60">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#FFF8F5] border border-blush-dark/60 rounded-xl text-darkbrown placeholder-darkbrown-light/40 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg animate-pulse-subtle">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#7B1C2E] hover:bg-[#9E2C41] disabled:bg-maroon/65 text-[#FFF8F5] font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-maroon/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Login Securely</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-[11px] text-darkbrown-light/60">
            Protected administrative console. Authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
