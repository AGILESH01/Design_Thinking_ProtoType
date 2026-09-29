import { ArrowLeft, ShieldAlert, KeyRound, PhoneOff, EyeOff, ShieldCheck } from 'lucide-react';
import type { Screen } from '../types';

interface SafetyScreenProps {
  navigate: (screen: Screen) => void;
}

export default function SafetyScreen({ navigate }: SafetyScreenProps) {
  const safetyTips = [
    {
      title: "Keep your PIN secret",
      desc: "Never share your UPI PIN or OTP with anyone. Bank officials will never ask for it.",
      icon: KeyRound,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Beware of fake calls",
      desc: "If someone calls claiming you won a lottery or need to update KYC, disconnect immediately.",
      icon: PhoneOff,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Check before paying",
      desc: "Always double-check the recipient's name before entering your UPI PIN.",
      icon: EyeOff,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Receiving is PIN-free",
      desc: "You NEVER need to enter your UPI PIN to receive money. Only to send.",
      icon: ShieldCheck,
      color: "text-green-600",
      bg: "bg-green-100",
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-white border-b border-gray-100">
        <button onClick={() => navigate('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Safety Center</h1>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        <div className="w-full bg-red-50 border-2 border-red-200 rounded-3xl p-6 flex flex-col items-center text-center mb-8 shadow-sm">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center border-4 border-red-200 mb-4">
            <ShieldAlert size={40} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-900 mb-2">Stay Safe from Scams</h2>
          <p className="text-red-700 font-medium leading-snug">
            Your security is our top priority. Please follow these rules to keep your money safe.
          </p>
        </div>

        <div className="space-y-4">
          {safetyTips.map((tip, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${tip.bg}`}>
                <tip.icon size={28} className={tip.color} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{tip.title}</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-2xl shadow-md hover:bg-gray-800 transition-colors">
          Report Suspicious Activity
        </button>
      </div>
    </div>
  );
}
