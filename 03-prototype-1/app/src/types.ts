export type Screen = 
  | 'home' 
  | 'recipient' 
  | 'pay' 
  | 'review' 
  | 'pin' 
  | 'confirm' 
  | 'receipt' 
  | 'history' 
  | 'help' 
  | 'practice' 
  | 'profile' 
  | 'receive' 
  | 'safety';

export interface Transaction {
  id: string;
  name: string;
  type: string;
  date: string;
  amount: number;
  isReceived: boolean;
  status: string;
  iconName: 'User' | 'Building2' | 'Users' | 'Lightbulb';
  color: string;
  bg: string;
}

export interface Contact {
  id: string;
  name: string;
  upiId: string;
  type: string;
  iconName: 'User' | 'Building2' | 'Users' | 'Lightbulb';
  color: string;
  bg: string;
}

export interface PaymentDetails {
  name: string;
  upiId: string;
  amount: number;
  message: string;
  method: string;
  date: string;
  transactionId: string;
  remainingBalance: number;
}
