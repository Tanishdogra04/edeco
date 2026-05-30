import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Mail, Lock, ArrowRight, User, 
  ShieldCheck, Sparkles, Star, Eye, EyeOff, Loader2, AlertCircle, Check, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup, isLoggedIn, user, logout, updateProfile } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI & UX States
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Profile Edit States
  const [editName, setEditName] = useState(user ? user.name : '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update edit name state if user details load or change
  useEffect(() => {
    if (user) {
      setEditName(user.name);
    }
  }, [user]);

  // Simple password strength calculator
  const getPasswordStrength = () => {
    if (!password) return 0;
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 3; // Strong
    if (password.length > 5) return 2; // Medium
    return 1; // Weak
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['Enter password', 'Weak (Minimum 6 characters)', 'Good', 'Strong'];
  const strengthColors = ['bg-slate-200', 'bg-red-400', 'bg-yellow-400', 'bg-emerald-500'];

  const validateForm = () => {
    let errors = {};
    
    if (!isLogin && !name.trim()) {
      errors.name = 'Full name is required';
    }
    
    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});
    
    if (!validateForm()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    setLocalLoading(true);
    
    try {
      let res;
      if (isLogin) {
        res = await login(email, password);
      } else {
        res = await signup(name, email, password);
      }
      
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          // Redirect is handled, but since we have dashboard in this page,
          // it will automatically toggle to the dashboard screen!
        }, 1500);
      } else {
        setError(res.error);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLocalLoading(false);
    }
  };

  // Shake animation variant
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.4 }
    }
  };

  // Dashboard Application Trackers (Mock details)
  const mockApplications = [
    { college: "IIT Bombay", course: "B.Tech Computer Science", status: "Shortlisted", date: "May 28, 2026", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    { college: "BITS Pilani", course: "B.Tech Electrical & Electronics", status: "Applied", date: "May 29, 2026", color: "bg-blue-50 text-blue-700 border-blue-100" },
    { college: "IIM Ahmedabad", course: "MBA General Program", status: "Under Review", date: "May 30, 2026", color: "bg-amber-50 text-amber-700 border-amber-100" }
  ];

  /* ====================================================
      DASHBOARD VIEW (FOR AUTHENTICATED USERS)
  ==================================================== */
  if (isLoggedIn && user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-slate-100 selection:text-slate-900">
        {/* Dashboard Top Navigation */}
        <div className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <Link to="/" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <span className="font-display font-black text-2xl tracking-tight text-slate-900">
              edeco<span className="text-emerald-500 font-black">.</span>
            </span>
          </Link>
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-sm font-bold transition-all cursor-pointer border border-slate-200 hover:border-red-100"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Grid Container */}
        <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Management Section */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between h-fit">
            <div>
              <div className="text-center pb-6 border-b border-slate-100">
                <div className="relative inline-block mx-auto mb-4">
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-100 shadow-md animate-pulse-slow" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
                    <Sparkles size={14} />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900">{user.name}</h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{user.email}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] uppercase tracking-wider font-bold rounded-lg">
                  Registered {user.estd}
                </span>
              </div>

              <div className="mt-8 space-y-5">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Profile</h4>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Display Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-slate-800 focus:bg-white outline-none transition-all font-semibold text-slate-900 text-sm"
                  />
                </div>
                <button
                  onClick={() => {
                    if (editName.trim()) {
                      updateProfile(editName.trim(), user.avatar);
                      setProfileSuccess(true);
                      setTimeout(() => setProfileSuccess(false), 2000);
                    }
                  }}
                  className="w-full bg-brand-mint hover:bg-brand-blue text-brand-800 hover:text-white font-bold py-3 rounded-xl text-xs transition-all duration-300 cursor-pointer"
                >
                  Save Display Name
                </button>

                <AnimatePresence>
                  {profileSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-xl text-center"
                    >
                      Profile name updated successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-semibold flex items-center justify-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" />
              Verified Student Session
            </div>
          </div>

          {/* Active Application Status Tracker */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Active Applications</h3>
                  <p className="text-xs text-slate-400 font-semibold">Track your application review status with edeco. partners</p>
                </div>
                <span className="px-3 py-1.5 bg-slate-100 rounded-xl text-slate-700 text-xs font-bold border border-slate-200">
                  {mockApplications.length} Total
                </span>
              </div>

              <div className="space-y-4">
                {mockApplications.map((app, i) => (
                  <div key={i} className="p-5 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-slate-350 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-display font-black text-xs shrink-0">
                        {app.college.split(' ').map(w => w[0]).join('').substring(0, 3)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">{app.college}</h4>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">{app.course}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">Applied on {app.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${app.color}`}>
                        {app.status}
                      </span>
                      <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Consulting Banner */}
            <div className="bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/40 rounded-full blur-3xl"></div>
              <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                <Sparkles size={20} className="text-brand-300 animate-pulse" />
                Want an application review?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-lg mb-6 font-medium">
                Connect with our premium advisors to review your application form details, review essays, and double-check course eligibility before submission.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-slate-950 font-bold px-6 py-3 rounded-xl text-xs hover:bg-slate-100 transition-all">
                Schedule Consultation <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ====================================================
      FORM VIEW (LOGIN & SIGN UP)
  ==================================================== */
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
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/20 blur-[120px] rounded-full mix-blend-screen"></div>

        <div className="relative z-20 w-full max-w-lg p-12 text-white">
          <Link to="/" className="flex items-center gap-1.5 mb-16 hover:opacity-90 transition-opacity">
            <span className="font-display font-black text-3xl tracking-tight text-white">
              edeco<span className="text-emerald-500 font-black">.</span>
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
              <Star size={18} className="text-yellow-950" fill="currentColor" />
            </div>
            <p className="text-white/90 text-sm font-medium leading-relaxed italic mb-4">
              "edeco. completely changed how I researched colleges. The AI match score helped me find the perfect engineering program I wouldn't have considered otherwise."
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
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto bg-white">
        
        {/* Top-Right Toggle (Desktop) */}
        <div className="absolute top-8 right-8 hidden sm:flex items-center gap-4">
          <span className="text-sm font-bold text-slate-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setValidationErrors({});
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 text-sm font-bold transition-all shadow-sm cursor-pointer"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </div>

        <div className="w-full max-w-md mx-auto my-auto relative">
          
          {/* Glassmorphic Success Overlay */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center text-center rounded-3xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-500/20 flex items-center justify-center text-emerald-600 mb-6 shadow-lg shadow-emerald-500/10"
                >
                  <Check size={40} className="stroke-[3]" />
                </motion.div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  {isLogin ? "Access Granted!" : "Account Created!"}
                </h3>
                <p className="text-slate-500 font-semibold max-w-xs">
                  {isLogin 
                    ? "Welcome back. Redirecting you to your portal..." 
                    : "Registration successful. Redirecting you to home..."}
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                  <Loader2 size={16} className="animate-spin text-slate-900" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Connecting to session...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Header */}
          <div className="flex sm:hidden items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-1">
              <span className="font-display font-black text-xl tracking-tight text-slate-900">
                edeco<span className="text-emerald-500 font-black">.</span>
              </span>
            </Link>
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setValidationErrors({});
              }}
              className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>

          <motion.div
            key={isLogin ? 'login' : 'signup'}
            animate={shake ? "shake" : ""}
            variants={shakeVariants}
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

            {/* Error Alert Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-start gap-3"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Field - Only in Sign Up */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                      <div className="relative mt-1.5">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <User size={18} className="text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={localLoading}
                          className={`w-full pl-10 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-4 focus:ring-slate-900/5 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${
                            validationErrors.name ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-slate-800'
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {validationErrors.name && (
                        <p className="text-xs text-red-500 font-bold mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {validationErrors.name}
                        </p>
                      )}
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
                    disabled={localLoading}
                    className={`w-full pl-10 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-4 focus:ring-slate-900/5 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${
                      validationErrors.email ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-slate-800'
                    }`}
                    placeholder="hello@example.com"
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-xs text-red-500 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
                  {isLogin && (
                    <a href="#" className="text-xs font-bold text-slate-800 hover:text-slate-950 transition-colors">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={localLoading}
                    className={`w-full pl-10 pr-10 py-3.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-4 focus:ring-slate-900/5 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${
                      validationErrors.password ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-slate-800'
                    }`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-xs text-red-500 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {validationErrors.password}
                  </p>
                )}

                {/* Password Strength Indicator (Signup Only) */}
                {!isLogin && password.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="mt-3.5"
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
                disabled={localLoading}
                className="w-full bg-brand-mint hover:bg-brand-blue text-brand-800 hover:text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group mt-8 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {localLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-brand-800" />
                    <span>Processing request...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? "Sign In to Dashboard" : "Create Free Account"}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Social Login Separator */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-slate-150"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or continue with</span>
              <div className="flex-1 h-[1px] bg-slate-150"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button 
                type="button"
                onClick={() => {
                  setError('Social authentication is currently in sandbox mode.');
                }}
                className="flex items-center justify-center gap-2 py-3.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-350 transition-all bg-white shadow-sm font-bold text-sm text-slate-700 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button 
                type="button"
                onClick={() => {
                  setError('Social authentication is currently in sandbox mode.');
                }}
                className="flex items-center justify-center gap-2 py-3.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-350 transition-all bg-white shadow-sm font-bold text-sm text-slate-700 cursor-pointer"
              >
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
        </div>
      </div>
    </div>
  );
}
