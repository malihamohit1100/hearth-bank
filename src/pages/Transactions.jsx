
import { History } from 'lucide-react';

export default function Transactions() {
  return (
    <section className="placeholder-page">
      <span className="placeholder-icon">
        <History size={26} />
      </span>
      <div className="eyebrow">ACCOUNT ACTIVITY</div>
      <h1>Transaction history</h1>
      <p>
        Review deposits and withdrawals, including amounts and dates.
        The reusable transaction list will be implemented in Stage 4.
      </p>
      <span className="coming-soon">Full history coming in Stage 4</span>
    </section>
  );
}
