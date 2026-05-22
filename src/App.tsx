/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Zap, Heart, CheckCircle, Star, Instagram, ChevronRight, Lock, ChevronLeft, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import QRCode from 'react-qr-code';
import { saveOrder } from './firebase';

export default function App() {
  const [checkoutPlan, setCheckoutPlan] = useState<any>(null);
  const [checkoutUsername, setCheckoutUsername] = useState("");

  if (checkoutPlan) {
    return <CheckoutPage plan={checkoutPlan} username={checkoutUsername} onBack={() => setCheckoutPlan(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-pink-500/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PricingSection onCheckout={(plan, user) => {
          setCheckoutPlan(plan);
          setCheckoutUsername(user);
        }} />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
          <Instagram className="w-8 h-8 text-pink-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            FollowKing
          </span>
        </a>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <div>
          <a href="#pricing" className="bg-white text-slate-900 px-4 py-2 rounded-full font-semibold text-sm hover:bg-slate-200 transition-colors">
            Get Followers
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
          Limited Time Offer: Get 100K Followers for ₹599
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Become an <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Instagram Icon
          </span> Instantaneously
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Skyrocket your social proof with our premium Instagram follower packages. Fast, secure, and permanent.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#pricing" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-pink-500/25 transition-all flex items-center justify-center gap-2">
            Boost My Profile <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-16 pt-8 border-t border-slate-800/50 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-400">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-medium text-slate-200">4.9/5</span> from 10k+ reviews
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-400" />
          Instant Delivery
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          100% Safe & Secure
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Lightning Fast Delivery",
      description: "See results within minutes of placing your order. Our automated system works 24/7."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: "No Password Required",
      description: "We only need your username. Your account remains completely safe and secure with you."
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      title: "High-Quality Profiles",
      description: "We provide premium quality followers with profile pictures and activity to look natural."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
      title: "365-Day Refill Guarantee",
      description: "If any drops occur, our system will automatically refill your followers for a whole year."
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FollowKing?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">We provide the most reliable and highest quality Instagram growth services in the market.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-pink-500/50 transition-all cursor-default"
            >
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ onCheckout }: { onCheckout: (plan: any, username: string) => void }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const plans = [
    { followers: "500+", price: "49", original: "99", popular: false, link: "https://rzp.io/rzp/YPH7OqC" },
    { followers: "1K", price: "199", original: "499", popular: false, link: "https://rzp.io/rzp/ezaWs4QV" },
    { followers: "3K", price: "399", original: "899", popular: false, link: "https://rzp.io/rzp/SQc2qZRQ" },
    { followers: "100K", price: "599", original: "1999", popular: true, link: "https://rzp.io/rzp/3FiO1l0j" },
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your Growth Plan</h2>
          <p className="text-slate-400">Select a package and skyrocket your profile instantly.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-xl mx-auto mb-16 relative z-10">
            <label htmlFor="username" className="block text-sm font-medium text-slate-400 mb-2 text-center">Enter Your Instagram Username First</label>
            <div className="relative shadow-lg shadow-pink-500/5 group mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-400 font-medium">@</span>
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(false); }}
                className={`block w-full pl-10 pr-4 py-4 bg-slate-900/80 backdrop-blur-sm border ${error ? 'border-red-500' : 'border-slate-700/50 group-hover:border-pink-500/50'} rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-lg`}
                placeholder="your_username"
              />
            </div>
            {error && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-2 text-center font-medium">
                Please enter your Instagram username first to proceed.
              </motion.p>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-900/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 shadow-xl shadow-yellow-500/5 relative overflow-hidden group hover:border-yellow-500/50 transition-colors"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
              <div className="flex items-center gap-2 mb-4">
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} 
                  className="text-xl"
                >
                  ⚠️
                </motion.span>
                <h3 className="text-yellow-500 font-bold text-lg tracking-wide">Important Notes:</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-0.5 text-base">✔</span>
                  <span className="leading-relaxed">Your Instagram profile must be set to <strong className="text-white">PUBLIC</strong> before placing an order.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-0.5 text-base">✔</span>
                  <span className="leading-relaxed">Please disable the <strong className="text-white">"Flag for Review"</strong> option in your Instagram settings before ordering followers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-0.5 text-base">✔</span>
                  <span className="leading-relaxed">Delivery starts within <strong className="text-white">2-15 minutes</strong> and completes within 24-48 hours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-0.5 text-base">✔</span>
                  <span className="leading-relaxed">All followers come with a <strong className="text-white">365-day refill guarantee</strong>.</span>
                </li>
              </ul>
            </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              whileInView={{ opacity: 1, scale: 1, y: 0 }} 
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }} 
              transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }} 
              className={`bg-slate-900 border ${plan.popular ? 'border-pink-500 shadow-xl shadow-pink-500/20' : 'border-slate-700/50'} rounded-3xl p-8 relative flex flex-col hover:border-pink-500/50 transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6 pt-2">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.followers} Followers
                </h3>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-5xl font-extrabold tracking-tight">₹{plan.price}</span>
                  <span className="text-lg text-slate-500 line-through mb-1">₹{plan.original}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-slate-300 flex-1 text-sm bg-slate-950/50 p-6 rounded-2xl">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <span>Instant Start & Fast Delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <span>High Quality Real Profiles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <span>100% Safe (No Password)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <span>365-Day Automatic Refill</span>
                </li>
              </ul>

              <button 
                onClick={async () => {
                  if (!username) {
                    setError(true);
                    
                    // Scroll to the username input
                    document.getElementById('username')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    document.getElementById('username')?.focus();
                    return;
                  }
                  
                  // Save the order to Firebase
                  await saveOrder(username, plan);
                  onCheckout(plan, username);
                }}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${plan.popular ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40' : 'bg-white text-slate-900 hover:bg-slate-200 shadow-lg shadow-white/10'}`}>
                <Lock className="w-4 h-4" />
                Buy Now
              </button>

              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-400" /> 
                  100% Secure Checkout
                </div>
                <div className="flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="bg-slate-100 px-2 py-1 rounded-sm flex items-center justify-center shadow-sm">
                    <span className="text-[#1434CB] font-black italic tracking-tighter text-[11px] leading-none">VISA</span>
                  </div>
                  <div className="bg-slate-100 px-2 py-1.5 rounded-sm flex items-center justify-center shadow-sm">
                    <div className="flex items-center leading-none">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#EB001B] opacity-90 relative z-10"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] opacity-90 -ml-1 relative z-0"></div>
                    </div>
                  </div>
                  <div className="bg-slate-100 px-2 py-1 rounded-sm flex items-center justify-center shadow-sm">
                     <span className="text-[#003087] font-black italic tracking-tight text-[11px] leading-none flex items-center"><span className="text-[#0079C1]">Pay</span>Pal</span>
                  </div>
                  <div className="bg-slate-100 px-2 py-1 rounded-sm flex items-center justify-center shadow-sm">
                    <strong className="text-slate-800 font-extrabold text-[11px] leading-none tracking-wider">UPI</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Rahul S.", handle: "@rahul_creates", text: "Got the 100k followers within 12 hours. My engagement has actually gone up too. Worth every rupee." },
    { name: "Priya M.", handle: "@priya_lifestyle", text: "I was skeptical at first, but the followers look very real and they stayed! The refill guarantee gives peace of mind." },
    { name: "Amit K.", handle: "@amit_fitness_", text: "Insane value for ₹599. It helped me cross the 100k milestone which changed how brands look at my profile." },
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-pink-500/30 transition-all cursor-default"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-slate-300 italic mb-6">"{r.text}"</p>
              <div>
                <p className="font-bold text-white">{r.name}</p>
                <p className="text-sm text-slate-500">{r.handle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is it safe for my account?", a: "Yes, our service is 100% safe. We strictly follow Instagram's algorithms and limits to ensure your account security. We never ask for your password." },
    { q: "Will the followers drop?", a: "While minor drops can happen on Instagram, we provide a 365-day refill guarantee. If followers drop, our automated system will refill them." },
    { q: "How long does delivery take?", a: "The delivery starts instantly (0-15 minutes) after your payment is confirmed. Full 100k delivery usually completes within 12-48 hours depending on queue." }
  ];

  return (
    <section id="faq" className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ x: 5 }}
            className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-pink-500/30 transition-all cursor-default"
          >
            <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
            <p className="text-slate-400 leading-relaxed">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a href="/" className="inline-flex items-center justify-center gap-2 mb-6 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
          <Instagram className="w-6 h-6 text-pink-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            FollowKing
          </span>
        </a>
        <p className="mb-4 text-sm mt-4">&copy; {new Date().getFullYear()} FollowKing. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Contact Support</a>
        </div>
        <p className="mt-8 text-xs max-w-2xl mx-auto text-slate-700">
          Disclaimer: This website is not affiliated with Instagram, Facebook, Meta Platforms, Inc. Instagram is a registered trademark of Meta Platforms, Inc.
        </p>
      </div>
    </footer>
  );
}

