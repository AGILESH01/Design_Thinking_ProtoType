import { useState } from 'react';
import { ArrowLeft, User, Building2, Users, Lightbulb, ShieldCheck, X } from 'lucide-react';
import type { Screen, Contact } from '../types';

interface PayScreenProps {
  navigate: (screen: Screen) => void;
  contact: Contact;
  onPay: (amount: number, name: string, message: string) => void;
}

export default function PayScreen({ navigate, contact, onPay }: PayScreenProps) {
  const [amount, setAmount] = useState('500');
  const [message, setMessage] = useState('For family support');
  const [method, setMethod] = useState('upi');

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Building2': return Building2;
      case 'Users': return Users;
      case 'Lightbulb': return Lightbulb;
      default: return User;
    }
  };

  const IconComponent = getIcon(contact.iconName);

  const handlePay = () => {
    const numAmount = parseInt(amount, 10);
    if (!isNaN(numAmount) && numAmount > 0) {
      onPay(numAmount, contact.name, message);
    }
  };

  const paymentMethods = [
    { id: 'upi', label: 'UPI (Google Pay / BHIM / Paytm)', icon: '📱', sub: 'Linked to 9876543210' },
    { id: 'bank', label: 'Bank Account', icon: '🏦', sub: 'HDFC Bank - •••• 5678' },
    { id: 'card', label: 'Debit / Credit Card', icon: '💳', sub: 'Visa - •••• 1234' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={() => navigate('recipient')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Pay</h1>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {/* Recipient Card */}
        <div className="flex items-center gap-4 bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 border-transparent ${contact.bg}`}>
            <IconComponent size={32} className={contact.color} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {contact.name}
            </h2>
            <div className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-0.5 rounded text-sm font-bold w-max mt-1 mb-1 border border-green-200">
              <ShieldCheck size={16} /> Verified
            </div>
            <p className="text-gray-500 text-sm font-medium">UPI ID : {contact.upiId}</p>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-lg font-bold text-gray-800 mb-2">Enter Amount</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-3xl font-bold text-gray-600">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-12 pr-12 py-4 text-3xl font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              placeholder="0"
            />
            {amount && (
              <button 
                onClick={() => setAmount('')}
                className="absolute right-4 p-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="mb-8">
          <label className="block text-lg font-bold text-gray-800 mb-2">Add a message (optional)</label>
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            placeholder="What is this for?"
          />
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-lg font-bold text-gray-800 mb-3">Select Payment Method</label>
          <div className="space-y-3">
            {paymentMethods.map(opt => (
              <label 
                key={opt.id} 
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${method === opt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
              >
                <div className="text-2xl">{opt.icon}</div>
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-900">{opt.label}</div>
                  {method === opt.id && (
                    <div className="text-sm font-medium text-gray-600 mt-1">{opt.sub}</div>
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${method === opt.id ? 'border-blue-600' : 'border-gray-300'}`}>
                  {method === opt.id && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
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

        {/* Pay Button */}
        <button 
          onClick={handlePay}
          className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-2xl py-5 rounded-2xl shadow-lg transition-transform active:scale-[0.98] mt-2"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
