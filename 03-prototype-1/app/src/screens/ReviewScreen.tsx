import { ArrowLeft, ShieldCheck, User, Building2, Users, Lightbulb, Wallet, ArrowRight, Edit3 } from 'lucide-react';
import type { Screen, Contact } from '../types';
import { numberToWords } from '../utils/formatters';

interface ReviewScreenProps {
  navigate: (screen: Screen) => void;
  contact: Contact;
  amount: number;
  message: string;
  method: string;
  balance: number;
  onProceedToPin: () => void;
}

const ICON_MAP = {
  Building2,
  Users,
  Lightbulb,
  User,
} as const;

export default function ReviewScreen({
  navigate,
  contact,
  amount,
  message,
  method,
  balance,
  onProceedToPin,
}: ReviewScreenProps) {
  const Icon = ICON_MAP[contact.iconName] || User;

  const getMethodLabel = (m: string) => {
    switch (m) {
      case 'bank': return 'HDFC Bank - •••• 5678';
      case 'card': return 'Debit Card - •••• 1234';
      default: return 'UPI (Linked to 9876543210)';
    }
  };

  const remainingBalance = balance - amount;

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-12">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button 
          onClick={() => navigate('pay')} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Back to edit amount"
        >
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <div className="ml-3">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Review Payment</h1>
          <p className="text-xs font-semibold text-gray-500">Step 2 of 3: Double Check Details</p>
        </div>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        {/* Trust Mode Reassurance Banner */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-700 mt-0.5">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-blue-900">Trust Mode Verification</h2>
            <p className="text-xs font-medium text-blue-800 leading-snug mt-0.5">
              Take your time to verify the recipient and amount. No money is deducted until you enter your UPI PIN.
            </p>
          </div>
        </div>

        {/* Big Amount Card */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 text-center shadow-sm">
          <p className="text-sm font-semibold text-gray-500 mb-1">Total Payment Amount</p>
          <div className="text-4xl font-extrabold text-gray-900 my-1 tracking-tight">
            ₹ {amount.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 bg-purple-50 text-purple-900 font-bold text-sm px-3 py-1.5 rounded-xl inline-block border border-purple-200">
            {numberToWords(amount)}
          </div>
        </div>

        {/* Recipient Details Card */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sending To</span>
            <button 
              onClick={() => navigate('recipient')}
              className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
            >
              <Edit3 size={13} /> Change
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${contact.bg}`}>
              <Icon size={28} className={contact.color} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-lg font-bold text-gray-900 truncate">{contact.name}</h3>
                <span className="inline-flex items-center gap-0.5 text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs font-bold border border-green-200">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium truncate">{contact.upiId}</p>
            </div>
          </div>
        </div>

        {/* Account and Balance Breakdown */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Payment Summary</span>
          
          <div className="flex justify-between items-center text-sm py-1 border-b border-gray-100">
            <span className="font-medium text-gray-600">Paying from</span>
            <span className="font-bold text-gray-900 text-right">{getMethodLabel(method)}</span>
          </div>

          <div className="flex justify-between items-center text-sm py-1 border-b border-gray-100">
            <span className="font-medium text-gray-600">Current Balance</span>
            <span className="font-bold text-gray-900">₹ {balance.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center text-sm py-1 border-b border-gray-100">
            <span className="font-medium text-gray-600">Amount Deducted</span>
            <span className="font-bold text-red-600">- ₹ {amount.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center text-sm py-1 bg-green-50 p-2.5 rounded-xl border border-green-200">
            <span className="font-bold text-green-900 flex items-center gap-1.5">
              <Wallet size={16} /> Balance After Payment
            </span>
            <span className="font-extrabold text-green-900 text-base">
              ₹ {remainingBalance.toLocaleString('en-IN')}
            </span>
          </div>

          {message && (
            <div className="flex justify-between items-start text-sm pt-1">
              <span className="font-medium text-gray-600">Note</span>
              <span className="font-semibold text-gray-800 text-right max-w-[60%] break-words">{message}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button 
            onClick={onProceedToPin}
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-xl py-4 rounded-2xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Proceed to Enter PIN</span>
            <ArrowRight size={22} />
          </button>

          <button 
            onClick={() => navigate('pay')}
            className="w-full bg-white border-2 border-gray-300 hover:bg-gray-100 text-gray-700 font-bold text-base py-3.5 rounded-2xl transition-colors"
          >
            Back to Edit Details
          </button>
        </div>
      </div>
    </div>
  );
}
