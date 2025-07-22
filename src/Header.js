// src/components/Header.js

export default function Header({ title = "Schedule", subtitle = "Professional Meeting Scheduler" }) {
  return (
    <header style={{
      padding: '2rem 1rem 0',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div className="animate-fade-in">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          {/* Logo Icon */}
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
          }}>
            S
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0
          }}>
            {title}
          </h1>
        </div>
        
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '1rem',
          fontWeight: '400',
          margin: 0
        }}>
          {subtitle}
        </p>
      </div>
    </header>
  );
}