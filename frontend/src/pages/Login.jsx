import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Mail, Lock, ArrowRight, User, 
  ShieldCheck, Sparkles, Star, Eye, EyeOff, Loader2, AlertCircle, Check, LogOut, Laptop, Globe, Landmark
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import loginIllustration from '../assets/login_illustration.png';


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

  // Admin users should be redirected to admin dashboard and not see the student portal
  useEffect(() => {
    if (isLoggedIn && user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [isLoggedIn, user, navigate]);

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
          navigate('/');
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
                  className="w-full bg-[#110051] hover:bg-[#1a0073] text-white font-bold py-3 rounded-xl text-xs transition-all duration-300 cursor-pointer"
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
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-slate-50 flex">
      
      {/* Left Side - Visuals & Branding */}
      <div className="hidden lg:flex lg:w-1/2 lg:h-screen relative bg-gradient-to-br from-[#110051] to-[#1e1a4f] p-8 flex-col justify-between overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-mint/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top Header */}
        <div className="relative z-10 text-left">
          <Link to="/" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <span className="font-display font-black text-3xl tracking-tight text-white">
              edeco<span className="text-[#6affd9] font-black">.</span>
            </span>
          </Link>
        </div>

        {/* Dynamic Center Panel with 3D Illustration */}
        <div className="relative z-10 my-auto max-w-lg mx-auto w-full space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-text' : 'signup-text'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 text-left"
            >
              <h1 className="text-4xl font-display font-black leading-tight text-white">
                {isLogin ? "Learn Smarter,\nAchieve More" : "Start your journey today."}
              </h1>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                {isLogin 
                  ? "The all-in-one admissions counseling platform for students to navigate study pathways, compare courses, and connect with expert advisors."
                  : "Join thousands of students making data-backed admissions decisions. Unlock premium cutoff insights and verify college records."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Bullet Points */}
          <div className="space-y-3 pt-1 text-left">
            <div className="flex items-center gap-3 text-slate-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#6affd9] border border-white/5 shrink-0">
                <GraduationCap size={16} />
              </div>
              <span className="text-xs font-bold">Expert Admissions Advisors</span>
            </div>
            <div className="flex items-center gap-3 text-slate-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#6affd9] border border-white/5 shrink-0">
                <Sparkles size={16} />
              </div>
              <span className="text-xs font-bold">Real-time Application Trackers</span>
            </div>
            <div className="flex items-center gap-3 text-slate-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#6affd9] border border-white/5 shrink-0">
                <Globe size={16} />
              </div>
              <span className="text-xs font-bold">Global Universities & Cutoff Insights</span>
            </div>
          </div>

          {/* Floating Illustration Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-[24px] overflow-hidden bg-white/5 border border-white/10 p-1.5 shadow-2xl max-w-sm mx-auto w-full"
          >
            <img 
              src={loginIllustration} 
              alt="Premium 3D Illustration" 
              className="w-full max-h-[22vh] object-cover rounded-[16px]"
            />
          </motion.div>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 pt-4 border-t border-white/10 text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Partnered with top tier campuses</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-black text-slate-300 uppercase tracking-wider">
            <span>IIT Bombay</span>
            <span>IIM Ahmedabad</span>
            <span>BITS Pilani</span>
            <span>AIIMS</span>
            <span>SIBM Pune</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 lg:h-screen flex flex-col justify-between p-5 sm:p-8 lg:p-10 bg-white overflow-y-auto">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between w-full shrink-0 mb-3">
          <Link to="/" className="lg:hidden flex items-center gap-1.5">
            <span className="font-display font-black text-2xl tracking-tight text-slate-900">
              edeco<span className="text-brand-500 font-black">.</span>
            </span>
          </Link>
          <div className="hidden lg:block" />
          
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setValidationErrors({});
              }}
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {isLogin ? "Create Account" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Form Card container */}
        <div className="w-full max-w-md mx-auto my-auto relative p-5 sm:p-6 border border-slate-150 rounded-[24px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] bg-white">
          
          {/* Glassmorphic Success Overlay */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center text-center rounded-[32px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-500/20 flex items-center justify-center text-emerald-600 mb-6 shadow-md shadow-emerald-500/10"
                >
                  <Check size={32} className="stroke-[3]" />
                </motion.div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  {isLogin ? "Welcome Back!" : "Account Created!"}
                </h3>
                <p className="text-xs text-slate-500 font-semibold max-w-xs">
                  {isLogin 
                    ? "Welcome back. Redirecting you to your portal..." 
                    : "Registration successful. Redirecting you to home..."}
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                  <Loader2 size={16} className="animate-spin text-slate-900" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Connecting to session...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key={isLogin ? 'login' : 'signup'}
            animate={shake ? "shake" : ""}
            variants={shakeVariants}
            className="space-y-4"
          >
            <div className="text-left">
              <h2 className="text-2xl font-black text-slate-900 mb-1">
                {isLogin ? "Welcome back" : "Create your account"}
              </h2>
              <p className="text-xs text-slate-450 font-bold">
                {isLogin 
                  ? "Sign in to continue your learning journey" 
                  : "Sign up below to access premium university advice"}
              </p>
            </div>

            {/* Error Alert Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-3 text-left"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Name Field - Only in Sign Up */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden text-left"
                  >
                    <div className="pb-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <User size={16} className="text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={localLoading}
                          className={`w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border rounded-xl focus:bg-white focus:ring-4 focus:ring-slate-900/5 outline-none transition-all font-semibold text-slate-900 text-sm placeholder:text-slate-400 ${
                            validationErrors.name ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-slate-800'
                          }`}
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      {validationErrors.name && (
                        <p className="text-[11px] text-red-500 font-bold mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {validationErrors.name}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div className="text-left">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Email address</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail size={16} className="text-slate-400" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={localLoading}
                    className={`w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border rounded-xl focus:bg-white focus:ring-4 focus:ring-slate-900/5 outline-none transition-all font-semibold text-slate-900 text-sm placeholder:text-slate-400 ${
                      validationErrors.email ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-slate-800'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-[11px] text-red-500 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="text-left">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Password</label>
                </div>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock size={16} className="text-slate-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={localLoading}
                    className={`w-full pl-10 pr-10 py-2.5 bg-[#f8fafc] border rounded-xl focus:bg-white focus:ring-4 focus:ring-slate-900/5 outline-none transition-all font-semibold text-slate-900 text-sm placeholder:text-slate-400 ${
                      validationErrors.password ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-slate-800'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-[11px] text-red-500 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {validationErrors.password}
                  </p>
                )}

                {/* Password Strength Indicator (Signup Only) */}
                {!isLogin && password.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="mt-3"
                  >
                    <div className="flex gap-1 h-1 w-full rounded-full overflow-hidden bg-slate-100">
                      <div className={`h-full transition-all duration-300 w-1/3 ${strength >= 1 ? strengthColors[strength] : 'bg-transparent'}`}></div>
                      <div className={`h-full transition-all duration-300 w-1/3 ${strength >= 2 ? strengthColors[strength] : 'bg-transparent'}`}></div>
                      <div className={`h-full transition-all duration-300 w-1/3 ${strength >= 3 ? strengthColors[strength] : 'bg-transparent'}`}></div>
                    </div>
                    <p className={`text-[10px] font-bold mt-1.5 ${strength === 3 ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {strengthLabels[strength]}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs font-bold pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" className="w-4 h-4 text-[#110051] border-slate-200 rounded-sm focus:ring-[#110051]/30" />
                  <span>Remember me</span>
                </label>
                {isLogin && (
                  <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors">
                    Forgot password?
                  </a>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={localLoading}
                className="w-full bg-[#110051] hover:bg-[#1a0073] text-white font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group mt-4 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-sm shadow-sm"
              >
                {localLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Social Separator */}
            <div className="flex items-center gap-4 py-1.5">
              <div className="flex-1 h-[1px] bg-slate-100"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or continue with</span>
              <div className="flex-1 h-[1px] bg-slate-100"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {['Google', 'Microsoft', 'Apple'].map((prov) => (
                <button 
                  key={prov}
                  type="button"
                  onClick={() => {
                    setError('Social authentication is currently in sandbox mode.');
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-350 transition-all bg-white font-bold text-xs text-slate-600 cursor-pointer shadow-xs"
                >
                  {prov === 'Google' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    </svg>
                  )}
                  {prov === 'Microsoft' && (
                    <svg className="w-4 h-4" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M0 0h11v11H0z" />
                      <path fill="#80bb0a" d="M12 0h11v11H12z" />
                      <path fill="#00a1f1" d="M0 12h11v11H0z" />
                      <path fill="#ffb900" d="M12 12h11v11H12z" />
                    </svg>
                  )}
                  {prov === 'Apple' && (
                    <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.79 17.3 3.5 11.24 6.22 6.58c1.35-2.3 3.55-2.42 4.72-1.74 1.48.86 2.16.8 3.32 0 1.54-.92 3.42-.76 4.6 1.02-3.1 1.86-2.58 5.86.5 7.1-1.24 3.08-2.92 6.04-5.31 8.32zM12.03 4.8c-.28-2.34 1.54-4.54 3.8-4.8.44 2.68-2.02 4.96-3.8 4.8z" />
                    </svg>
                  )}
                  <span>{prov}</span>
                </button>
              ))}
            </div>

            {/* Switch sign-in / sign-up mobile toggle link */}
            <div className="pt-1 text-center text-xs font-bold text-slate-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setValidationErrors({});
                }}
                className="text-[#110051] hover:underline focus:outline-none font-extrabold"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

          </motion.div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="w-full flex items-center justify-between gap-2 border-t border-slate-100 pt-3 mt-3 text-left shrink-0">
          <div className="flex items-start gap-2 max-w-[120px]">
            <div className="p-1.5 rounded-lg bg-slate-50 text-slate-500 shrink-0 mt-0.5">
              <ShieldCheck size={14} />
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-800 leading-tight">Secure & Private</h5>
              <p className="text-[8px] text-slate-400 font-medium leading-normal mt-0.5">Encrypted with 256-bit security protocols.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 max-w-[120px]">
            <div className="p-1.5 rounded-lg bg-slate-50 text-slate-500 shrink-0 mt-0.5">
              <Laptop size={14} />
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-800 leading-tight">Access Anywhere</h5>
              <p className="text-[8px] text-slate-400 font-medium leading-normal mt-0.5">Log in from mobile, tablet, or desktop.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 max-w-[120px]">
            <div className="p-1.5 rounded-lg bg-slate-50 text-slate-500 shrink-0 mt-0.5">
              <Landmark size={14} />
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-800 leading-tight">Top-tier Partners</h5>
              <p className="text-[8px] text-slate-400 font-medium leading-normal mt-0.5">Integrated directly with top tier campuses.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
