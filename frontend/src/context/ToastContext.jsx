import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message, duration) => showToast(message, 'success', duration), [showToast]);
  const error = useCallback((message, duration) => showToast(message, 'error', duration), [showToast]);
  const info = useCallback((message, duration) => showToast(message, 'info', duration), [showToast]);
  const warning = useCallback((message, duration) => showToast(message, 'warning', duration), [showToast]);

  const value = {
    showToast,
    success,
    error,
    info,
    warning,
    removeToast
  };

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800',
          text: 'text-emerald-900 dark:text-emerald-100',
          iconColor: 'text-emerald-500',
          progressColor: 'bg-emerald-500',
          Icon: CheckCircle2
        };
      case 'error':
        return {
          bg: 'bg-rose-50/90 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800',
          text: 'text-rose-900 dark:text-rose-100',
          iconColor: 'text-rose-500',
          progressColor: 'bg-rose-500',
          Icon: XCircle
        };
      case 'warning':
        return {
          bg: 'bg-amber-50/90 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800',
          text: 'text-amber-900 dark:text-amber-100',
          iconColor: 'text-amber-500',
          progressColor: 'bg-amber-500',
          Icon: AlertCircle
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800',
          text: 'text-blue-900 dark:text-blue-100',
          iconColor: 'text-blue-500',
          progressColor: 'bg-blue-500',
          Icon: Info
        };
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed top-6 right-6 z-[99999] flex flex-col gap-3 w-full max-w-[360px] pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const styles = getToastStyles(toast.type);
            const { Icon } = styles;
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.85, transition: { duration: 0.2 } }}
                className={`pointer-events-auto relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-lg p-4 flex items-start gap-3.5 transition-all duration-300 hover:shadow-xl ${styles.bg}`}
              >
                <div className={`mt-0.5 shrink-0 ${styles.iconColor}`}>
                  <Icon size={20} className="stroke-[2.5]" />
                </div>
                
                <div className="flex-1 pr-4">
                  <p className={`text-[13.5px] font-semibold leading-relaxed tracking-tight ${styles.text}`}>
                    {toast.message}
                  </p>
                </div>

                <button 
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-lg hover:bg-slate-200/20"
                >
                  <X size={14} className="stroke-[2.5]" />
                </button>

                {/* Animated progress bar indicator */}
                <motion.div 
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                  className={`absolute bottom-0 left-0 h-1.5 ${styles.progressColor}`}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
