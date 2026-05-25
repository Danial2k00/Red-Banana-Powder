import React from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

const AdminTopBar = () => {
  const location = useLocation();

  // Get human-friendly page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('products')) return 'Inventory & Products';
    if (path.includes('orders')) return 'Order Operations';
    if (path.includes('queries')) return 'Customer Queries';
    if (path.includes('reports')) return 'Business Reports';
    return 'Admin Control Panel';
  };

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <header className="h-16 bg-[#FFFDFB] border-b border-blush-dark/30 px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Dynamic Title */}
      <div>
        <h1 className="font-heading text-lg font-bold text-darkbrown tracking-wide">
          {getPageTitle()}
        </h1>
      </div>

      {/* Admin Meta & Date Info */}
      <div className="flex items-center gap-6">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 text-[13px] text-darkbrown-light/75 bg-blush px-3.5 py-1.5 rounded-full border border-blush-dark/40 font-medium">
          <Calendar className="w-3.5 h-3.5 text-maroon" />
          <span>{getFormattedDate()}</span>
        </div>

        {/* User Greeting */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-maroon flex items-center justify-center text-white shadow-md shadow-maroon/20">
            <User className="w-4 h-4" />
          </div>
          <div className="text-right">
            <p className="text-[13px] font-bold text-darkbrown leading-tight">Welcome, Admin</p>
            <p className="text-[10px] font-medium text-gold leading-none">System Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
