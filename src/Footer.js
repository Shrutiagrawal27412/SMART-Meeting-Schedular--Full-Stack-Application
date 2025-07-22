// // src/components/Footer.js
// import './Footer.css';

// export default function Footer() {
//   return (
//     <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} EY. All rights reserved.</p>
//     </footer>
//   );
// }
// src/components/Footer.js

export default function Footer() {
  return (
    <footer style={{
      padding: '1.5rem',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.875rem',
          margin: 0
        }}>
          &copy; {new Date().getFullYear()} Schedule. Crafted with care.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          <a 
            href="#" 
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'rgba(255, 255, 255, 1)'}
            onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
          >
            Privacy
          </a>
          <a 
            href="#" 
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'rgba(255, 255, 255, 1)'}
            onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
          >
            Terms
          </a>
          <a 
            href="#" 
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'rgba(255, 255, 255, 1)'}
            onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}