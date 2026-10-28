import { useState, useId } from 'react';
import { ArrowLeft, User, Building2, Users, Lightbulb, ShieldCheck, X, AlertTriangle, Wallet } from 'lucide-react';
import type { Screen, Contact } from '../types';
import { MAX_TRANSACTION_LIMIT, MIN_TRANSACTION_LIMIT, numberToWords } from '../utils/formatters';

interface PayScreenProps {
  navigate: (screen: Screen) => void;
  contact: Contact;
  balance: number;
  initialAmount?: string;
  initialMessage?: string;
  initialMethod?: string;
  onProceedToReview: (amount: number, message: string, method: string) => void;
}

const ICON_MAP = {
  Building2,
  Users,
  Lightbulb,
  User,
} as const;

export default function PayScreen({
  navigate,
  contact,
  balance,
  initialAmount = '500',
  initialMessage = 'For family support',
  initialMethod = 'upi',
  onProceedToReview,
}: PayScreenProps) {
  const [amount, setAmount] = useState(initialAmount);
  const [message, setMessage] = useState(initialMessage);
  const [method, setMethod] = useState(initialMethod);

  const amountInputId = useId();
  const messageInputId = useId();

  const Icon = ICON_MAP[contact.iconName] || User;
  const numAmount = parseInt(amount, 10);
  const isNaNValue = isNaN(numAmount) || amount.trim() === '';

  // Validation states
  const isZeroOrNegative = !isNaNValue && numAmount < MIN_TRANSACTION_LIMIT;
  const isExceedingLimit = !isNaNValue && numAmount > MAX_TRANSACTION_LIMIT;
  const isExceedingBalance = !isNaNValue && numAmount > balance;
  const isValid = !isNaNValue && !isZeroOrNegative && !isExceedingLimit && !isExceedingBalance;

  const handleReview = () => {
    if (isValid) {
      onProceedToReview(numAmount, message.trim(), method);
    }
  };

  const quickAmounts = [100, 500, 1000, 2000];

  const paymentMethods = [
    { id: 'upi', label: 'UPI (Google Pay / BHIM / Paytm)', icon: '📱', sub: 'Linked to 9876543210' },
    { id: 'bank', label: 'Bank Account', icon: '🏦', sub: 'HDFC Bank - •••• 5678' },
    { id: 'card', label: 'Debit / Credit Card', icon: '💳', sub: 'Visa - •••• 1234' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-12">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button 
          onClick={() => navigate('recipient')} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Back to recipient selection"
        >
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <div className="ml-3">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Enter Amount</h1>
          <p className="text-xs font-semibold text-gray-500">Step 1 of 3: Payment Details</p>
        </div>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-5">
        {/* Recipient Card (Trust Mode Verified) */}
        <div className="flex items-center justify-between bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${contact.bg}`}>
              <Icon size={28} className={contact.color} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-lg font-bold text-gray-900 truncate">{contact.name}</h2>
                <span className="inline-flex items-center gap-0.5 text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs font-bold border border-green-200">
                  <ShieldCheck size={13} /> Verified
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium truncate">{contact.upiId}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('recipient')}
            className="text-blue-600 font-bold text-sm px-2 py-1 hover:bg-blue-50 rounded-lg transition-colors ml-2"
          >
            Change
          </button>
        </div>

        {/* Available Balance Preview Card */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wide">Available Balance</p>
              <p className="text-xl font-extrabold text-blue-950">₹ {balance.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-white text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
            Trust Safe
          </span>
        </div>

        {/* Amount Input */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm">
          <label htmlFor={amountInputId} className="block text-base font-bold text-gray-800 mb-2">
            Payment Amount
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-3xl font-extrabold text-gray-700 select-none">₹</span>
            <input 
              id={amountInputId}
              type="number" 
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full pl-12 pr-12 py-4 text-3xl font-extrabold text-gray-900 bg-gray-50 border-2 rounded-xl transition-all outline-none ${
                isExceedingBalance || isExceedingLimit
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'
              }`}
              placeholder="0"
            />
            {amount && (
              <button 
                onClick={() => setAmount('')}
                className="absolute right-4 p-1.5 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
                aria-label="Clear amount"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Amount in Words for Senior Error Prevention */}
          {!isNaNValue && numAmount > 0 && !isExceedingLimit && (
            <div className="mt-2.5 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Amount in Words:</p>
              <p className="text-sm font-bold text-purple-900 leading-snug">{numberToWords(numAmount)}</p>
            </div>
          )}

          {/* Quick Preset Buttons for Seniors */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">Quick amounts:</p>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q.toString())}
                  className={`py-2 text-sm font-bold rounded-xl border-2 transition-all ${
                    amount === q.toString()
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-100 active:scale-95'
                  }`}
                >
                  ₹{q.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Validation Warning Messages (Senior Trust Mode alerts) */}
        {isExceedingBalance && (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h4 className="text-base font-bold text-red-900">Insufficient Balance</h4>
              <p className="text-sm font-medium text-red-700 leading-snug mt-0.5">
                You entered ₹{numAmount.toLocaleString('en-IN')}, but your account balance is only ₹{balance.toLocaleString('en-IN')}. Please enter a smaller amount.
              </p>
            </div>
          </div>
        )}

        {isExceedingLimit && (
          <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
            <AlertTriangle className="text-orange-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h4 className="text-base font-bold text-orange-900">Maximum Limit Exceeded</h4>
              <p className="text-sm font-medium text-orange-800 leading-snug mt-0.5">
                For senior safety, the maximum per-transaction limit is ₹{MAX_TRANSACTION_LIMIT.toLocaleString('en-IN')}. Please enter ₹{MAX_TRANSACTION_LIMIT.toLocaleString('en-IN')} or less.
              </p>
            </div>
          </div>
        )}

        {isZeroOrNegative && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 flex items-center gap-2">
            <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
            <p className="text-sm font-bold text-amber-900">Minimum payment amount is ₹1.</p>
          </div>
        )}

        {isValid && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-bold text-green-800">
            <span>✓ Balance Check Passed</span>
            <span>₹{(balance - numAmount).toLocaleString('en-IN')} remaining balance</span>
          </div>
        )}

        {/* Message Input */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm">
          <label htmlFor={messageInputId} className="block text-base font-bold text-gray-800 mb-2">
            Add a note / message (optional)
          </label>
          <input 
            id={messageInputId}
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3.5 text-base font-medium text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            placeholder="e.g. Milk, Groceries, Rent..."
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm">
          <label className="block text-base font-bold text-gray-800 mb-3">Pay From Account</label>
          <div className="space-y-3">
            {paymentMethods.map((opt) => (
              <label 
                key={opt.id} 
                className={`flex items-center gap-3.5 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                  method === opt.id ? 'border-blue-600 bg-blue-50/70' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl">{opt.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-gray-900 leading-snug">{opt.label}</div>
                  <div className="text-xs font-semibold text-gray-500 mt-0.5">{opt.sub}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  method === opt.id ? 'border-blue-600' : 'border-gray-300'
                }`}>
                  {method === opt.id && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                </div>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value={opt.id} 
                  checked={method === opt.id}
                  onChange={() => setMethod(opt.id)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Review Payment CTA Button */}
        <button 
          onClick={handleReview}
          disabled={!isValid}
          className={`w-full font-bold text-xl py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 ${
            isValid 
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white cursor-pointer active:scale-[0.99]' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
          }`}
        >
          {isExceedingBalance 
            ? 'Cannot Proceed: Insufficient Balance' 
            : isExceedingLimit 
            ? 'Cannot Proceed: Limit Exceeded' 
            : 'Review Payment'}
        </button>
      </div>
    </div>
  );
}
