import { Link } from 'react-router-dom';
import './Page.css';

export default function Home() {
  return (
    <div className="page home-page">
      <h2>Effortless Scheduling for Professionals</h2>
      <p>Connect, collaborate, and schedule meetings with ease.</p>
      <div className="buttons">
        <Link to="/signup" className="btn primary">Get Started</Link>
        <Link to="/login" className="btn secondary">Login</Link>
      </div>
    </div>
  );
}