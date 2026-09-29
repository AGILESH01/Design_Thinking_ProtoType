import type { Contact } from './types';

export const mockContacts: Contact[] = [
  { id: '1', name: 'Ravi Sharma', upiId: 'ravi@okaxis', type: 'Saved', iconName: 'User', color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: '2', name: 'Daughter', upiId: 'priya@okhdfc', type: 'Saved', iconName: 'User', color: 'text-pink-600', bg: 'bg-pink-100' },
  { id: '3', name: 'Electricity Board', upiId: 'bescom@sbi', type: 'Bill', iconName: 'Lightbulb', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { id: '4', name: 'Mobile Recharge', upiId: 'jio@icici', type: 'Bill', iconName: 'User', color: 'text-green-600', bg: 'bg-green-100' },
  { id: '5', name: 'Milk Vendor', upiId: 'milk@paytm', type: 'Saved', iconName: 'User', color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: '6', name: 'Local Grocery', upiId: 'store@ybl', type: 'Saved', iconName: 'Building2', color: 'text-purple-600', bg: 'bg-purple-100' },
];
