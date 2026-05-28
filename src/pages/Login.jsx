import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, User, ShieldCheck, Sparkles, Star } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simple password strength calculator
  const getPasswordStrength = () => {
    if (!password) return 0;
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 3; // Strong
    if (password.length > 5) return 2; // Medium
    return 1; // Weak
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['Enter password', 'Weak', 'Good', 'Strong'];
  const strengthColors = ['bg-slate-200', 'bg-red-400', 'bg-yellow-400', 'bg-emerald-500'];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* Left Side - Visuals & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        {/* Dynamic Background Image - Clean and crisp */}
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80" 
          alt="Premium University Campus" 
          className="absolute inset-0 w-full h-full object-cover scale-105 transform origin-center animate-[pulse_20s_ease-in-out_infinite]"
        />
        
        {/* Deep, rich gradient overlay so the white text pops gorgeously */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-brand-900/80 to-brand-800/40"></div>

        {/* Decorative blur blobs for that modern glassmorphic glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/40 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple/40 blur-[120px] rounded-full mix-blend-screen"></div>

        <div className="relative z-20 w-full max-w-lg p-12 text-white">
          <Link to="/" className="inline-flex items-center gap-3 mb-16 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
              <GraduationCap size={28} />
            </div>
            <span className="font-display font-black text-3xl tracking-tight">
              EdEvolving
            </span>
          </Link>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-text' : 'signup-text'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl font-display font-black leading-[1.1] mb-6">
                {isLogin ? "Welcome back to your future." : "Start your journey today."}
              </h1>
              <p className="text-brand-100 text-lg font-medium leading-relaxed mb-12 opacity-90">
                {isLogin 
                  ? "Pick up right where you left off. Access your personalized college dashboard, saved applications, and expert counseling."
                  : "Join thousands of students making data-backed decisions. Unlock premium admission insights and unbiased college reviews."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Floating Glassmorphic Testimonial Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative"
          >
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-tr from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
              <Star size={18} className="text-yellow-900" fill="currentColor" />
            </div>
            <p className="text-white/90 text-sm font-medium leading-relaxed italic mb-4">
              "EdEvolving completely changed how I researched colleges. The AI match score helped me find the perfect engineering program I wouldn't have considered otherwise."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-sm font-bold">
                AR
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Anjali Sharma</h4>
                <p className="text-white/60 text-xs font-medium">Placed at IIT Delhi</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto">
        
        {/* Top-Right Toggle (Desktop) */}
        <div className="absolute top-8 right-8 hidden sm:flex items-center gap-4">
          <span className="text-sm font-bold text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-bold transition-all shadow-sm"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </div>

        <div className="w-full max-w-md mx-auto my-auto">
          {/* Mobile Header */}
          <div className="flex sm:hidden items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-lg">
                <GraduationCap size={20} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                EdEvolving
              </span>
            </Link>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  {isLogin ? "Welcome back" : "Create an account"}
                </h2>
                <p className="text-slate-500 font-medium">
                  {isLogin 
                    ? "Enter your credentials to access your dashboard." 
                    : "Enter your details below to set up your free account."}
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                
                {/* Name Field - Only in Sign Up */}
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                        <div className="relative mt-1.5">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <User size={18} className="text-slate-400" />
                          </div>
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
                  <div className="relative mt-1.5">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
                    {isLogin && (
                      <a href="#" className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative mt-1.5">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Password Strength Indicator (Signup Only) */}
                  {!isLogin && password.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="mt-3"
                    >
                      <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-slate-100">
                        <div className={`h-full transition-all duration-300 w-1/3 ${strength >= 1 ? strengthColors[strength] : 'bg-transparent'}`}></div>
                        <div className={`h-full transition-all duration-300 w-1/3 ${strength >= 2 ? strengthColors[strength] : 'bg-transparent'}`}></div>
                        <div className={`h-full transition-all duration-300 w-1/3 ${strength >= 3 ? strengthColors[strength] : 'bg-transparent'}`}></div>
                      </div>
                      <p className={`text-xs font-bold mt-2 ${strength === 3 ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {strengthLabels[strength]}
                      </p>
                    </motion.div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 transition-all flex items-center justify-center gap-2 group mt-8"
                >
                  {isLogin ? "Sign In to Dashboard" : "Create Free Account"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Social Login Separator */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-slate-200"></div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or continue with</span>
                <div className="flex-1 h-[1px] bg-slate-200"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="flex items-center justify-center gap-2 py-3.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all bg-white shadow-sm font-bold text-sm text-slate-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all bg-white shadow-sm font-bold text-sm text-slate-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Secure badge */}
              <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                <ShieldCheck size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Secure 256-bit Encryption</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
