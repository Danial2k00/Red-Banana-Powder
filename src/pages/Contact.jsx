import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [searchParams] = useSearchParams();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  
  // Status states
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Settle pre-filled parameters (e.g. from header Wholesale or Bulk links)
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam === 'wholesale') {
      setSubject('Wholesale Sourcing');
      setMessage('Hello, I am interested in sourcing Red Banana Powder in bulk wholesale packages for my store/business. Please send the pricing brochure.');
    } else if (subjectParam === 'bulk') {
      setSubject('Bulk Order Inquiries');
      setMessage('Hello, I am looking to initiate a large bulk order. Please connect me to a distribution sales manager.');
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone || !message) {
      setError('Please fill in all required inputs.');
      return;
    }

    setSuccess(true);
    // Reset fields
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in space-y-10 bg-floral-pattern">
      {/* Page Heading */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-gold uppercase tracking-[0.25em]">Estates &amp; Sourcing Relations</span>
        <h1 className="text-3.5xl font-black font-heading text-maroon">Get In Touch</h1>
        <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Contact Form (7 cols on desktop) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-maroon/5 shadow-blush-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-maroon" />
              <h2 className="text-xl font-bold font-heading text-maroon">Send Us A Message</h2>
            </div>
            <p className="text-xs text-darkbrown/60 font-semibold leading-relaxed">
              Have questions regarding nutritional specifications, recipes, shipping speeds, or wholesale opportunities? Our dedicated support team responds within 24 business hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                ⚠ {error}
              </div>
            )}

            {success ? (
              <div className="p-6 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-green-600 animate-bounce" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-green-800">Message Dispatched</h4>
                <p className="text-xs text-green-700 font-semibold max-w-sm">Thank you! Your wellness and sourcing ticket was registered. A manager will email/call you shortly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Liam Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-cream border border-maroon/15 rounded-xl px-4 py-3 text-xs text-darkbrown outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. liam@estate.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-cream border border-maroon/15 rounded-xl px-4 py-3 text-xs text-darkbrown outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-cream border border-maroon/15 rounded-xl px-4 py-3 text-xs text-darkbrown outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Select Subject *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-cream border border-maroon/15 rounded-xl px-4 py-3 text-xs font-semibold text-darkbrown outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all cursor-pointer"
                    >
                      <option value="General Inquiry">General Sourcing Inquiry</option>
                      <option value="Wholesale Sourcing">Wholesale Sourcing</option>
                      <option value="Bulk Order Inquiries">Bulk Order Inquiries</option>
                      <option value="Nutrition & Recipe Guide">Nutrition &amp; Recipes</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-darkbrown/60 uppercase tracking-wider">Detail Message *</label>
                  <textarea
                    rows="4"
                    placeholder="Describe your inquiry or order details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-cream border border-maroon/15 rounded-xl px-4 py-3 text-xs text-darkbrown outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-maroon hover:bg-maroon-hover text-white font-bold py-3.5 rounded-xl border border-gold hover:shadow-gold-glow flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest text-xs"
                >
                  <Send className="w-4 h-4" />
                  Dispatch Inquiry Ticket
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Right Side: Address details and Embedded Maps (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Info cards */}
          <div className="bg-white rounded-3xl p-6 border border-maroon/5 shadow-blush-sm space-y-5">
            <h3 className="font-heading font-black text-maroon text-base uppercase tracking-wider flex items-center gap-1.5 pb-3 border-b border-maroon/5">
              <Sparkles className="w-4.5 h-4.5 text-gold" />
              Direct Coordinates
            </h3>

            <div className="space-y-4 text-xs font-semibold text-darkbrown/80">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-blush rounded-xl flex items-center justify-center text-maroon flex-shrink-0 border border-maroon/5">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-maroon uppercase text-[10px] tracking-wider">Estate Address</h4>
                  <p className="mt-0.5 leading-relaxed text-darkbrown/60">Red Banana Premium Sourcing Orchards, Western Ghats, Tamil Nadu, India - 627001</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 bg-blush rounded-xl flex items-center justify-center text-maroon flex-shrink-0 border border-maroon/5">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-maroon uppercase text-[10px] tracking-wider">Voice Channels</h4>
                  <p className="mt-0.5 leading-relaxed text-darkbrown/60">+91 44 2838 9000 | Toll-Free: 1800-419-8080</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 bg-blush rounded-xl flex items-center justify-center text-maroon flex-shrink-0 border border-maroon/5">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-maroon uppercase text-[10px] tracking-wider">Electronic Mail</h4>
                  <p className="mt-0.5 leading-relaxed text-darkbrown/60">wellness@redbananapowder.com | support@rbp.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Maps Placeholder */}
          <div className="bg-white rounded-3xl p-4 border border-maroon/5 shadow-blush-sm flex-1 flex flex-col">
            <div className="w-full bg-cream/70 rounded-2xl border border-maroon/5 relative overflow-hidden flex-1 min-h-[220px] flex flex-col items-center justify-center text-center p-6 space-y-3">
              {/* CSS layout for map mock */}
              <div className="absolute inset-0 bg-floral-pattern opacity-[0.25] pointer-events-none" />
              
              {/* Fake roads and shapes for visual interest */}
              <div className="absolute w-[180px] h-[3px] bg-maroon/10 rotate-[22deg] left-5 top-12" />
              <div className="absolute w-[200px] h-[3px] bg-maroon/10 rotate-[-45deg] right-10 bottom-10" />
              <div className="absolute w-24 h-24 bg-gold/5 rounded-full left-1/3 top-1/4 filter blur-sm" />

              <div className="w-12 h-12 bg-blush rounded-full flex items-center justify-center text-maroon border-2 border-gold relative z-10 animate-bounce">
                <MapPin className="w-6 h-6 fill-maroon text-white" />
              </div>
              
              <div className="relative z-10">
                <h4 className="text-xs font-black text-maroon uppercase tracking-wider">Red Banana Sourcing Estates</h4>
                <p className="text-[10px] text-darkbrown/50 font-bold mt-0.5">Latitude 8.7139° N | Longitude 77.7567° E</p>
                <span className="text-[9px] bg-gold text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mt-2.5 inline-block border border-gold-dark/15">Western Ghats</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
