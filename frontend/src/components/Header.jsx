import { Briefcase } from 'lucide-react';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Briefcase size={32} />
            <span>JobTracker</span>
          </div>
          <p className="tagline">Track your career journey</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
