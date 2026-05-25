import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  BarChart2, 
  LogOut 
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';

const AdminSidebar = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Customer Queries', path: '/admin/queries', icon: MessageSquare },
    { name: 'Reports', path: '/admin/reports', icon: BarChart2 },
  ];

  return (
    <aside className="w-[220px] fixed top-0 left-0 bottom-0 bg-[#7B1C2E] flex flex-col z-30 shadow-xl border-r border-[#58111E]">
      {/* Sidebar Header Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#58111E]">
        <div className="flex items-center gap-2">
          {/* Decorative Gold Dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#C8992A] animate-pulse-subtle"></div>
          <span className="font-heading text-lg font-bold text-white tracking-wider">
            RBP Admin
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 space-y-1.5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 text-[13px] tracking-wide rounded-md transition-all duration-200 border-l-4 ${
                  isActive 
                    ? 'border-[#C8992A] bg-[#9E2C41]/30 text-white font-semibold shadow-inner' 
                    : 'border-transparent text-[#FFF8F5]/75 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Action */}
      <div className="p-4 border-t border-[#58111E]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-[13px] tracking-wide rounded-md text-[#FFF8F5]/75 hover:text-[#FFF8F5] hover:bg-red-900/40 border-l-4 border-transparent transition-all duration-200"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
