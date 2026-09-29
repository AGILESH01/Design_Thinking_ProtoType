import { ArrowLeft, Search, GraduationCap, BookOpen, Smartphone, ShieldCheck, HelpCircle, PhoneCall, ChevronRight } from 'lucide-react';
import type { Screen } from '../types';

interface HelpScreenProps {
  navigate: (screen: Screen) => void;
  onStartPractice: () => void;
}

export default function HelpScreen({ navigate, onStartPractice }: HelpScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={() => navigate('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Help</h1>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="w-full pl-12 pr-4 py-4 bg-gray-100 border border-gray-200 rounded-2xl text-lg font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {/* Learn & Practice */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 flex flex-col shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center border-2 border-purple-300 flex-shrink-0">
                <GraduationCap size={36} className="text-purple-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-purple-900 mb-1">1. Learn & Practice</h2>
                <p className="text-purple-700 font-medium leading-tight">
                  Try a practice payment with virtual money. Safe & risk-free.
                </p>
              </div>
            </div>
            <button 
              onClick={onStartPractice}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-3 rounded-xl shadow-md transition-colors"
            >
              Start Practice
            </button>
          </div>

          {/* Other Topics */}
          {[
            { title: 'How to make a payment', desc: 'Step-by-step guide with simple instructions.', icon: BookOpen, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100' },
            { title: 'UPI / App Basics', desc: 'Learn about UPI, app features, icons and navigation.', icon: Smartphone, color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', iconBg: 'bg-green-100' },
            { title: 'Security Tips', desc: 'Stay safe from fraud, scams and wrong transactions.', icon: ShieldCheck, color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200', iconBg: 'bg-yellow-100' },
            { title: 'Common Issues', desc: 'Find answers to frequently asked questions.', icon: HelpCircle, color: 'text-pink-700', bg: 'bg-pink-50', border: 'border-pink-200', iconBg: 'bg-pink-100' },
            { title: 'Contact Support', desc: 'Talk to our support team or visit the nearest help centre.', icon: PhoneCall, color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', iconBg: 'bg-indigo-100' },
          ].map((item, idx) => (
            <button 
              key={idx} 
              className={`w-full flex items-center justify-between p-4 ${item.bg} border-2 ${item.border} rounded-2xl shadow-sm hover:brightness-95 transition-all text-left`}
            >
              <div className="flex items-center gap-4 pr-2">
                <div className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center border-2 ${item.border} flex-shrink-0`}>
                  <item.icon size={32} className={item.color} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${item.color} mb-1`}>{item.title}</h3>
                  <p className={`${item.color} opacity-80 text-sm font-medium leading-tight`}>{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={28} className={`${item.color} opacity-60 flex-shrink-0`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
