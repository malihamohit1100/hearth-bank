
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpFromLine,
  Wallet,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useBank } from '../context/BankContext';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
  }).format(amount);

export default function Withdraw() {
  const { balance, withdraw } = useBank();

  const amountRef = useRef(null);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    amountRef.current?.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError('');
    setMessage('');

    const numericAmount = Number(amount);

    if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount greater than zero.');
      amountRef.current?.focus();
      return;
    }

    if (numericAmount > balance) {
      setError('Insufficient balance. Please enter a smaller amount.');
      amountRef.current?.focus();
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to withdraw ${formatCurrency(numericAmount)}?`
    );

    if (!confirmed) return;

    const result = withdraw(
      numericAmount,
      description || 'Cash Withdrawal'
    );

    if (!result.success) {
      setError(result.message);
      amountRef.current?.focus();
      return;
    }

    setMessage(
      `${result.message} ${formatCurrency(numericAmount)} has been deducted from your account.`
    );

    setAmount('');
    setDescription('');
    amountRef.current?.focus();
  };

  return (
    <section className="operation-page">
      <div className="operation-header">
        <div>
          <span className="page-eyebrow">ACCOUNT SERVICES</span>
          <h1>Withdraw Money</h1>
          <p>Withdraw funds from your Hearth Bank account.</p>
        </div>

        <div className="operation-icon withdraw-icon">
          <ArrowUpFromLine size={25} />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="operation-card">
            <div className="operation-card-heading">
              <div>
                <h2>Withdrawal details</h2>
                <p>Enter the amount you want to withdraw.</p>
              </div>
            </div>

            <div className="available-balance">
              <div>
                <span>Available balance</span>
                <strong>{formatCurrency(balance)}</strong>
              </div>
              <Wallet size={23} />
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="withdraw-amount" className="form-label">
                  Withdrawal amount (BDT)
                </label>

                <div className="amount-input-wrapper">
                  <span>৳</span>
                  <input
                    ref={amountRef}
                    id="withdraw-amount"
                    type="number"
                    className="form-control amount-input"
                    placeholder="Enter amount"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="withdraw-description" className="form-label">
                  Description <span className="optional-label">(Optional)</span>
                </label>

                <input
                  id="withdraw-description"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Personal expenses"
                  maxLength={100}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="withdrawal-notice">
                <AlertCircle size={18} />
                <span>Please review the amount carefully before confirming.</span>
              </div>

              {error && (
                <div className="form-feedback error-feedback" role="alert">
                  {error}
                </div>
              )}

              {message && (
                <div className="form-feedback success-feedback" role="status">
                  {message}
                </div>
              )}

              <button type="submit" className="operation-submit withdraw-submit">
                <ArrowUpFromLine size={18} />
                Confirm Withdrawal
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="operation-info-card">
            <div className="info-icon">
              <ShieldCheck size={22} />
            </div>

            <h3>Secure withdrawal</h3>
            <p className="info-description">
              Your current balance is checked before a withdrawal is processed.
            </p>

            <div className="info-divider" />

            <div className="info-security">
              <ShieldCheck size={19} />
              <span>This is a simulated banking environment. No real money is transferred.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
