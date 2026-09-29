import { useState } from 'react';
import { ArrowLeft, User, Building2, Users, Lightbulb } from 'lucide-react';
import type { Screen, Transaction } from '../types';

interface HistoryScreenProps {
  navigate: (screen: Screen) => void;
  transactions: Transaction[];
}

type Filter = 'All' | 'Received' | 'Sent';

export default function HistoryScreen({ navigate, transactions }: HistoryScreenProps) {
  const [filter, setFilter] = useState<Filter>('All');

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Building2': return Building2;
      case 'Users': return Users;
      case 'Lightbulb': return Lightbulb;
      default: return User;
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'All') return true;
    if (filter === 'Received') return tx.isReceived;
    if (filter === 'Sent') return !tx.isReceived;
    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={() => navigate('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Payment History</h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
        {(['All', 'Received', 'Sent'] as Filter[]).map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full font-bold text-lg shadow-sm transition-colors ${
              filter === f 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {filteredTransactions.length === 0 && (
          <div className="text-center text-gray-500 mt-10 font-medium">
            No transactions found.
          </div>
        )}
        {filteredTransactions.map((tx) => {
          const IconComponent = getIcon(tx.iconName);
          return (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm cursor-pointer hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-transparent ${tx.bg}`}>
                  <IconComponent size={26} className={tx.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{tx.name}</h3>
                  <p className="text-sm font-medium text-gray-500 mb-1">{tx.type}</p>
                  <p className="text-xs font-semibold text-gray-400">{tx.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end ml-4">
                <span className={`text-xl font-extrabold ${tx.isReceived ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.isReceived ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </span>
                <span className="mt-2 text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-md border border-green-200">
                  {tx.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
