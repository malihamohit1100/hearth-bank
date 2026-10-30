
import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowUpRight,
  ArrowUpFromLine,
  CreditCard,
  Wallet,
  CalendarDays,
  ArrowRight,
  Landmark,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BalanceCard from '../components/BalanceCard';
import { useBank } from '../context/BankContext';

const demoTransactions = [
  {
    id: 1,
    type: 'Deposit',
    description: 'Initial account funding',
    amount: 15000,
    date: '2026-10-26',
  },
  {
    id: 2,
    type: 'Withdrawal',
    description: 'Personal expenses',
    amount: 2500,
    date: '2026-10-25',
  },
  {
    id: 3,
    type: 'Deposit',
    description: 'Monthly savings',
    amount: 8500,
    date: '2026-10-23',
  },
  {
    id: 4,
    type: 'Withdrawal',
    description: 'Utility payment',
    amount: 1200,
    date: '2026-10-21',
  },
];

const money = (amount) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
  }).format(amount);

const dateFormat = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export default function Dashboard() {
  const {
    balance,
    totalDeposited,
    totalWithdrawn,
    transactions,
  } = useBank();

  const recentTransactions = transactions.slice(0, 4);
    
  const account = {
    holder: 'Maliha Mohit',
    number: '•••• •••• 4821',
    type: 'Personal Savings',
  };

  return (
    <>
      <header className="page-header">
        <div>
          <div className="eyebrow">YOUR FINANCES AT A GLANCE</div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">
            Welcome back, {account.holder.split(' ')[0]}. Here's your
            account overview.
          </p>
        </div>

        <div className="date-chip">
          <CalendarDays size={17} />
          <span>Account overview</span>
        </div>
      </header>

      <section className="account-banner">
        <div className="account-banner-content">
          <div className="account-label">ACCOUNT HOLDER</div>
          <h2>{account.holder}</h2>
          <p>{account.type} account</p>

          <div className="account-number">
            <CreditCard size={17} />
            <span>{account.number}</span>
          </div>
        </div>

        <div className="account-banner-mark" aria-hidden="true">
          <Landmark size={100} strokeWidth={0.8} />
        </div>
        <span className="account-status">
          <span className="status-dot" />
          Demo account
        </span>
      </section>

      <section className="summary-section">
        <div className="section-heading">
          <div>
            <h2>Financial overview</h2>
            <p>Your simulated account summary</p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-md-6 col-xl-4">
            <BalanceCard
              title="Available Balance"
              amount={money(balance)}
              icon={Wallet}
              variant="primary"
              description="Your current account balance"
            />
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <BalanceCard
              title="Total deposited"
              amount={money(totalDeposited)}
              icon={ArrowDownToLine}
              variant="deposit"
              description="Deposits recorded in this demo"
            />
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <BalanceCard
              title="Total withdrawn"
              amount={money(totalWithdrawn)}
              icon={ArrowUpFromLine}
              variant="withdraw"
              description="Withdrawals recorded in this demo"
            />
          </div>
        </div>
      </section>

      <section className="activity-section">
        <div className="section-heading">
          <div>
            <h2>Recent transactions</h2>
            <p>Your latest account activity</p>
          </div>
          <Link to="/transactions" className="text-link">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="transaction-table-wrap">
          <div className="transaction-table-header">
            <span>TRANSACTION</span>
            <span>DATE</span>
            <span className="text-end">AMOUNT</span>
          </div>

          {demoTransactions.slice(0, 4).map((transaction) => {
            const isDeposit = transaction.type === 'Deposit';

            return (
              <div className="transaction-row" key={transaction.id}>
                <div className="transaction-info">
                  <span
                    className={`transaction-icon ${
                      isDeposit ? 'transaction-icon-deposit' : 'transaction-icon-withdraw'
                    }`}
                  >
                    {isDeposit ? (
                      <ArrowDownLeft size={19} />
                    ) : (
                      <ArrowUpRight size={19} />
                    )}
                  </span>

                  <div>
                    <strong>{transaction.description}</strong>
                    <small>{transaction.type}</small>
                  </div>
                </div>

                <span className="transaction-date">
                  {dateFormat(transaction.date)}
                </span>

                <strong
                  className={`transaction-amount ${
                    isDeposit ? 'amount-positive' : 'amount-negative'
                  }`}
                >
                  {isDeposit ? '+' : '−'}
                  {money(transaction.amount)}
                </strong>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
