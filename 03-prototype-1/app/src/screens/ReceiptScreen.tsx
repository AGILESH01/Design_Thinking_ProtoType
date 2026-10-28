import { ArrowLeft, Share2, Download, CheckCircle, Wallet } from 'lucide-react';
import type { Screen, Contact, PaymentDetails } from '../types';
import { numberToWords } from '../utils/formatters';

interface ReceiptScreenProps {
  navigate: (screen: Screen) => void;
  paymentDetails: PaymentDetails | null;
  contact: Contact;
}

export default function ReceiptScreen({ navigate, paymentDetails, contact }: ReceiptScreenProps) {
  const amount = paymentDetails?.amount || 500;
  const name = paymentDetails?.name || contact.name;
  const upiId = paymentDetails?.upiId || contact.upiId;
  const transactionId = paymentDetails?.transactionId || 'T482910485';
  const remainingBalance = paymentDetails?.remainingBalance;
  const dateStr = paymentDetails?.date || 'Today';
  const timeStr = '12:00 PM';

  return (
    <div className="flex flex-col min-h-full bg-gray-100 pb-16">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button 
          onClick={() => navigate('confirm')} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Back to confirmation"
        >
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <div className="ml-3">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Receipt</h1>
          <p className="text-xs font-semibold text-gray-500">Official Payment Proof</p>
        </div>
      </div>

      <div className="p-5 flex-1 overflow-y-auto flex flex-col items-center">
        {/* Receipt Paper */}
        <div className="w-full bg-white rounded-t-lg rounded-b-3xl shadow-lg p-6 relative border border-gray-200">
          {/* Top zig-zag */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gZmlsbD0iI2YzZjRGNCIgcG9pbnRzPSIwLDAgNiwxMCAxMiwwIi8+PC9zdmc+')] -mt-2"></div>
          
          <div className="text-center border-b-2 border-dashed border-gray-300 pb-5 mb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-700 mb-2">
              <CheckCircle size={28} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-0.5">UPI Payment</h2>
            <p className="text-green-700 font-bold text-sm">Transaction Successful</p>
          </div>

          <div className="space-y-3.5 mb-6 text-sm">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Paid to</p>
              <p className="text-lg font-bold text-gray-900 leading-tight">{name}</p>
              <p className="text-xs font-medium text-gray-500">{upiId}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</p>
              <p className="text-3xl font-extrabold text-gray-900">₹ {amount.toLocaleString('en-IN')}</p>
              <p className="text-xs font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded inline-block mt-1">
                {numberToWords(amount)}
              </p>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-gray-100">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</p>
                <p className="text-sm font-bold text-gray-900">{dateStr}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</p>
                <p className="text-sm font-bold text-gray-900">{timeStr}</p>
              </div>
            </div>

            <div className="pt-1 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaction ID</p>
              <p className="text-xs font-mono font-bold text-gray-800 tracking-wider break-all">
                {transactionId}
              </p>
            </div>

            {remainingBalance !== undefined && (
              <div className="flex justify-between items-center p-2.5 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                  <Wallet size={14} /> Available Balance
                </span>
                <span className="text-sm font-extrabold text-blue-950">
                  ₹ {remainingBalance.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>
          
          {/* Bottom zig-zag */}
          <div className="absolute bottom-0 left-0 w-full h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gZmlsbD0iI2YzZjRGNCIgcG9pbnRzPSIwLDEwIDYsMCAxMiwxMCIvPjwvc3ZnPg==')] -mb-2"></div>
        </div>

        <div className="w-full flex gap-3 mt-6">
          <button 
            onClick={() => window.alert('Receipt downloaded to device storage.')} 
            className="flex-1 bg-white border-2 border-blue-600 text-blue-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-xs"
          >
            <Download size={18} /> Download
          </button>
          <button 
            onClick={() => window.alert('Opening sharing options...')} 
            className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Share2 size={18} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
