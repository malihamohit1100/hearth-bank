
import { ArrowDownToLine } from 'lucide-react';

export default function Deposit() {
  return (
    <section className="placeholder-page">
      <span className="placeholder-icon">
        <ArrowDownToLine size={26} />
      </span>
      <div className="eyebrow">ACCOUNT OPERATIONS</div>
      <h1>Deposit money</h1>
      <p>
        Add funds to your simulated account. The validated deposit form
        will be implemented in Stage 3.
      </p>
      <span className="coming-soon">Form coming in Stage 3</span>
    </section>
  );
}
