import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  Truck, 
  CheckCircle2, 
  Search, 
  Eye, 
  RefreshCcw, 
  Trash2,
  Calendar
} from 'lucide-react';

const AdminOrders = () => {
  // Master list of orders
  const [orders, setOrders] = useState([
    { id: 'RBP-8942', customer: 'Aravind Sharma', email: 'aravind@gmail.com', product: 'Red Banana Powder 250g', quantity: 1, amount: 449, status: 'Delivered', date: 'May 25, 2026', time: '11:32 AM' },
    { id: 'RBP-8941', customer: 'Priya Patel', email: 'priya.patel@yahoo.com', product: 'Red Banana Capsules (60 caps)', quantity: 1, amount: 349, status: 'Shipped', date: 'May 25, 2026', time: '09:15 AM' },
    { id: 'RBP-8940', customer: 'Rohan Das', email: 'rohan.das@gmail.com', product: 'Premium Gift Pack', quantity: 1, amount: 999, status: 'Processing', date: 'May 24, 2026', time: '04:50 PM' },
    { id: 'RBP-8939', customer: 'Kiran Rao', email: 'kiran.rao@outlook.com', product: 'Bulk Red Banana Powder 1kg', quantity: 1, amount: 1299, status: 'Delivered', date: 'May 24, 2026', time: '01:20 PM' },
    { id: 'RBP-8938', customer: 'Meera Nair', email: 'meera.nair@live.com', product: 'Smoothie Mix 200g', quantity: 2, amount: 498, status: 'Delivered', date: 'May 23, 2026', time: '10:05 AM' },
    { id: 'RBP-8937', customer: 'Vijay Kumar', email: 'vijay.k@gmail.com', product: 'Red Banana Powder 100g', quantity: 3, amount: 597, status: 'Shipped', date: 'May 22, 2026', time: '03:40 PM' },
    { id: 'RBP-8936', customer: 'Sita Ram', email: 'sita.ram@gmail.com', product: 'Red Banana Flour 500g', quantity: 1, amount: 299, status: 'Delivered', date: 'May 21, 2026', time: '06:12 PM' },
    { id: 'RBP-8935', customer: 'Deepak Raj', email: 'deepak.raj@outlook.com', product: 'Red Banana Powder 500g', quantity: 1, amount: 799, status: 'Processing', date: 'May 20, 2026', time: '11:15 AM' },
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Cycle through statuses for mock interactivity
  const cycleStatus = (id) => {
    setOrders(orders.map(order => {
      if (order.id === id) {
        let nextStatus = 'Processing';
        if (order.status === 'Processing') nextStatus = 'Shipped';
        else if (order.status === 'Shipped') nextStatus = 'Delivered';
        else if (order.status === 'Delivered') nextStatus = 'Processing';
        return { ...order, status: nextStatus };
      }
      return order;
    }));
  };

  const deleteOrder = (id) => {
    if (window.confirm(`Are you sure you want to cancel and remove Order ${id}?`)) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  // Metrics
  const totalCount = orders.length;
  const processingCount = orders.filter(o => o.status === 'Processing').length;
  const shippedCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  // Filter list
  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'All' || order.status === activeTab;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="w-3 h-3" />;
      case 'Shipped': return <Truck className="w-3 h-3" />;
      case 'Processing': return <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'All Orders', count: totalCount, icon: ShoppingBag, color: 'text-darkbrown bg-blush border-blush-dark/30' },
          { label: 'Pending / Processing', count: processingCount, icon: Clock, color: 'text-amber-700 bg-amber-50 border-amber-200/60' },
          { label: 'Dispatched / Shipped', count: shippedCount, icon: Truck, color: 'text-blue-700 bg-blue-50 border-blue-200/60' },
          { label: 'Completed / Delivered', count: deliveredCount, icon: CheckCircle2, color: 'text-emerald-700 bg-emerald-50 border-emerald-200/60' },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between bg-[#FFFDFB] ${m.color}`}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-75">{m.label}</p>
                <h4 className="text-xl font-heading font-extrabold mt-1">{m.count}</h4>
              </div>
              <div className="p-2 rounded-lg bg-white/60">
                <Icon className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Navigation Tabs */}
        <div className="flex bg-[#FFFDFB] p-1 rounded-xl border border-blush-dark/45 shadow-sm max-w-sm">
          {['All', 'Processing', 'Shipped', 'Delivered'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-[#7B1C2E] text-white shadow-sm shadow-maroon/25'
                  : 'text-darkbrown-light/75 hover:bg-blush/50 hover:text-darkbrown'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-darkbrown-light/60">
            <Search className="w-3.5 h-3.5" />
          </span>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#FFFDFB] border border-blush-dark/60 rounded-xl text-darkbrown placeholder-darkbrown-light/40 text-xs focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
          />
        </div>
      </div>

      {/* Main Order Table */}
      <div className="bg-[#FFFDFB] rounded-2xl border border-blush-dark/40 shadow-blush-normal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-blush-dark/20 text-[11px] uppercase tracking-wider font-bold text-darkbrown-light/70 bg-blush/25">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Product Details</th>
                <th className="py-4 px-4">Date & Time</th>
                <th className="py-4 px-4 text-right">Total</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-dark/10">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-sm font-semibold text-darkbrown-light/50">
                    No orders matching selected criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="text-xs text-darkbrown hover:bg-blush/25 transition-colors duration-150">
                    <td className="py-3 px-6 font-bold text-maroon">{order.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold">{order.customer}</div>
                      <div className="text-[10px] text-darkbrown-light/55 leading-none mt-0.5">{order.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold">{order.product}</span>
                      <span className="text-gold font-bold ml-1.5 bg-gold/5 border border-gold/15 px-1 py-0.2 rounded text-[10px]">
                        x{order.quantity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 font-semibold text-darkbrown-light/85">
                        <Calendar className="w-3 h-3 text-gold shrink-0" />
                        <span>{order.date}</span>
                      </div>
                      <div className="text-[10px] text-darkbrown-light/50 pl-4">{order.time}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-sm text-darkbrown">₹{order.amount}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-full border ${getStatusClasses(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Interactive Status Cycle Button */}
                        <button 
                          onClick={() => cycleStatus(order.id)}
                          title="Cycle Order Status (Processing -> Shipped -> Delivered)"
                          className="p-2 text-darkbrown-light/70 hover:text-[#C8992A] bg-blush/40 hover:bg-gold/5 rounded-lg border border-transparent hover:border-gold/15 transition-all"
                        >
                          <RefreshCcw className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-2 text-darkbrown-light/70 hover:text-maroon bg-blush/40 hover:bg-maroon/5 rounded-lg border border-transparent hover:border-maroon/10 transition-all">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => deleteOrder(order.id)}
                          className="p-2 text-darkbrown-light/70 hover:text-red-600 bg-blush/40 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
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

    </div>
  );
};

export default AdminOrders;
