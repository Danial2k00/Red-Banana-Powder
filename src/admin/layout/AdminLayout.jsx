import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F5] text-darkbrown flex">
      {/* Fixed Left Sidebar */}
      <AdminSidebar />

      {/* Right-side Content Shell */}
      <div className="flex-1 pl-[220px] flex flex-col min-h-screen">
        {/* Sticky Topbar */}
        <AdminTopBar />

        {/* Dynamic Nested Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
