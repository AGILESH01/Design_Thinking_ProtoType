import { useState } from 'react';
import type { Screen, Transaction, Contact, PaymentDetails } from './types';
import { mockContacts } from './data';
import HomeScreen from './screens/HomeScreen';
import PayScreen from './screens/PayScreen';
import RecipientScreen from './screens/RecipientScreen';
import ReviewScreen from './screens/ReviewScreen';
import PinScreen from './screens/PinScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import HistoryScreen from './screens/HistoryScreen';
import HelpScreen from './screens/HelpScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReceiveScreen from './screens/ReceiveScreen';
import SafetyScreen from './screens/SafetyScreen';
import ReceiptScreen from './screens/ReceiptScreen';
import BottomNav from './components/BottomNav';

const initialTransactions: Transaction[] = [
  { id: '1', name: 'Sita', type: 'Received', date: 'Yesterday, 04:15 PM', amount: 300, isReceived: true, status: 'Completed', iconName: 'User', color: 'text-pink-600', bg: 'bg-pink-100' },
  { id: '2', name: 'State Bank of India', type: 'Bill Payment', date: '12 Sep, 2025', amount: 1200, isReceived: false, status: 'Completed', iconName: 'Building2', color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { id: '3', name: 'Amit Verma', type: 'UPI Payment', date: '10 Sep, 2025', amount: 750, isReceived: false, status: 'Completed', iconName: 'User', color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: '4', name: 'Neha Singh', type: 'Received', date: '08 Sep, 2025', amount: 450, isReceived: true, status: 'Completed', iconName: 'Users', color: 'text-purple-600', bg: 'bg-purple-100' },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  
  // Global State
  const [balance, setBalance] = useState(2560);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedContact, setSelectedContact] = useState<Contact>(mockContacts[0]);
  
  // Active Payment Draft State (preserved across Back / Forward navigation)
  const [draftAmount, setDraftAmount] = useState<number>(500);
  const [draftMessage, setDraftMessage] = useState<string>('For family support');
  const [draftMethod, setDraftMethod] = useState<string>('upi');
  
  // Completed Payment Details for Result & Receipt
  const [lastPayment, setLastPayment] = useState<PaymentDetails | null>(null);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    navigate('pay');
  };

  const handleProceedToReview = (amount: number, message: string, method: string) => {
    setDraftAmount(amount);
    setDraftMessage(message);
    setDraftMethod(method);
    navigate('review');
  };

  const handleProceedToPin = () => {
    navigate('pin');
  };

  const handleAuthorizeSuccess = () => {
    const nextBalance = isPracticeMode ? balance : balance - draftAmount;

    if (!isPracticeMode) {
      setBalance(nextBalance);
      
      const newTx: Transaction = {
        id: Date.now().toString(),
        name: selectedContact.name,
        type: 'UPI Payment',
        date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        amount: draftAmount,
        isReceived: false,
        status: 'Completed',
        iconName: selectedContact.iconName,
        color: selectedContact.color,
        bg: selectedContact.bg
      };
      setTransactions([newTx, ...transactions]);
    }

    const txId = 'T' + Math.floor(100000000 + Math.random() * 900000000);
    const dateStr = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setLastPayment({
      name: selectedContact.name,
      upiId: selectedContact.upiId,
      amount: draftAmount,
      message: draftMessage,
      method: draftMethod,
      date: dateStr,
      transactionId: txId,
      remainingBalance: nextBalance,
    });

    navigate('confirm');
  };

  // Determine if bottom navigation should be visible
  const showBottomNav = currentScreen === 'home' || currentScreen === 'history' || currentScreen === 'help' || currentScreen === 'recipient';

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      {/* Mobile Device Container */}
      <div className="w-full max-w-[420px] h-[100dvh] sm:h-[820px] sm:rounded-[40px] bg-white overflow-hidden shadow-2xl relative flex flex-col border-[8px] border-gray-900">
        
        {isPracticeMode && (
          <div className="bg-purple-100 text-purple-900 text-center text-sm font-semibold py-2 px-4 shadow-sm z-20 border-b border-purple-200 flex justify-between items-center">
            <span>🎓 Practice Mode — No real money transferred</span>
            <button 
              onClick={() => setIsPracticeMode(false)} 
              className="text-purple-700 font-extrabold underline text-xs ml-2 cursor-pointer hover:text-purple-900"
            >
              Exit
            </button>
          </div>
        )}

        <div className={`flex-1 overflow-y-auto overflow-x-hidden relative ${showBottomNav ? 'pb-16' : ''}`}>
          {currentScreen === 'home' && (
            <HomeScreen 
              navigate={navigate} 
              balance={balance} 
              onQuickPay={handleSelectContact} 
            />
          )}

          {currentScreen === 'recipient' && (
            <RecipientScreen 
              navigate={navigate} 
              onSelect={handleSelectContact} 
            />
          )}

          {currentScreen === 'pay' && (
            <PayScreen 
              navigate={navigate} 
              contact={selectedContact} 
              balance={balance}
              initialAmount={draftAmount.toString()}
              initialMessage={draftMessage}
              initialMethod={draftMethod}
              onProceedToReview={handleProceedToReview} 
            />
          )}

          {currentScreen === 'review' && (
            <ReviewScreen 
              navigate={navigate}
              contact={selectedContact}
              amount={draftAmount}
              message={draftMessage}
              method={draftMethod}
              balance={balance}
              onProceedToPin={handleProceedToPin}
            />
          )}

          {currentScreen === 'pin' && (
            <PinScreen 
              navigate={navigate}
              contact={selectedContact}
              amount={draftAmount}
              message={draftMessage}
              method={draftMethod}
              onAuthorize={handleAuthorizeSuccess}
            />
          )}

          {currentScreen === 'confirm' && (
            <ConfirmScreen 
              navigate={navigate} 
              paymentDetails={lastPayment} 
              contact={selectedContact} 
            />
          )}

          {currentScreen === 'receipt' && (
            <ReceiptScreen 
              navigate={navigate} 
              paymentDetails={lastPayment} 
              contact={selectedContact} 
            />
          )}

          {currentScreen === 'history' && (
            <HistoryScreen 
              navigate={navigate} 
              transactions={transactions} 
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen 
              navigate={navigate} 
            />
          )}

          {currentScreen === 'receive' && (
            <ReceiveScreen 
              navigate={navigate} 
            />
          )}

          {currentScreen === 'safety' && (
            <SafetyScreen 
              navigate={navigate} 
            />
          )}

          {currentScreen === 'help' && (
            <HelpScreen 
              navigate={navigate} 
              onStartPractice={() => {
                setIsPracticeMode(true);
                navigate('home');
              }}
            />
          )}
        </div>

        {showBottomNav && (
          <div className="absolute bottom-0 w-full z-20">
            <BottomNav current={currentScreen} navigate={navigate} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
