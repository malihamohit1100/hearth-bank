
import { useState } from 'react';
import { ArrowDownToLine, Wallet, ShieldCheck } from 'lucide-react';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
  }).format(amount);

export default function Deposit() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const numericAmount = Number(amount);

    if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount greater than zero.');
      return;
    }

    if (numericAmount > 1000000) {
      setError('The maximum deposit amount is ৳10,00,000.');
      return;
    }

    setMessage(
      `Your deposit of ${formatCurrency(numericAmount)} has been validated. Transaction processing will be connected in the next stage.`
    );

    setAmount('');
    setDescription('');
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
                Continue Deposit
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
              <span>Your information stays within this demo application.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
