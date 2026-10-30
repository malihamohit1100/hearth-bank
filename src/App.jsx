
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transactions from './pages/Transactions';

function NotFound() {
  return (
    <section className="placeholder-page">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <footer className="app-footer">
            <span>© 2026 Hearth Bank</span>
            <span>
              Educational demo · No real money involved
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}
