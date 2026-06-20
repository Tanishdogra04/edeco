import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Mail, Lock, ArrowRight, User, 
  ShieldCheck, Sparkles, Eye, EyeOff, Loader2, AlertCircle, Check, Laptop, Globe, Landmark
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import loginIllustration from '../assets/login_illustration.png';
import StudentDashboard from '../components/dashboard/StudentDashboard';


export default function Login() {
  const navigate = useNavigate();
  const { login, signup, sendVerificationCode, isLoggedIn, user, loading } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupStep, setSignupStep] = useState(1);
  const [otpCode, setOtpCode] = useState('');
  
  // UI & UX States
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Admin users should be redirected to admin dashboard and not see the student portal
  useEffect(() => {
    if (isLoggedIn && user && user.role === 'admin' && !success) {
      navigate('/admin');
    }
  }, [isLoggedIn, user, success, navigate]);



  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#0f71cd] mb-3" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Verifying Session...</span>
      </div>
    );
  }

  // Simple password strength calculator
  const getPasswordStrength = () => {
    if (!password) return 0;
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 3; // Strong
    if (password.length > 5) return 2; // Medium
    return 1; // Weak
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['Enter password', 'Weak (Minimum 6 characters)', 'Good', 'Strong'];
  const strengthColors = ['bg-slate-200', 'bg-red-400', 'bg-yellow-400', 'bg-[#0f71cd]'];

  const validateForm = () => {
    let errors = {};
    
    if (!isLogin && signupStep === 2) {
      if (!otpCode.trim()) {
        errors.otpCode = 'Verification code is required';
      } else if (otpCode.trim().length !== 6) {
        errors.otpCode = 'Verification code must be 6 digits';
      }
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    }

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
      } else if (signupStep === 1) {
        // Step 1: Send verification code
        res = await sendVerificationCode(email);
        if (res.success) {
          setSignupStep(2);
          setLocalLoading(false);
          return;
        }
      } else {
        // Step 2: Complete signup with OTP
        res = await signup(name, email, password, otpCode);
      }
      
      if (res.success) {
        setSuccess(true);
        const targetRole = res.user?.role || 'user';
        setTimeout(() => {
          setSuccess(false);
          if (targetRole === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 1500);
      } else {
        setError(res.error);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLocalLoading(true);
    try {
      const res = await sendVerificationCode(email);
      if (!res.success) {
        setError(res.error);
      }
    } catch {
      setError('Failed to resend code. Please try again.');
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

  if (isLoggedIn && user) {
    return <StudentDashboard key={user.email || user.name} />;
  }

  /* ====================================================
      FORM VIEW (LOGIN & SIGN UP)
  ==================================================== */
  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-slate-50 flex">
      
      {/* Left Side - Visuals & Branding */}
      <div className="hidden lg:flex lg:w-1/2 lg:h-screen relative bg-[#0F141E] p-8 flex-col justify-between overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0f71cd]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0f71cd]/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top Header */}
        <div className="relative z-10 text-left">
          <Link to="/" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <span className="font-tt-talent font-black text-3xl tracking-tight text-white" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              edeco<span className="text-[#0f71cd] font-black">.</span>
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
              <h1 className="text-4xl font-tt-talent font-black leading-tight text-white" style={{ fontFamily: '"TT Talent", sans-serif' }}>
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
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#0f71cd] border border-white/5 shrink-0">
                <GraduationCap size={16} />
              </div>
              <span className="text-xs font-bold">Expert Admissions Advisors</span>
            </div>
            <div className="flex items-center gap-3 text-slate-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#0f71cd] border border-white/5 shrink-0">
                <Sparkles size={16} />
              </div>
              <span className="text-xs font-bold">Real-time Application Trackers</span>
            </div>
            <div className="flex items-center gap-3 text-slate-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#0f71cd] border border-white/5 shrink-0">
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
        <div className="flex items-center justify-between w-full shrink-0 mb-3 text-left">
          <Link to="/" className="lg:hidden flex items-center gap-1.5">
            <span className="font-tt-talent font-black text-2xl tracking-tight text-[#0F141E]" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              edeco<span className="text-[#0f71cd] font-black">.</span>
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
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-[#0F141E] text-xs font-bold transition-all shadow-xs cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
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
                  className="w-16 h-16 rounded-full bg-[#0f71cd]/10 border-4 border-[#0f71cd]/20 flex items-center justify-center text-[#0f71cd] mb-6 shadow-md shadow-[#0f71cd]/10"
                >
                  <Check size={32} className="stroke-[3]" />
                </motion.div>
                <h3 className="text-xl font-black text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  {isLogin ? "Welcome Back!" : "Account Created!"}
                </h3>
                <p className="text-xs text-slate-500 font-semibold max-w-xs">
                  {isLogin 
                    ? "Welcome back. Redirecting you to your portal..." 
                    : "Registration successful. Redirecting you to home..."}
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                  <Loader2 size={16} className="animate-spin text-[#0F141E]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Connecting to session...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key={isLogin ? 'login' : `signup-step-${signupStep}`}
            animate={shake ? "shake" : ""}
            variants={shakeVariants}
            className="space-y-4"
          >
            <div className="text-left">
              <h2 className="text-2xl font-black text-[#0F141E] mb-1 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                {isLogin ? "Welcome back" : signupStep === 1 ? "Create your account" : "Verify your email"}
              </h2>
              <p className="text-xs text-slate-450 font-bold">
                {isLogin 
                  ? "Sign in to continue your learning journey" 
                  : signupStep === 1 
                  ? "Sign up below to access premium university advice"
                  : "We sent a 6-digit confirmation code to your email"}
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
              
              {/* STEP 1: Signup / Login Fields */}
              {(isLogin || signupStep === 1) && (
                <>
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
                              className={`w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border rounded-xl focus:bg-white focus:ring-4 focus:ring-[#0f71cd]/5 outline-none transition-all font-semibold text-[#0F141E] text-sm placeholder:text-slate-400 ${
                                validationErrors.name ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-[#0f71cd]'
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
                        className={`w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border rounded-xl focus:bg-white focus:ring-4 focus:ring-[#0f71cd]/5 outline-none transition-all font-semibold text-[#0F141E] text-sm placeholder:text-slate-400 ${
                          validationErrors.email ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-[#0f71cd]'
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
                        className={`w-full pl-10 pr-10 py-2.5 bg-[#f8fafc] border rounded-xl focus:bg-white focus:ring-4 focus:ring-[#0f71cd]/5 outline-none transition-all font-semibold text-[#0F141E] text-sm placeholder:text-slate-400 ${
                          validationErrors.password ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-[#0f71cd]'
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
                      <input type="checkbox" className="w-4 h-4 text-[#0f71cd] border-slate-200 rounded-sm focus:ring-[#0f71cd]/30" />
                      <span>Remember me</span>
                    </label>
                    {isLogin && (
                      <a href="#" className="text-slate-500 hover:text-[#0F141E] transition-colors">
                        Forgot password?
                      </a>
                    )}
                  </div>
                </>
              )}

              {/* STEP 2: Verification Code (OTP) Input Fields */}
              {!isLogin && signupStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 text-left"
                >
                  <div className="pb-1">
                    <p className="text-xs text-slate-500 font-semibold mb-4 leading-relaxed">
                      We have sent a 6-digit verification code to <strong className="text-slate-800 font-bold">{email}</strong>. Please enter it below to confirm your account.
                    </p>
                    
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Verification Code</label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <ShieldCheck size={16} className="text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        maxLength={6}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        disabled={localLoading}
                        className={`w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border rounded-xl focus:bg-white focus:ring-4 focus:ring-[#0f71cd]/5 outline-none transition-all font-semibold text-[#0F141E] text-sm placeholder:text-slate-400 tracking-[0.2em] text-center font-tt-talent ${
                          validationErrors.otpCode ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-[#0f71cd]'
                        }`}
                        style={{ fontFamily: '"TT Talent", sans-serif' }}
                        placeholder="••••••"
                      />
                    </div>
                    {validationErrors.otpCode && (
                      <p className="text-[11px] text-red-500 font-bold mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {validationErrors.otpCode}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSignupStep(1);
                        setOtpCode('');
                        setError('');
                        setValidationErrors({});
                      }}
                      className="text-slate-500 hover:text-[#0F141E] transition-colors font-bold cursor-pointer"
                    >
                      ← Change Email
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={localLoading}
                      className="text-[#0f71cd] hover:underline font-extrabold cursor-pointer disabled:opacity-50"
                    >
                      Resend Code
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={localLoading}
                className="w-full bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group mt-4 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-sm shadow-sm font-tt-talent"
                style={{ fontFamily: '"TT Talent", sans-serif' }}
              >
                {localLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? "Sign In" : signupStep === 1 ? "Send Verification Code" : "Verify & Register"}</span>
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
                  setSignupStep(1);
                  setOtpCode('');
                }}
                className="text-[#0f71cd] hover:underline focus:outline-none font-extrabold"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

          </motion.div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="w-full flex items-center justify-between gap-2 border-t border-slate-100 pt-3 mt-3 text-left shrink-0">
          <div className="flex items-start gap-2 max-w-[120px]">
            <div className="p-1.5 rounded-lg bg-slate-50 text-[#0f71cd] shrink-0 mt-0.5">
              <ShieldCheck size={14} />
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-800 leading-tight">Secure & Private</h5>
              <p className="text-[8px] text-slate-400 font-medium leading-normal mt-0.5">Encrypted with 255-bit security protocols.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 max-w-[120px]">
            <div className="p-1.5 rounded-lg bg-slate-50 text-[#0f71cd] shrink-0 mt-0.5">
              <Laptop size={14} />
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-800 leading-tight">Access Anywhere</h5>
              <p className="text-[8px] text-slate-400 font-medium leading-normal mt-0.5">Log in from mobile, tablet, or desktop.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 max-w-[120px]">
            <div className="p-1.5 rounded-lg bg-slate-50 text-[#0f71cd] shrink-0 mt-0.5">
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
