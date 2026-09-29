import { useState } from 'react';
import { ArrowUp, ArrowDown, ReceiptText, HelpCircle, ShieldAlert, Eye, EyeOff, User, Lightbulb, Building2, Users } from 'lucide-react';
import type { Screen, Contact } from '../types';
import { mockContacts } from '../data';

interface HomeScreenProps {
  navigate: (screen: Screen) => void;
  balance: number;
  onQuickPay: (contact: Contact) => void;
}

export default function HomeScreen({ navigate, balance, onQuickPay }: HomeScreenProps) {
  const [showBalance, setShowBalance] = useState(true);

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Building2': return Building2;
      case 'Users': return Users;
      case 'Lightbulb': return Lightbulb;
      default: return User;
    }
  };

  const quickContacts = mockContacts.slice(0, 4);

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-12">
      {/* Header Profile */}
      <div className="bg-white p-6 rounded-b-3xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate('profile')} className="flex items-center gap-4 text-left hover:opacity-80 transition-opacity">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200">
              <User size={28} className="text-blue-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hello, User</h1>
            </div>
          </button>
          <div className="text-gray-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white border-2 border-gray-200 p-5 rounded-2xl flex items-center justify-between mb-8 shadow-sm">
          <div>
            <p className="text-gray-500 font-medium text-lg mb-1">Your Balance</p>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                {showBalance ? `₹${balance.toLocaleString('en-IN')}` : '••••••'}
              </h2>
            </div>
          </div>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            aria-label={showBalance ? "Hide balance" : "Show balance"}
          >
            {showBalance ? <Eye size={26} /> : <EyeOff size={26} />}
          </button>
        </div>

        {/* 4 Main Action Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <button onClick={() => navigate('recipient')} className="flex flex-col items-center gap-2">
            <div className="w-[4.5rem] h-20 rounded-2xl border-4 border-green-500 bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors">
              <ArrowUp size={36} className="text-green-700" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">Pay</span>
          </button>
          <button onClick={() => navigate('receive')} className="flex flex-col items-center gap-2">
            <div className="w-[4.5rem] h-20 rounded-2xl border-4 border-blue-500 bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
              <ArrowDown size={36} className="text-blue-700" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">Receive</span>
          </button>
          <button onClick={() => navigate('history')} className="flex flex-col items-center gap-2">
            <div className="w-[4.5rem] h-20 rounded-2xl border-4 border-orange-800 bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors">
              <ReceiptText size={36} className="text-orange-900" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">History</span>
          </button>
          <button onClick={() => navigate('help')} className="flex flex-col items-center gap-2">
            <div className="w-[4.5rem] h-20 rounded-2xl border-4 border-orange-400 bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors">
              <HelpCircle size={36} className="text-orange-600" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">Help</span>
          </button>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Quick Pay */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Quick Pay</h3>
            <button onClick={() => navigate('recipient')} className="text-blue-600 font-semibold text-lg flex items-center hover:underline">
              See all <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
          
          <div className="flex justify-between">
            {quickContacts.map((contact) => {
              const IconComponent = getIcon(contact.iconName);
              return (
                <button key={contact.id} onClick={() => onQuickPay(contact)} className="flex flex-col items-center w-16 hover:opacity-80 transition-opacity">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 border-2 border-gray-200 ${contact.bg}`}>
                    <IconComponent size={24} className={contact.color} />
                  </div>
                  <span className="text-base font-semibold text-gray-900 truncate w-full text-center">{contact.name.split(' ')[0]}</span>
                  <span className="text-[12px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mt-1 border border-gray-200">{contact.type}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Safety Reminders */}
        <button onClick={() => navigate('safety')} className="w-full text-left bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:border-red-300 hover:bg-red-50/50 transition-colors">
          <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center border-2 border-red-200 flex-shrink-0">
            <ShieldAlert size={32} className="text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Stay Safe!</h3>
            <p className="text-gray-600 leading-tight">Never share your OTP, PIN with anyone</p>
          </div>
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  );
}
