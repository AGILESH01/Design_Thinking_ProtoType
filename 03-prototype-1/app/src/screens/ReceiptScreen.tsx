import { ArrowLeft, Share2, Download } from 'lucide-react';
import type { Screen, Contact } from '../types';

interface ReceiptScreenProps {
  navigate: (screen: Screen) => void;
  paymentDetails: { name: string; amount: number; message: string } | null;
  contact: Contact;
}

export default function ReceiptScreen({ navigate, paymentDetails, contact }: ReceiptScreenProps) {
  const amount = paymentDetails?.amount || 500;
  const name = paymentDetails?.name || contact.name;
  
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  const timeStr = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute:'2-digit'
  });

  return (
    <div className="flex flex-col h-full bg-gray-100 pb-20">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-white border-b border-gray-200">
        <button onClick={() => navigate('confirm')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Receipt</h1>
      </div>

      <div className="p-5 flex-1 overflow-y-auto flex flex-col items-center">
        {/* Receipt Paper */}
        <div className="w-full bg-white rounded-t-lg rounded-b-3xl shadow-md p-6 relative">
          {/* Zig-zag top pattern simulated with border */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gZmlsbD0iI2YzZjRGNCIgcG9pbnRzPSIwLDAgNiwxMCAxMiwwIi8+PC9zdmc+')] -mt-2"></div>
          
          <div className="text-center border-b-2 border-dashed border-gray-300 pb-6 mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">UPI Payment</h2>
            <p className="text-green-600 font-bold text-lg">Transaction Successful</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Paid to</p>
              <p className="text-xl font-bold text-gray-900">{name}</p>
              <p className="text-sm font-medium text-gray-600">{contact.upiId}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Amount</p>
              <p className="text-3xl font-extrabold text-gray-900">₹ {amount.toLocaleString('en-IN')}</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-lg font-bold text-gray-900">{dateStr}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Time</p>
                <p className="text-lg font-bold text-gray-900">{timeStr}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Transaction ID</p>
              <p className="text-lg font-bold text-gray-900 font-mono tracking-wider">
                T{Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}
              </p>
            </div>
          </div>
          
          {/* Zig-zag bottom */}
          <div className="absolute bottom-0 left-0 w-full h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gZmlsbD0iI2YzZjRGNCIgcG9pbnRzPSIwLDEwIDYsMCAxMiwxMCIvPjwvc3ZnPg==')] -mb-2"></div>
        </div>

        <div className="w-full flex gap-4 mt-8">
          <button onClick={() => window.alert('Downloading PDF...')} className="flex-1 bg-white border-2 border-blue-600 text-blue-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
            <Download size={20} /> Download
          </button>
          <button onClick={() => window.alert('Opening sharing options...')} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
            <Share2 size={20} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
