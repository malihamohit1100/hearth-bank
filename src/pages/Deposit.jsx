
import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownToLine,
  Wallet,
  ShieldCheck,
} from 'lucide-react';
import { useBank } from '../context/BankContext';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
  }).format(amount);

export default function Deposit() {
  const { deposit } = useBank();

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

    const result = deposit(
      amount,
      description || 'Cash Deposit'
    );

    if (!result.success) {
      setError(result.message);
      amountRef.current?.focus();
      return;
    }

    setMessage(
      `${result.message} ${formatCurrency(Number(amount))} has been added to your account.`
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
          <h1>Deposit Money</h1>
          <p>Add funds to your Hearth Bank account.</p>
        </div>

        <div className="operation-icon deposit-icon">
          <ArrowDownToLine size={25} />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="operation-card">
            <div className="operation-card-heading">
              <div>
                <h2>Deposit details</h2>
                <p>Enter the amount you want to deposit.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="deposit-amount" className="form-label">
                  Deposit amount (BDT)
                </label>

                <div className="amount-input-wrapper">
                  <span>৳</span>
                  <input
                    ref={amountRef}
                    id="deposit-amount"
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
                <label htmlFor="deposit-description" className="form-label">
                  Description <span className="optional-label">(Optional)</span>
                </label>

                <input
                  id="deposit-description"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Monthly savings"
                  maxLength={100}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
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

              <button type="submit" className="operation-submit deposit-submit">
                <ArrowDownToLine size={18} />
                Confirm Deposit
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="operation-info-card">
            <div className="info-icon">
              <Wallet size={22} />
            </div>

            <h3>Account information</h3>
            <p className="info-account-name">Personal Savings</p>
            <p className="info-account-number">•••• •••• 4821</p>

            <div className="info-divider" />

            <div className="info-security">
              <ShieldCheck size={19} />
              <span>Your deposit will immediately update your demo account balance.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
