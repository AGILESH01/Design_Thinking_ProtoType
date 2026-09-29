import { useState } from 'react';
import { ArrowLeft, QrCode, Share2, Copy } from 'lucide-react';
import type { Screen } from '../types';

interface ReceiveScreenProps {
  navigate: (screen: Screen) => void;
}

export default function ReceiveScreen({ navigate }: ReceiveScreenProps) {
  const [isAddingAmount, setIsAddingAmount] = useState(false);
  const [amount, setAmount] = useState('');

  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={() => navigate('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Receive Money</h1>
      </div>

      <div className="p-6 flex-1 flex flex-col items-center overflow-y-auto">
        <div className="w-full bg-blue-50 border-2 border-blue-100 rounded-3xl p-8 flex flex-col items-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Senior User</h2>
          <p className="text-sm font-medium text-gray-500 mb-6">user@okaxis</p>

          <div className="bg-white p-4 rounded-2xl border-4 border-gray-900 shadow-md mb-6 relative">
            {amount && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white font-bold px-4 py-1 rounded-full text-lg shadow-sm whitespace-nowrap">
                ₹ {amount}
              </div>
            )}
            <QrCode size={180} className="text-gray-900" strokeWidth={1} />
          </div>

          <p className="text-gray-600 font-medium text-center">
            Scan this QR code from any app <br /> to send money.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-6 space-y-4">
          {!isAddingAmount ? (
            <button 
              onClick={() => setIsAddingAmount(true)}
              className="w-full py-4 border-2 border-blue-200 text-blue-700 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Add specific amount
            </button>
          ) : (
            <div className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 flex flex-col gap-3">
              <label className="text-gray-700 font-bold">Amount to receive:</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-600">₹</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="0"
                />
              </div>
              <button 
                onClick={() => {
                  if (!amount) setIsAddingAmount(false);
                }}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors mt-2"
              >
                {amount ? 'Update QR Code' : 'Cancel'}
              </button>
            </div>
          )}

          <div className="flex gap-4">
            <button 
              onClick={() => window.alert('UPI ID copied to clipboard!')}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-100 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Copy size={20} /> Copy ID
            </button>
            <button 
              onClick={() => window.alert('Opening sharing options...')}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-100 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Share2 size={20} /> Share QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
