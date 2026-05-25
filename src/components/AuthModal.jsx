import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone, CheckCircle, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, login, signup, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup Form States
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');

  // Status indicators
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isAuthOpen) {
      document.body.style.overflow = 'hidden';
      setError('');
      setSuccess('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAuthOpen]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields.');
      return;
    }
    
    const res = login(loginEmail, loginPassword);
    if (res.success) {
      setSuccess('Logged in successfully!');
      setTimeout(() => {
        setIsAuthOpen(false);
      }, 800);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!signupName || !signupEmail || !signupPhone || !signupPassword || !signupConfirm) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match.');
      return;
    }
    
    const res = signup(signupName, signupEmail, signupPhone, signupPassword);
    if (res.success) {
      setSuccess('Account created and logged in!');
      setTimeout(() => {
        setIsAuthOpen(false);
      }, 800);
    }
  };

  if (!isAuthOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-darkbrown/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsAuthOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-cream shadow-blush-lg flex flex-col z-10 animate-slide-in-right">
        {/* Header */}
        <div className="p-5 border-b border-maroon/10 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold font-heading text-maroon flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-gold" />
            {user ? 'My Profile' : 'Access Account'}
          </h2>
          <button 
            onClick={() => setIsAuthOpen(false)}
            className="p-2 text-maroon hover:bg-blush rounded-full transition-colors border border-maroon/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User is already logged in */}
        {user ? (
          <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="text-center py-6 bg-white rounded-2xl border border-maroon/5 shadow-blush-sm">
                <div className="w-20 h-20 bg-blush border-2 border-gold rounded-full flex items-center justify-center mx-auto text-maroon font-bold text-3xl mb-3 shadow-blush-md">
                  {user.name[0]}
                </div>
                <h3 className="text-lg font-bold font-heading text-maroon">{user.name}</h3>
                <p className="text-sm text-darkbrown/60">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl border border-maroon/5 text-sm">
                  <span className="font-semibold text-darkbrown/60">Phone Number</span>
                  <span className="font-bold text-darkbrown">{user.phone || 'Not provided'}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl border border-maroon/5 text-sm">
                  <span className="font-semibold text-darkbrown/60">Preferred Shipping</span>
                  <span className="font-bold text-darkbrown">Standard (Free)</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl border border-maroon/5 text-sm">
                  <span className="font-semibold text-darkbrown/60">Membership Level</span>
                  <span className="font-bold text-gold flex items-center gap-1">Gold Club ★</span>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full bg-maroon hover:bg-maroon-hover text-white font-bold py-3.5 rounded-xl border border-gold hover:border-gold hover:shadow-gold-glow transition-all duration-300 tracking-wider text-sm mt-8 uppercase"
            >
              Sign Out Session
            </button>
          </div>
        ) : (
          // Tabs and Auth Form
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Tabs */}
            <div className="flex border-b border-maroon/10 bg-white">
              <button
                onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
                className={`flex-1 py-4 text-center font-heading font-semibold text-sm transition-all duration-300 relative border-b-2 ${
                  activeTab === 'login' 
                    ? 'text-maroon border-maroon bg-cream/40' 
                    : 'text-darkbrown/40 border-transparent hover:text-maroon/70'
                }`}
              >
                Existing User (Login)
              </button>
              <button
                onClick={() => { setActiveTab('signup'); setError(''); setSuccess(''); }}
                className={`flex-1 py-4 text-center font-heading font-semibold text-sm transition-all duration-300 relative border-b-2 ${
                  activeTab === 'signup' 
                    ? 'text-maroon border-maroon bg-cream/40' 
                    : 'text-darkbrown/40 border-transparent hover:text-maroon/70'
                }`}
              >
                New User (Sign Up)
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
                    <X className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{success}</span>
                  </div>
                )}

                {activeTab === 'login' ? (
                  /* LOGIN FORM */
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Email Address</label>
                      <div className="flex items-center gap-2 bg-white border border-maroon/15 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold/30 focus-within:border-gold transition-all duration-300">
                        <Mail className="w-4 h-4 text-maroon/50" />
                        <input
                          type="email"
                          placeholder="e.g. nutrition@redbanana.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm text-darkbrown"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Password</label>
                        <a href="#forgot" className="text-xs text-gold hover:text-gold-hover font-bold hover:underline transition-colors">Forgot Password?</a>
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-maroon/15 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gold/30 focus-within:border-gold transition-all duration-300">
                        <Lock className="w-4 h-4 text-maroon/50" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm text-darkbrown"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-maroon hover:bg-maroon-hover text-white font-bold py-3.5 rounded-xl border border-gold hover:shadow-gold-glow transition-all duration-300 uppercase tracking-wider text-xs mt-6"
                    >
                      Authenticate Session
                    </button>
                  </form>
                ) : (
                  /* SIGNUP FORM */
                  <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Full Name</label>
                      <div className="flex items-center gap-2 bg-white border border-maroon/15 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gold/30 focus-within:border-gold transition-all duration-300">
                        <User className="w-4 h-4 text-maroon/50" />
                        <input
                          type="text"
                          placeholder="e.g. Clara Holmes"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm text-darkbrown"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Email Address</label>
                      <div className="flex items-center gap-2 bg-white border border-maroon/15 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gold/30 focus-within:border-gold transition-all duration-300">
                        <Mail className="w-4 h-4 text-maroon/50" />
                        <input
                          type="email"
                          placeholder="e.g. nutrition@redbanana.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm text-darkbrown"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Phone Number</label>
                      <div className="flex items-center gap-2 bg-white border border-maroon/15 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gold/30 focus-within:border-gold transition-all duration-300">
                        <Phone className="w-4 h-4 text-maroon/50" />
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm text-darkbrown"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Create Password</label>
                      <div className="flex items-center gap-2 bg-white border border-maroon/15 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gold/30 focus-within:border-gold transition-all duration-300">
                        <Lock className="w-4 h-4 text-maroon/50" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm text-darkbrown"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Confirm Password</label>
                      <div className="flex items-center gap-2 bg-white border border-maroon/15 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gold/30 focus-within:border-gold transition-all duration-300">
                        <Lock className="w-4 h-4 text-maroon/50" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={signupConfirm}
                          onChange={(e) => setSignupConfirm(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm text-darkbrown"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-maroon hover:bg-maroon-hover text-white font-bold py-3.5 rounded-xl border border-gold hover:shadow-gold-glow transition-all duration-300 uppercase tracking-wider text-xs mt-6"
                    >
                      Register Account
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 text-center text-xs text-darkbrown/40 border-t border-maroon/5 pt-4 font-semibold leading-relaxed">
                By accessing your account, you agree to our 
                <br />
                <a href="#terms" className="text-maroon hover:underline">Terms of Service</a> &amp; <a href="#privacy" className="text-maroon hover:underline">Privacy Policy</a>.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