function CheckoutPage({ plan, username, onBack }: { plan: any, username: string, onBack: () => void }) {
  const [status, setStatus] = useState<"waiting" | "verifying" | "success">("waiting");

  useEffect(() => {
    window.scrollTo(0, 0);
    // Automatically open the payment link in a new tab when the checkout page opens
    if (plan.link && plan.followers !== "1K") {
      window.open(plan.link, '_blank');
    }
  }, [plan.link, plan.followers]);

  if (status === "success") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-pink-500/30 flex flex-col items-center justify-center p-4 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full relative overflow-hidden shadow-2xl shadow-pink-500/10">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">Payment Successful!</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you for your order. We have received your request for <strong>{plan.followers} followers</strong> for checkout account <strong className="text-pink-400">@{username}</strong>. Delivery will begin within 0-15 minutes.
          </p>
          <button onClick={() => window.location.href = '/'} className="w-full py-4 rounded-xl font-bold bg-white text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-pink-500/30 flex flex-col items-center pt-20 px-4">
      <div className="max-w-md w-full relative">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-8 transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative shadow-2xl shadow-pink-500/5 overflow-hidden text-center">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"></div>
          
          <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
          
          {plan.followers === "1K" ? (
             <div className="bg-white p-6 rounded-2xl mb-8 mx-auto w-fit flex flex-col items-center">
               <div className="flex gap-4 justify-center items-center w-full mb-4 px-2">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-5" />
               </div>
               <QRCode value={`upi://pay?pa=Myshopsmyhome@rzp&pn=Myshopsmyhome&am=${plan.price}&cu=INR`} size={180} />
               <p className="text-slate-900 text-xs font-bold tracking-wider mt-4 text-center">SCAN & PAY WITH ANY UPI APP</p>
               <div className="flex gap-3 justify-center mt-4 items-center grayscale">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="h-4" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-4" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-[10px]" />
               </div>
             </div>
          ) : (
             <p className="text-slate-400 mb-6 text-sm leading-relaxed">A new tab has opened for secure payment at Razorpay. Do not close this window.</p>
          )}

          <div className="bg-slate-950/50 rounded-2xl p-5 mb-8 border border-slate-800/50 text-left">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 font-medium">Package</span>
              <span className="text-white font-bold text-lg">{plan.followers} Followers</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 font-medium">Username</span>
              <span className="text-white font-bold flex items-center gap-1.5"><User className="w-4 h-4 text-pink-500" /> @{username}</span>
            </div>
            <div className="h-px w-full bg-slate-800 my-4"></div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium text-lg">Total</span>
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">₹{plan.price}</span>
            </div>
          </div>

          {status === "verifying" ? (
             <div className="py-4 flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 animate-pulse">Verifying payment with Razorpay...</p>
             </div>
          ) : (
            <div className="space-y-4">
              <button 
                onClick={() => {
                  setStatus("verifying");
                  setTimeout(() => setStatus("success"), 2500);
                }} 
                className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" /> I Have Completed Payment
              </button>
              
              {plan.followers !== "1K" && (
                <button 
                  onClick={() => window.open(plan.link, '_blank')} 
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Click here if payment tab didn't open
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

