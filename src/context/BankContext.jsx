
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const BankContext = createContext(null);

const STORAGE_KEY = 'hearth-bank-data';

const initialTransactions = [
  {
    id: 'TXN-1005',
    title: 'Salary Deposit',
    description: 'Monthly salary',
    type: 'Deposit',
    date: '2026-10-26T10:30:00.000Z',
    amount: 15000,
    status: 'Completed',
  },
  {
    id: 'TXN-1004',
    title: 'Grocery Shopping',
    description: 'Personal expenses',
    type: 'Withdrawal',
    date: '2026-10-25T09:15:00.000Z',
    amount: 2500,
    status: 'Completed',
  },
  {
    id: 'TXN-1003',
    title: 'Savings Deposit',
    description: 'Monthly savings',
    type: 'Deposit',
    date: '2026-10-23T11:00:00.000Z',
    amount: 5000,
    status: 'Completed',
  },
  {
    id: 'TXN-1002',
    title: 'Utility Bill',
    description: 'Electricity bill',
    type: 'Withdrawal',
    date: '2026-10-21T08:45:00.000Z',
    amount: 1200,
    status: 'Completed',
  },
  {
    id: 'TXN-1001',
    title: 'Cash Deposit',
    description: 'Additional funds',
    type: 'Deposit',
    date: '2026-10-19T12:00:00.000Z',
    amount: 3500,
    status: 'Completed',
  },
];

const initialBankData = {
  balance: 19800,
  totalDeposited: 23500,
  totalWithdrawn: 3700,
  transactions: initialTransactions,
};

function loadBankData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return initialBankData;
    }

    const parsedData = JSON.parse(savedData);

    if (
      typeof parsedData.balance !== 'number' ||
      typeof parsedData.totalDeposited !== 'number' ||
      typeof parsedData.totalWithdrawn !== 'number' ||
      !Array.isArray(parsedData.transactions)
    ) {
      return initialBankData;
    }

    return parsedData;
  } catch (error) {
    console.error('Could not load saved bank data:', error);
    return initialBankData;
  }
}

export function BankProvider({ children }) {
  const [bankData, setBankData] = useState(loadBankData);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bankData));
    } catch (error) {
      console.error('Could not save bank data:', error);
    }
  }, [bankData]);

  const deposit = (amount, description = 'Cash Deposit') => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return {
        success: false,
        message: 'Please enter a valid amount greater than zero.',
      };
    }

    if (numericAmount > 1000000) {
      return {
        success: false,
        message: 'The maximum deposit amount is ৳10,00,000.',
      };
    }

    const transaction = {
      id: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: description.trim() || 'Cash Deposit',
      description: description.trim() || 'Account deposit',
      type: 'Deposit',
      date: new Date().toISOString(),
      amount: numericAmount,
      status: 'Completed',
    };

    setBankData((previousData) => ({
      ...previousData,
      balance: previousData.balance + numericAmount,
      totalDeposited: previousData.totalDeposited + numericAmount,
      transactions: [transaction, ...previousData.transactions],
    }));

    return {
      success: true,
      message: 'Deposit completed successfully.',
    };
  };

  const withdraw = (amount, description = 'Cash Withdrawal') => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return {
        success: false,
        message: 'Please enter a valid amount greater than zero.',
      };
    }

    if (numericAmount > bankData.balance) {
      return {
        success: false,
        message: 'Insufficient balance. Please enter a smaller amount.',
      };
    }

    const transaction = {
      id: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: description.trim() || 'Cash Withdrawal',
      description: description.trim() || 'Account withdrawal',
      type: 'Withdrawal',
      date: new Date().toISOString(),
      amount: numericAmount,
      status: 'Completed',
    };

    setBankData((previousData) => ({
      ...previousData,
      balance: previousData.balance - numericAmount,
      totalWithdrawn: previousData.totalWithdrawn + numericAmount,
      transactions: [transaction, ...previousData.transactions],
    }));

    return {
      success: true,
      message: 'Withdrawal completed successfully.',
    };
  };

  const value = {
    balance: bankData.balance,
    totalDeposited: bankData.totalDeposited,
    totalWithdrawn: bankData.totalWithdrawn,
    transactions: bankData.transactions,
    deposit,
    withdraw,
  };

  return (
    <BankContext.Provider value={value}>
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  const context = useContext(BankContext);

  if (!context) {
    throw new Error('useBank must be used inside a BankProvider.');
  }

  return context;
}
