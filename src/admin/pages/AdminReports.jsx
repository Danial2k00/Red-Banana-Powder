import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Percent, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Calendar
} from 'lucide-react';

const AdminReports = () => {
  // Key performance indicators
  const kpis = [
    { label: 'Monthly Sales Growth', value: '₹54,240', change: '+14.2%', isPositive: true, icon: DollarSign, color: 'text-emerald-700 bg-emerald-50 border-emerald-200/50' },
    { label: 'Avg. Order Value', value: '₹1,130', change: '+3.8%', isPositive: true, icon: TrendingUp, color: 'text-maroon bg-blush border-blush-dark/30' },
    { label: 'New Customers', value: '184', change: '-2.4%', isPositive: false, icon: Users, color: 'text-amber-700 bg-amber-50 border-amber-200/60' },
    { label: 'Conversion Rate', value: '3.42%', change: '+1.1%', isPositive: true, icon: Percent, color: 'text-blue-700 bg-blue-50 border-blue-200/60' },
  ];

  // Mock data for the sales line chart
  const salesHistory = [
    { month: 'Dec', amount: 32000 },
    { month: 'Jan', amount: 38000 },
    { month: 'Feb', amount: 35000 },
    { month: 'Mar', amount: 47000 },
    { month: 'Apr', amount: 44000 },
    { month: 'May', amount: 54240 },
  ];

  // SVG dimensions & calculations for elegant line chart
  const width = 500;
  const height = 200;
  const padding = 24;
  
  const minAmount = 25000;
  const maxAmount = 60000;
  
  // Calculate points
  const points = salesHistory.map((d, index) => {
    const x = padding + (index * (width - padding * 2)) / (salesHistory.length - 1);
    const y = height - padding - ((d.amount - minAmount) * (height - padding * 2)) / (maxAmount - minAmount);
    return { x, y, ...d };
  });

  // Build path strings
  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Path string for the gradient fill under the line
  const fillD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-blush/25 border border-blush-dark/35 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-xs font-bold text-darkbrown-light/75">
          <Calendar className="w-4 h-4 text-maroon" />
          <span>Showing performance reports for Jan 1, 2026 - May 25, 2026</span>
        </div>
        <button 
          onClick={() => alert('Initiating report download (PDF format)...')}
          className="text-xs font-bold bg-[#7B1C2E] hover:bg-[#9E2C41] text-white px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-maroon/20 hover:shadow-xl transition-all active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export PDF Report</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className={`bg-[#FFFDFB] p-5 rounded-2xl border shadow-blush-sm space-y-4 hover:-translate-y-0.5 transition-all duration-300 ${kpi.color}`}>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">{kpi.label}</span>
                <div className="p-2 rounded-lg bg-white/60">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <h3 className="text-2xl font-heading font-extrabold text-darkbrown leading-none">{kpi.value}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border ${
                  kpi.isPositive 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                    : 'bg-red-50 text-red-700 border-red-100'
                }`}>
                  {kpi.isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                  <span>{kpi.change}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Growth Chart & Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Monthly Sales Revenue SVG Line Chart */}
        <div className="lg:col-span-2 bg-[#FFFDFB] rounded-2xl border border-blush-dark/40 shadow-blush-normal p-6 space-y-5">
          <div>
            <h3 className="font-heading text-base font-bold text-darkbrown">Monthly Sales Trend</h3>
            <p className="text-xs text-darkbrown-light/60 mt-0.5">Calculated total billing figures in Indian Rupees (INR)</p>
          </div>
          
          {/* Custom SVG line chart container */}
          <div className="relative pt-4 w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
              <defs>
                {/* Gradient for fill under the line */}
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7B1C2E" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#7B1C2E" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              {[minAmount, 35000, 45000, 55000, maxAmount].map((yVal, idx) => {
                const y = height - padding - ((yVal - minAmount) * (height - padding * 2)) / (maxAmount - minAmount);
                return (
                  <g key={idx}>
                    <line 
                      x1={padding} 
                      y1={y} 
                      x2={width - padding} 
                      y2={y} 
                      stroke="#2C1A1A" 
                      strokeOpacity="0.06" 
                      strokeWidth="1.2" 
                      strokeDasharray="4 4"
                    />
                    <text 
                      x={padding - 4} 
                      y={y + 3} 
                      textAnchor="end" 
                      className="fill-darkbrown-light/50 font-sans text-[8px] font-bold"
                    >
                      ₹{yVal / 1000}k
                    </text>
                  </g>
                );
              })}

              {/* Gradient Fill under Path */}
              <path d={fillD} fill="url(#salesGradient)" className="animate-fade-in" style={{ animationDuration: '1.2s' }} />

              {/* Main Line Path */}
              <path 
                d={pathD} 
                fill="none" 
                stroke="#7B1C2E" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="animate-fade-in"
                style={{ animationDuration: '0.8s' }}
              />

              {/* Data points (circles) */}
              {points.map((p, idx) => (
                <g key={idx} className="group cursor-pointer">
                  {/* Outer Pulsing Aura on Hover */}
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="8" 
                    fill="#C8992A" 
                    fillOpacity="0" 
                    className="hover:fill-opacity-20 transition-all duration-200" 
                  />
                  {/* Point Circle */}
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="4" 
                    fill="#FFFDFB" 
                    stroke={idx === points.length - 1 ? '#C8992A' : '#7B1C2E'} 
                    strokeWidth="2.5" 
                  />
                  {/* Tooltip on hover */}
                  <title>{p.month}: ₹{p.amount.toLocaleString('en-IN')}</title>
                </g>
              ))}

              {/* X Axis Labels */}
              {points.map((p, idx) => (
                <text 
                  key={idx} 
                  x={p.x} 
                  y={height - 4} 
                  textAnchor="middle" 
                  className="fill-darkbrown-light/60 font-sans text-[8px] font-bold"
                >
                  {p.month}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Category Share List */}
        <div className="bg-[#FFFDFB] rounded-2xl border border-blush-dark/40 shadow-blush-normal p-6 space-y-5">
          <div>
            <h3 className="font-heading text-base font-bold text-darkbrown">Category Sales Share</h3>
            <p className="text-xs text-darkbrown-light/60 mt-0.5">Product line breakdown by billing percentage</p>
          </div>

          {/* Progress Indicators */}
          <div className="space-y-4 pt-2">
            {[
              { category: 'Raw Powder', percentage: '62%', sales: '₹33,628', color: 'bg-maroon', bgLight: 'bg-maroon/10' },
              { category: 'Capsules', percentage: '18%', sales: '₹9,763', color: 'bg-gold', bgLight: 'bg-gold/10' },
              { category: 'Smoothie Mixes / Recipes', percentage: '11%', sales: '₹5,966', color: 'bg-emerald-600', bgLight: 'bg-emerald-50' },
              { category: 'Gift Packs', percentage: '9%', sales: '₹4,883', color: 'bg-blue-600', bgLight: 'bg-blue-50' },
            ].map((share, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-darkbrown">
                  <span>{share.category}</span>
                  <div className="flex gap-2 text-[11px]">
                    <span className="text-darkbrown-light/60">{share.sales}</span>
                    <span className="font-bold text-maroon">{share.percentage}</span>
                  </div>
                </div>
                {/* Custom Progress Bar */}
                <div className={`w-full h-2 rounded-full ${share.bgLight}`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${share.color}`}
                    style={{ width: share.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminReports;
