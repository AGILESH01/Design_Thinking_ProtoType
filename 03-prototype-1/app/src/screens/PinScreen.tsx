import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Lock, Delete, Eye, EyeOff, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import type { Screen, Contact } from '../types';
import { DEMO_PIN } from '../utils/formatters';

interface PinScreenProps {
  navigate: (screen: Screen) => void;
  contact: Contact;
  amount: number;
  message: string;
  method: string;
  onAuthorize: () => void;
}

export default function PinScreen({
  navigate,
  contact,
  amount,
  onAuthorize,
}: PinScreenProps) {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitPin = useCallback((enteredPin: string) => {
    if (enteredPin.length !== 4) {
      setError('Please enter all 4 digits of your UPI PIN.');
      return;
    }

    if (enteredPin !== DEMO_PIN) {
      setError(`Incorrect PIN. Please enter the demo PIN: ${DEMO_PIN}`);
      return;
    }

    // Authorized! Simulate bank verification delay
    setIsSubmitting(true);
    setTimeout(() => {
      onAuthorize();
    }, 1200);
  }, [onAuthorize]);

  // Allow hardware keyboard typing for desktop testing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitting) return;

      if (e.key >= '0' && e.key <= '9') {
        if (pin.length < 4) {
          setError(null);
          setPin(prev => prev + e.key);
        }
      } else if (e.key === 'Backspace') {
        setError(null);
        setPin(prev => prev.slice(0, -1));
      } else if (e.key === 'Enter' && pin.length === 4) {
        handleSubmitPin(pin);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isSubmitting, handleSubmitPin]);

  const handleKeyPress = (num: string) => {
    if (isSubmitting || pin.length >= 4) return;
    setError(null);
    const newPin = pin + num;
    setPin(newPin);
    if (newPin.length === 4) {
      handleSubmitPin(newPin);
    }
  };

  const handleDelete = () => {
    if (isSubmitting) return;
    setError(null);
    setPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (isSubmitting) return;
    setError(null);
    setPin('');
  };

  const handleUseDemoPin = () => {
    if (isSubmitting) return;
    setError(null);
    setPin(DEMO_PIN);
    handleSubmitPin(DEMO_PIN);
  };

  return (
    <div className="flex flex-col min-h-full bg-white relative pb-10">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button 
          onClick={() => navigate('review')} 
          disabled={isSubmitting}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          aria-label="Back to review"
        >
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <div className="ml-3">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Authorize Payment</h1>
          <p className="text-xs font-semibold text-gray-500">Step 3 of 3: Enter UPI PIN</p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col items-center justify-between">
        {/* Context Strip */}
        <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-center mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Authorization</p>
          <div className="text-2xl font-extrabold text-gray-900 mt-0.5">
            ₹ {amount.toLocaleString('en-IN')}
          </div>
          <p className="text-sm font-bold text-blue-700 mt-0.5">to {contact.name}</p>
        </div>

        {/* PIN Entry Area */}
        <div className="w-full flex flex-col items-center my-2">
          <div className="flex items-center gap-2 text-gray-700 font-bold mb-3 text-base">
            <Lock size={18} className="text-green-700" />
            <span>Enter 4-Digit UPI PIN</span>
          </div>

          {/* 4 Digit Boxes */}
          <div className="flex items-center justify-center gap-4 mb-3">
            {[0, 1, 2, 3].map((index) => {
              const digit = pin[index];
              const isFilled = digit !== undefined;
              return (
                <div 
                  key={index}
                  className={`w-14 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl font-extrabold transition-all shadow-sm ${
                    error
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : isFilled
                      ? 'border-blue-600 bg-blue-50/50 text-gray-900'
                      : 'border-gray-300 bg-gray-50 text-transparent'
                  }`}
                >
                  {isFilled ? (showPin ? digit : '•') : ''}
                </div>
              );
            })}
          </div>

          {/* Show / Hide PIN Toggle */}
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            {showPin ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>{showPin ? 'Hide Digits' : 'Show Digits'}</span>
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-3 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold text-center">
              {error}
            </div>
          )}

          {/* Demo Hint Banner with Auto-fill helper */}
          <div className="mt-3 flex items-center justify-between gap-3 bg-purple-50 border border-purple-200 px-3.5 py-2 rounded-xl w-full max-w-[320px]">
            <span className="text-xs font-bold text-purple-900">
              Demo PIN: <span className="font-mono text-sm tracking-wider font-extrabold">{DEMO_PIN}</span>
            </span>
            <button
              type="button"
              onClick={handleUseDemoPin}
              disabled={isSubmitting}
              className="text-xs font-extrabold bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1 rounded-lg transition-colors shadow-xs"
            >
              Fill PIN
            </button>
          </div>
        </div>

        {/* Tactile Large Keypad (Accessibility optimized for seniors) */}
        <div className="w-full max-w-[320px] mt-2 mb-4">
          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num)}
                disabled={isSubmitting}
                className="h-14 bg-gray-100 hover:bg-gray-200 active:bg-blue-100 border border-gray-200 rounded-2xl text-2xl font-bold text-gray-900 transition-all flex items-center justify-center active:scale-95 shadow-xs disabled:opacity-50"
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting || pin.length === 0}
              className="h-14 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 border border-gray-200 rounded-2xl text-sm font-extrabold text-gray-700 transition-all flex items-center justify-center active:scale-95 shadow-xs disabled:opacity-40"
            >
              CLEAR
            </button>

            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              disabled={isSubmitting}
              className="h-14 bg-gray-100 hover:bg-gray-200 active:bg-blue-100 border border-gray-200 rounded-2xl text-2xl font-bold text-gray-900 transition-all flex items-center justify-center active:scale-95 shadow-xs disabled:opacity-50"
            >
              0
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting || pin.length === 0}
              className="h-14 bg-gray-100 hover:bg-gray-200 active:bg-red-100 border border-gray-200 rounded-2xl text-gray-800 transition-all flex items-center justify-center active:scale-95 shadow-xs disabled:opacity-40"
              aria-label="Backspace"
            >
              <Delete size={24} />
            </button>
          </div>
        </div>

        {/* Security Rule Footer */}
        <div className="w-full flex items-center gap-2.5 bg-yellow-50 border border-yellow-200 px-3.5 py-2.5 rounded-xl text-yellow-900">
          <ShieldAlert size={20} className="text-yellow-700 flex-shrink-0" />
          <p className="text-[11px] font-semibold leading-tight">
            <strong>Security Reminder:</strong> UPI PIN is strictly for sending money. Never enter PIN when receiving funds.
          </p>
        </div>
      </div>

      {/* Authorizing Modal Overlay during Bank Verification */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center z-30 p-6 text-center animate-fade-in">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border-4 border-blue-200 mb-4 shadow-md">
            <Loader2 size={40} className="text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Authorizing Payment</h2>
          <p className="text-sm font-semibold text-gray-600 max-w-xs">
            Connecting securely to bank... Please do not close or press back.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200">
            <CheckCircle2 size={14} /> PIN Verified Securely
          </div>
        </div>
      )}
    </div>
  );
}
