import { ArrowLeft, CheckCircle } from 'lucide-react';
import type { Screen, Contact } from '../types';

interface ConfirmScreenProps {
  navigate: (screen: Screen) => void;
  paymentDetails: { name: string; amount: number; message: string } | null;
  contact: Contact;
}

export default function ConfirmScreen({ navigate, paymentDetails, contact }: ConfirmScreenProps) {
  const amount = paymentDetails?.amount || 500;
  const name = paymentDetails?.name || contact.name;
  const message = paymentDetails?.message || 'For family support';

  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={() => navigate('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Confirm Payment</h1>
      </div>

      <div className="p-6 flex-1 flex flex-col items-center">
        {/* Success Banner */}
        <div className="w-full bg-green-50 border-2 border-green-200 rounded-3xl p-8 flex flex-col items-center text-center mb-8 shadow-sm">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-md">
            <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
          <div className="text-5xl font-extrabold text-gray-900 my-4 tracking-tight">₹ {amount.toLocaleString('en-IN')}</div>
          <p className="text-xl font-bold text-gray-700">to {name}</p>
          <p className="text-base font-medium text-gray-500 mt-2">
            Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>

        {/* Details List */}
        <div className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl p-5 mb-8">
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-lg font-medium text-gray-500">Name</span>
            <span className="text-lg font-bold text-gray-900 text-right">{name}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-lg font-medium text-gray-500">UPI ID</span>
            <span className="text-lg font-bold text-gray-900 text-right">{contact.upiId}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-lg font-medium text-gray-500">Amount</span>
            <span className="text-lg font-bold text-gray-900 text-right">₹ {amount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-3 pt-3">
            <span className="text-lg font-medium text-gray-500">Message</span>
            <span className="text-lg font-bold text-gray-900 text-right w-1/2 break-words">{message}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-4 mt-auto">
          <button onClick={() => navigate('receipt')} className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xl py-4 rounded-xl shadow-md transition-transform active:scale-[0.98]">
            View Receipt
          </button>
          <button 
            onClick={() => navigate('home')}
            className="w-full bg-white border-2 border-blue-600 hover:bg-blue-50 active:bg-blue-100 text-blue-700 font-bold text-xl py-4 rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
