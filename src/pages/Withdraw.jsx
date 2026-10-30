
import { ArrowUpFromLine } from 'lucide-react';

export default function Withdraw() {
  return (
    <section className="placeholder-page">
      <span className="placeholder-icon">
        <ArrowUpFromLine size={26} />
      </span>
      <div className="eyebrow">ACCOUNT OPERATIONS</div>
      <h1>Withdraw money</h1>
      <p>
        Withdraw funds while protecting the account from invalid
        amounts and insufficient balance.
      </p>
      <span className="coming-soon">Form coming in Stage 3</span>
    </section>
  );
}
