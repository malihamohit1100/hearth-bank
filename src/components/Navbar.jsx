
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Landmark,
  ShieldCheck,
} from 'lucide-react';

const navigationItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard, end: true },
  { label: 'Deposit', path: '/deposit', icon: ArrowDownToLine },
  { label: 'Withdraw', path: '/withdraw', icon: ArrowUpFromLine },
  { label: 'Transactions', path: '/transactions', icon: History },
];

export default function Navbar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">
          <Landmark size={24} />
        </span>
        <span>
          <strong>Hearth Bank</strong>
          <small>Personal Banking</small>
        </span>
      </NavLink>

      <div className="sidebar-label">WORKSPACE</div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigationItems.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={19} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="security-icon">
          <ShieldCheck size={20} />
        </div>
        <div>
          <strong>Demo environment</strong>
          <p>No real banking transactions</p>
        </div>
      </div>
    </aside>
  );
}
