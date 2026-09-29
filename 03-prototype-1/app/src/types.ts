export type Screen = 'home' | 'pay' | 'confirm' | 'history' | 'help' | 'practice' | 'recipient' | 'profile' | 'receive' | 'safety' | 'receipt';

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
