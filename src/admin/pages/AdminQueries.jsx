import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  CornerDownRight, 
  CheckCircle, 
  Mail, 
  User, 
  Calendar,
  Send
} from 'lucide-react';

const AdminQueries = () => {
  // Support queries
  const [queries, setQueries] = useState([
    {
      id: 'Q-301',
      name: 'Vikram Sen',
      email: 'vikram.sen@gmail.com',
      subject: 'Infant Feeding Safety',
      message: 'Is this safe to feed to a 10-month-old infant? Looking for organic weaning options. My doctor recommended red bananas specifically due to their higher nutrient density, but I want to ensure this powder has zero added salt, sugar or preservatives.',
      date: 'May 24, 2026',
      status: 'Pending',
      replyContent: ''
    },
    {
      id: 'Q-302',
      name: 'Ananya Iyer',
      email: 'ananya.iyer@outlook.com',
      subject: 'Wholesale Purchase / Distribution',
      message: 'Interested in distribution opportunities in Bangalore. Who should I contact for bulk wholesale price lists? We run a premium chain of organic grocery stores and have received several queries from regular shoppers regarding Red Banana Powder products.',
      date: 'May 23, 2026',
      status: 'Pending',
      replyContent: ''
    },
    {
      id: 'Q-303',
      name: 'Kabir Mehta',
      email: 'kabir.m@yahoo.com',
      subject: 'Larger capsules option request',
      message: 'Loved the organic capsules! Are you planning to launch a larger 120-capsule option soon? 60 capsules only last me a month and I would prefer buying in larger, more eco-friendly quantities if possible. Keep up the great product standards!',
      date: 'May 22, 2026',
      status: 'Replied',
      replyContent: 'Hi Kabir, thank you so much for your feedback! We are actually planning to launch our 120-capsules value pack in July. Stay tuned!'
    },
    {
      id: 'Q-304',
      name: 'Sarah Dsouza',
      email: 'sarah.dsouza@gmail.com',
      subject: 'Delivery delay inquiry',
      message: 'Hello, my order (RBP-8812) has not arrived yet. It was shipped 4 days ago. Could you please check the tracking state? Thanks.',
      date: 'May 19, 2026',
      status: 'Resolved',
      replyContent: 'Hi Sarah, we checked with our logistics partner and it seems your package is out for delivery today. Apologies for the delay!'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQueryId, setSelectedQueryId] = useState('Q-301');
  const [replyInput, setReplyInput] = useState('');

  // Active query object
  const activeQuery = queries.find(q => q.id === selectedQueryId) || queries[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyInput.trim() || !activeQuery) return;

    setQueries(queries.map(q => {
      if (q.id === activeQuery.id) {
        return {
          ...q,
          status: 'Replied',
          replyContent: replyInput
        };
      }
      return q;
    }));

    setReplyInput('');
  };

  const handleToggleStatus = (id) => {
    setQueries(queries.map(q => {
      if (q.id === id) {
        let nextStatus = 'Pending';
        if (q.status === 'Pending') nextStatus = 'Resolved';
        else if (q.status === 'Resolved' || q.status === 'Replied') nextStatus = 'Pending';
        return { ...q, status: nextStatus };
      }
      return q;
    }));
  };

  const handleDeleteQuery = (id) => {
    if (window.confirm('Delete this support query completely?')) {
      const remaining = queries.filter(q => q.id !== id);
      setQueries(remaining);
      // Select another query
      if (remaining.length > 0) {
        setSelectedQueryId(remaining[0].id);
      }
    }
  };

  // Filter queries by search
  const filteredQueries = queries.filter(q => 
    q.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    q.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Replied':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Pending':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in items-start">
      
      {/* Sidebar List (Left Side) */}
      <div className="lg:col-span-1 bg-[#FFFDFB] rounded-2xl border border-blush-dark/40 shadow-blush-normal overflow-hidden flex flex-col max-h-[640px]">
        {/* Search Header */}
        <div className="p-4 border-b border-blush-dark/30 space-y-3 bg-blush/10">
          <h3 className="font-heading font-bold text-darkbrown text-sm">Inbox Queries</h3>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-darkbrown-light/60">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FFF8F5] border border-blush-dark/60 rounded-xl text-darkbrown placeholder-darkbrown-light/45 text-xs focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
            />
          </div>
        </div>

        {/* Query Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-blush-dark/10">
          {filteredQueries.length === 0 ? (
            <p className="p-8 text-center text-xs font-semibold text-darkbrown-light/50">No queries found.</p>
          ) : (
            filteredQueries.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQueryId(q.id)}
                className={`p-4 cursor-pointer text-left transition-all ${
                  selectedQueryId === q.id 
                    ? 'bg-blush/60 border-l-4 border-maroon' 
                    : 'hover:bg-blush/20 border-l-4 border-transparent'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="font-bold text-darkbrown text-xs truncate max-w-[120px]">{q.name}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase shrink-0 ${getStatusBadge(q.status)}`}>
                    {q.status}
                  </span>
                </div>
                <h4 className="text-[11px] font-bold text-maroon mt-1 truncate">{q.subject}</h4>
                <p className="text-[10px] text-darkbrown-light/70 mt-1 line-clamp-2 leading-relaxed">
                  {q.message}
                </p>
                <div className="flex items-center gap-1 text-[9px] text-darkbrown-light/55 mt-2.5">
                  <Calendar className="w-3 h-3 text-gold" />
                  <span>{q.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Query Detail & Reply Panel (Right Side) */}
      <div className="lg:col-span-2 space-y-6">
        {activeQuery ? (
          <div className="bg-[#FFFDFB] rounded-2xl border border-blush-dark/40 shadow-blush-normal p-6 space-y-6">
            
            {/* Ticket Header Actions */}
            <div className="flex justify-between items-start border-b border-blush-dark/25 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-gold tracking-wide uppercase bg-gold/5 px-2 py-0.5 rounded border border-gold/15">
                  Ticket {activeQuery.id}
                </span>
                <h2 className="font-heading text-lg font-bold text-darkbrown mt-2">{activeQuery.subject}</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleToggleStatus(activeQuery.id)}
                  title="Mark Resolved / Open"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    activeQuery.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/50'
                      : 'bg-white hover:bg-blush text-darkbrown-light border-blush-dark/60 hover:text-darkbrown'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{activeQuery.status === 'Resolved' ? 'Resolved' : 'Mark Resolved'}</span>
                </button>
                
                <button 
                  onClick={() => handleDeleteQuery(activeQuery.id)}
                  className="p-2 text-darkbrown-light/60 hover:text-red-600 bg-blush/40 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sender Meta Card */}
            <div className="bg-blush/25 border border-blush-dark/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-[#C8992A]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-darkbrown leading-tight">{activeQuery.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-darkbrown-light/60 mt-0.5">
                    <Mail className="w-3 h-3 text-maroon" />
                    <span>{activeQuery.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-darkbrown-light/70 bg-white border border-blush-dark/40 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5 text-maroon" />
                <span>Submitted: {activeQuery.date}</span>
              </div>
            </div>

            {/* Support Message Box */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-extrabold uppercase text-darkbrown-light/50 tracking-wider">Inquiry Message</h4>
              <p className="bg-[#FFF8F5] border border-blush-dark/35 p-5 rounded-xl text-xs text-darkbrown leading-relaxed font-medium italic whitespace-pre-wrap">
                "{activeQuery.message}"
              </p>
            </div>

            {/* Admin Response Log */}
            {activeQuery.replyContent && (
              <div className="space-y-2">
                <h4 className="text-[10px] font-extrabold uppercase text-darkbrown-light/50 tracking-wider">Outgoing Staff Reply</h4>
                <div className="bg-blue-50/20 border border-blue-100 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                  <div className="flex items-start gap-2.5">
                    <CornerDownRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-900 leading-relaxed font-semibold">
                        {activeQuery.replyContent}
                      </p>
                      <p className="text-[9px] font-bold text-blue-500 mt-2">Sent to {activeQuery.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Message Reply Form */}
            {activeQuery.status !== 'Resolved' && (
              <form onSubmit={handleSendReply} className="space-y-3 pt-2 border-t border-blush-dark/20">
                <h4 className="text-[10px] font-extrabold uppercase text-darkbrown-light/50 tracking-wider">Compose Quick Reply</h4>
                <div className="relative">
                  <textarea
                    rows="4"
                    required
                    placeholder={`Compose an email reply to ${activeQuery.name}...`}
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FFF8F5] border border-blush-dark/60 rounded-xl text-xs text-darkbrown placeholder-darkbrown-light/40 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all resize-none"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#7B1C2E] hover:bg-[#9E2C41] text-white px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-lg shadow-maroon/20 flex items-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply Email</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        ) : (
          <div className="bg-[#FFFDFB] rounded-2xl border border-blush-dark/40 p-12 text-center shadow-blush-normal">
            <MessageSquare className="w-12 h-12 text-darkbrown-light/30 mx-auto mb-4" />
            <h3 className="font-heading text-lg font-bold text-darkbrown">No Ticket Selected</h3>
            <p className="text-xs text-darkbrown-light/60 mt-1">Select an inbox query from the left list to review detailed customer messages.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminQueries;
