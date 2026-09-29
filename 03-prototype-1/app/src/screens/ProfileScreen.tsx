import { ArrowLeft, User, Settings, ShieldCheck, LogOut, ChevronRight, Building2 } from 'lucide-react';
import type { Screen } from '../types';

interface ProfileScreenProps {
  navigate: (screen: Screen) => void;
}

export default function ProfileScreen({ navigate }: ProfileScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={() => navigate('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">My Profile</h1>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center mb-8 mt-4">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200 mb-4 shadow-sm">
            <User size={48} className="text-blue-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Senior User</h2>
          <p className="text-lg font-medium text-gray-500">user@okaxis</p>
          <div className="mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-green-200">
            <ShieldCheck size={16} /> Fully Verified
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 px-2">Settings & Security</h3>
          
          {[
            { label: 'Bank Accounts', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-100' },
            { label: 'Privacy & Security', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-100' },
            { label: 'App Settings', icon: Settings, color: 'text-gray-600', bg: 'bg-gray-200' },
          ].map((item, idx) => (
            <button key={idx} onClick={() => window.alert(item.label + ' settings will be available in the next iteration of the prototype.')} className="w-full flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl hover:bg-gray-100 transition-colors active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}>
                  <item.icon size={24} className={item.color} />
                </div>
                <span className="text-lg font-bold text-gray-900">{item.label}</span>
              </div>
              <ChevronRight size={24} className="text-gray-400" />
            </button>
          ))}

          <button onClick={() => window.alert('Logging out... (Prototype Limitation)')} className="w-full mt-4 flex items-center justify-center gap-2 p-4 bg-red-50 border-2 border-red-200 text-red-600 font-bold text-lg rounded-2xl hover:bg-red-100 transition-colors active:scale-[0.98]">
            <LogOut size={24} /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
