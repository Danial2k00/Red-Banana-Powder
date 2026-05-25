import React from 'react';
import { 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Truck 
} from 'lucide-react';
import { products } from '../../data/products';

const AdminDashboard = () => {
  // Stat data
  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      bgColor: 'bg-maroon/10',
      textColor: 'text-maroon',
      description: 'Active inventory items',
    },
    {
      title: 'Total Orders',
      value: '48',
      icon: ShoppingBag,
      bgColor: 'bg-gold/10',
      textColor: 'text-gold',
      description: '+12% increase this week',
    },
    {
      title: 'Pending Queries',
      value: '3',
      icon: MessageSquare,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-600',
      description: 'Require immediate response',
    },
    {
      title: 'Total Revenue',
      value: '₹54,240',
      icon: TrendingUp,
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-600',
      description: 'Monthly calculated revenue',
    },
  ];

  // Recent Orders Data
  const recentOrders = [
    { id: 'RBP-8942', customer: 'Aravind Sharma', product: 'Red Banana Powder 250g', amount: '₹449', status: 'Delivered', date: 'Today, 11:32 AM' },
    { id: 'RBP-8941', customer: 'Priya Patel', product: 'Red Banana Capsules (60 caps)', amount: '₹349', status: 'Shipped', date: 'Today, 09:15 AM' },
    { id: 'RBP-8940', customer: 'Rohan Das', product: 'Premium Gift Pack', amount: '₹999', status: 'Processing', date: 'Yesterday' },
    { id: 'RBP-8939', customer: 'Kiran Rao', product: 'Bulk Red Banana Powder 1kg', amount: '₹1,299', status: 'Delivered', date: 'Yesterday' },
    { id: 'RBP-8938', customer: 'Meera Nair', product: 'Smoothie Mix 200g', amount: '₹249', status: 'Delivered', date: 'May 23, 2026' },
  ];

  // Recent Queries Data
  const recentQueries = [
    { name: 'Vikram Sen', email: 'vikram.sen@gmail.com', preview: 'Is this safe to feed to a 10-month-old infant? Looking for organic weaning...', date: 'May 24, 2026' },
    { name: 'Ananya Iyer', email: 'ananya.iyer@outlook.com', preview: 'Interested in distribution opportunities in Bangalore. Who should I contact for...', date: 'May 23, 2026' },
    { name: 'Kabir Mehta', email: 'kabir.m@yahoo.com', preview: 'Loved the organic capsules! Are you planning to launch a larger 120-capsule option...', date: 'May 22, 2026' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle2 className="w-3 h-3" />
            <span>Delivered</span>
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            <Truck className="w-3 h-3" />
            <span>Shipped</span>
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-100">
            <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Processing</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-50 text-gray-700 border border-gray-100">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="bg-[#FFFDFB] p-6 rounded-2xl border border-blush-dark/40 shadow-blush-sm hover:shadow-blush-normal hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[12px] font-bold text-darkbrown-light/60 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-heading font-extrabold text-darkbrown mt-2 tracking-tight group-hover:text-maroon transition-colors duration-300">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.textColor} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[11px] text-darkbrown-light/75 font-medium mt-4 flex items-center gap-1">
                <span>{stat.description}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Tables Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Section */}
        <div className="lg:col-span-2 bg-[#FFFDFB] rounded-2xl border border-blush-dark/40 shadow-blush-normal p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-blush-dark/30">
            <div>
              <h2 className="font-heading text-lg font-bold text-darkbrown">Recent Orders</h2>
              <p className="text-xs text-darkbrown-light/60 mt-0.5">Real-time listing of incoming customer requests</p>
            </div>
            <button className="text-xs font-bold text-maroon hover:text-maroon-hover hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-blush-dark/20 text-[11px] uppercase tracking-wider font-bold text-darkbrown-light/70">
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Product</th>
                  <th className="py-3 px-2 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush-dark/10">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="text-xs text-darkbrown hover:bg-blush/40 transition-colors duration-150">
                    <td className="py-3 px-2 font-bold text-maroon">{order.id}</td>
                    <td className="py-3 px-2 font-semibold">{order.customer}</td>
                    <td className="py-3 px-2 text-darkbrown-light/95 max-w-[180px] truncate">{order.product}</td>
                    <td className="py-3 px-2 text-right font-bold text-darkbrown">{order.amount}</td>
                    <td className="py-3 px-4 text-center">{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Queries Section */}
        <div className="bg-[#FFFDFB] rounded-2xl border border-blush-dark/40 shadow-blush-normal p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-blush-dark/30">
            <div>
              <h2 className="font-heading text-lg font-bold text-darkbrown">Pending Queries</h2>
              <p className="text-xs text-darkbrown-light/60 mt-0.5">Customer feedback and tickets</p>
            </div>
            <button className="text-xs font-bold text-maroon hover:text-maroon-hover hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-4 divide-y divide-blush-dark/10">
            {recentQueries.map((query, index) => (
              <div key={index} className={`pt-4 first:pt-0 space-y-2 group cursor-pointer`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-darkbrown group-hover:text-maroon transition-colors duration-200">
                      {query.name}
                    </h4>
                    <p className="text-[10px] text-darkbrown-light/50">{query.email}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-gold bg-gold/5 px-2 py-0.5 rounded border border-gold/15">
                    {query.date}
                  </span>
                </div>
                <p className="text-[11px] text-darkbrown-light/80 leading-relaxed italic bg-[#FFF8F5] p-3 rounded-lg border border-blush-dark/40 group-hover:border-maroon/20 transition-colors duration-200">
                  "{query.preview}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
