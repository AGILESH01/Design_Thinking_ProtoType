import { ArrowLeft, CheckCircle, Wallet, ShieldCheck } from 'lucide-react';
import type { Screen, Contact, PaymentDetails } from '../types';
import { numberToWords } from '../utils/formatters';

interface ConfirmScreenProps {
  navigate: (screen: Screen) => void;
  paymentDetails: PaymentDetails | null;
  contact: Contact;
}

export default function ConfirmScreen({ navigate, paymentDetails, contact }: ConfirmScreenProps) {
  const amount = paymentDetails?.amount || 500;
  const name = paymentDetails?.name || contact.name;
  const message = paymentDetails?.message || 'For family support';
  const remainingBalance = paymentDetails?.remainingBalance;
  const transactionId = paymentDetails?.transactionId || 'T482910485';
  const dateStr = paymentDetails?.date || 'Today, 12:00 PM';

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-16">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button 
          onClick={() => navigate('home')} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <div className="ml-3">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Payment Result</h1>
          <p className="text-xs font-semibold text-gray-500">Transaction Completed</p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col items-center overflow-y-auto space-y-4">
        {/* Success Banner */}
        <div className="w-full bg-green-50 border-2 border-green-300 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm">
          <div className="w-18 h-18 bg-green-500 rounded-full flex items-center justify-center mb-3 shadow-md">
            <CheckCircle size={44} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-1.5 text-green-800 font-extrabold text-2xl">
            Payment Successful!
          </div>
          <div className="text-4xl font-extrabold text-gray-900 my-2 tracking-tight">
            ₹ {amount.toLocaleString('en-IN')}
          </div>
          <div className="text-xs font-bold text-green-900 bg-green-100/80 px-3 py-1 rounded-full border border-green-200">
            {numberToWords(amount)}
          </div>
          <p className="text-base font-bold text-gray-800 mt-2">Paid to {name}</p>
          <p className="text-xs font-semibold text-gray-500 mt-0.5">{dateStr}</p>
        </div>

        {/* Details List */}
        <div className="w-full bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex justify-between items-center text-sm py-1.5 border-b border-gray-100">
            <span className="font-medium text-gray-500">Recipient Name</span>
            <span className="font-bold text-gray-900 text-right flex items-center gap-1">
              {name}
              <ShieldCheck size={14} className="text-green-600" />
            </span>
          </div>

          <div className="flex justify-between items-center text-sm py-1.5 border-b border-gray-100">
            <span className="font-medium text-gray-500">UPI ID</span>
            <span className="font-bold text-gray-900 text-right">{contact.upiId}</span>
          </div>

          <div className="flex justify-between items-center text-sm py-1.5 border-b border-gray-100">
            <span className="font-medium text-gray-500">Transaction ID</span>
            <span className="font-mono text-xs font-bold text-gray-800 text-right">{transactionId}</span>
          </div>

          {remainingBalance !== undefined && (
            <div className="flex justify-between items-center text-sm py-2 bg-blue-50 px-3 rounded-xl border border-blue-200">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <Wallet size={16} /> Updated Balance
              </span>
              <span className="font-extrabold text-blue-950 text-base">
                ₹ {remainingBalance.toLocaleString('en-IN')}
              </span>
            </div>
          )}

          {message && (
            <div className="flex justify-between items-start text-sm pt-1">
              <span className="font-medium text-gray-500">Message</span>
              <span className="font-semibold text-gray-900 text-right max-w-[60%] break-words">{message}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3 pt-2 mt-auto">
          <button 
            onClick={() => navigate('receipt')} 
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-transform active:scale-[0.98]"
          >
            View Official Receipt
          </button>
          
          <button 
            onClick={() => navigate('home')}
            className="w-full bg-white border-2 border-blue-600 hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-bold text-lg py-3 rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
