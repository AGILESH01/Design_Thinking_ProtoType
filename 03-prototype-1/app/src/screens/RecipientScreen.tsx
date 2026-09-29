import { ArrowLeft, User, Building2, Users, Lightbulb, Search, QrCode } from 'lucide-react';
import type { Screen, Contact } from '../types';
import { mockContacts } from '../data';

interface RecipientScreenProps {
  navigate: (screen: Screen) => void;
  onSelect: (contact: Contact) => void;
}

export default function RecipientScreen({ navigate, onSelect }: RecipientScreenProps) {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Building2': return Building2;
      case 'Users': return Users;
      case 'Lightbulb': return Lightbulb;
      default: return User;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={() => navigate('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} className="text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Select Recipient</h1>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input 
            type="text" 
            placeholder="Name, Phone or UPI ID" 
            className="w-full pl-12 pr-4 py-4 bg-gray-100 border border-gray-200 rounded-2xl text-lg font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Scan QR */}
        <button onClick={() => window.alert('Camera would open here to scan QR code.')} className="w-full flex items-center justify-center gap-3 bg-blue-50 border-2 border-blue-200 text-blue-700 rounded-2xl p-4 mb-8 font-bold text-lg hover:bg-blue-100 transition-colors">
          <QrCode size={24} />
          Scan QR Code
        </button>

        {/* Contacts */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Saved Contacts & Bills</h2>
        <div className="space-y-4">
          {mockContacts.map((contact) => {
            const IconComponent = getIcon(contact.iconName);
            return (
              <button 
                key={contact.id} 
                onClick={() => onSelect(contact)}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:border-blue-300 transition-colors text-left"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-transparent ${contact.bg}`}>
                    <IconComponent size={26} className={contact.color} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-0.5">{contact.name}</h3>
                    <p className="text-sm font-medium text-gray-500">{contact.upiId}</p>
                  </div>
                </div>
                <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {contact.type}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
