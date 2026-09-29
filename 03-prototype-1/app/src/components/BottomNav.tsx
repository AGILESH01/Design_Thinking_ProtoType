import { Home, IndianRupee, Clock, HelpCircle } from 'lucide-react';
import type { Screen } from '../types';

interface BottomNavProps {
  current: Screen;
  navigate: (screen: Screen) => void;
}

export default function BottomNav({ current, navigate }: BottomNavProps) {
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'pay', label: 'Pay', icon: IndianRupee },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="bg-white border-t border-gray-200 flex justify-around items-center h-16 px-4">
      {items.map((item) => {
        const Icon = item.icon;
        // Highlight 'Pay' tab if we are on pay OR recipient screen
        const isActive = current === item.id || (item.id === 'pay' && current === 'recipient');
        
        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'pay') {
                navigate('recipient');
              } else {
                navigate(item.id as Screen);
              }
            }}
            className={`flex flex-col items-center justify-center w-16 gap-1 ${
              isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
