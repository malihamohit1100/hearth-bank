
import { useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  ReceiptText,
} from 'lucide-react';

const demoTransactions = [
  {
    id: 'TXN-1005',
    title: 'Salary Deposit',
    description: 'Monthly salary',
    type: 'Deposit',
    date: '2026-10-26',
    amount: 15000,
    status: 'Completed',
  },
  {
    id: 'TXN-1004',
    title: 'Grocery Shopping',
    description: 'Personal expenses',
    type: 'Withdrawal',
    date: '2026-10-25',
    amount: 2500,
    status: 'Completed',
  },
  {
    id: 'TXN-1003',
    title: 'Savings Deposit',
    description: 'Monthly savings',
    type: 'Deposit',
    date: '2026-10-23',
    amount: 5000,
    status: 'Completed',
  },
  {
    id: 'TXN-1002',
    title: 'Utility Bill',
    description: 'Electricity bill',
    type: 'Withdrawal',
    date: '2026-10-21',
    amount: 1200,
    status: 'Completed',
  },
  {
    id: 'TXN-1001',
    title: 'Cash Deposit',
    description: 'Additional funds',
    type: 'Deposit',
    date: '2026-10-19',
    amount: 3500,
    status: 'Completed',
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
  }).format(amount);

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export default function Transactions() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredTransactions = demoTransactions.filter((transaction) => {
    const matchesFilter =
      filter === 'All' || transaction.type === filter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      transaction.title.toLowerCase().includes(searchText) ||
      transaction.id.toLowerCase().includes(searchText) ||
      transaction.description.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  return (
    <section className="operation-page">
      <div className="operation-header">
        <div>
          <span className="page-eyebrow">ACCOUNT ACTIVITY</span>
          <h1>Transactions</h1>
          <p>Review your recent deposits and withdrawals.</p>
        </div>

        <div className="operation-icon transaction-icon">
          <ReceiptText size={25} />
        </div>
      </div>

      <div className="transaction-summary">
        <div>
          <span>Total transactions</span>
          <strong>{demoTransactions.length}</strong>
        </div>
        <div>
          <span>Total deposits</span>
          <strong className="summary-deposit">
            {formatCurrency(
              demoTransactions
                .filter((item) => item.type === 'Deposit')
                .reduce((total, item) => total + item.amount, 0)
            )}
          </strong>
        </div>
        <div>
          <span>Total withdrawals</span>
          <strong className="summary-withdraw">
            {formatCurrency(
              demoTransactions
                .filter((item) => item.type === 'Withdrawal')
                .reduce((total, item) => total + item.amount, 0)
            )}
          </strong>
        </div>
      </div>

      <div className="transaction-history-card">
        <div className="transaction-history-heading">
          <div>
            <h2>Transaction history</h2>
            <p>Your account activity at a glance.</p>
          </div>
        </div>

        <div className="transaction-controls">
          <div className="transaction-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search transactions..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search transactions"
            />
          </div>

          <div className="transaction-filters" aria-label="Filter transactions">
            {['All', 'Deposit', 'Withdrawal'].map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-button ${filter === item ? 'active' : ''}`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="transaction-table-wrapper">
          <table className="table transaction-table align-middle">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => {
                const isDeposit = transaction.type === 'Deposit';

                return (
                  <tr key={transaction.id}>
                    <td>
                      <div className="transaction-name-cell">
                        <div
                          className={`transaction-type-icon ${
                            isDeposit ? 'type-deposit' : 'type-withdraw'
                          }`}
                        >
                          {isDeposit ? (
                            <ArrowDownLeft size={18} />
                          ) : (
                            <ArrowUpRight size={18} />
                          )}
                        </div>
                        <div>
                          <strong>{transaction.title}</strong>
                          <span>{transaction.description}</span>
                        </div>
                      </div>
                    </td>

                    <td className="transaction-id">{transaction.id}</td>
                    <td className="transaction-date">{formatDate(transaction.date)}</td>
                    <td>
                      <span className="transaction-status">
                        {transaction.status}
                      </span>
                    </td>
                    <td
                      className={`text-end transaction-amount ${
                        isDeposit ? 'amount-deposit' : 'amount-withdraw'
                      }`}
                    >
                      {isDeposit ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="empty-transactions">
              <ReceiptText size={30} />
              <h3>No transactions found</h3>
              <p>Try changing your search or transaction filter.</p>
            </div>
          )}
        </div>

        <div className="transaction-footer">
          Showing {filteredTransactions.length} of {demoTransactions.length} transactions
        </div>
      </div>
    </section>
  );
}
