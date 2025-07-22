// import Footer from './Footer';

// export default function Layout({ children, showHeader = true, showFooter = true }) {
//   return (
//     <div className="layout-container" style={{
//       display: 'flex',
//       flexDirection: 'column',
//       minHeight: '10vh',
//       position: 'relative',
//       // Set the overall page background here to the lightest color
//       background: '#004d40', // Main page background
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
//     }}>
//       {/* Remove the fixed background gradient and floating shapes from here,
//           as the Main.js will handle its own contained background and the primary page bg is now solid.
//           If you want subtle effects, they should be applied within Main.js or specific sections.
//       */}

//       {/* {showHeader && <Header />} */}
//       <main style={{
//         flex: 1,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '2rem 1rem',
//         position: 'relative',
//         maxWidth: '100%'
//       }}>
//         {children}
//       </main>
//       {showFooter && <Footer />}

//       <style jsx>{`
//         /* Remove unused keyframes from here if not used elsewhere */
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
//     </div>
//   );
// }
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children, showHeader = false, showFooter = true }) {
  return (
    <div className="layout-container" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Animated Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // Changed to Deep Harbor and Misty Pine for a coastal gradient
          background: 'linear-gradient(135deg, #134340 0%, #7C8C76 100%)',
          zIndex: -2
        }}
      />

      {/* Floating Shapes */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: -1
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          // Changed to Sea Salt Sage with opacity
          background: 'rgba(135, 157, 145, 0.3)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '150px',
          height: '150px',
          // Changed to Driftwood Sand with opacity
          background: 'rgba(220, 223, 214, 0.2)',
          borderRadius: '30%',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: '100px',
          height: '100px',
          // Changed to Misty Pine with opacity
          background: 'rgba(124, 140, 118, 0.15)',
          borderRadius: '40%',
          animation: 'float 10s ease-in-out infinite'
        }} />
      </div>

      {showHeader && <Header />}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        position: 'relative'
      }}>
        {children}
      </main>
      {showFooter && <Footer />}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}

// // import Footer from './Footer';
// // import Header from './Header';

// // export default function Layout({ children, showHeader = true, showFooter = true }) {
// //   return (
// //     <div className="layout-container" style={{ 
// //       display: 'flex', 
// //       flexDirection: 'column', 
// //       minHeight: '100vh',
// //       position: 'relative'
// //       // minWidth: '30vh'
// //     }}>
// //       {/* Animated Background */}
// //       <div 
// //         style={{
// //           position: 'fixed',
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //           zIndex: -2
// //         }}
// //       />
      
// //       {/* Floating Shapes */}
// //       <div style={{
// //         position: 'fixed',
// //         top: 0,
// //         left: 0,
// //         right: 0,
// //         bottom: 0,
// //         overflow: 'hidden',
// //         zIndex: -1
// //       }}>
// //         <div style={{
// //           position: 'absolute',
// //           top: '10%',
// //           left: '10%',
// //           width: '200px',
// //           height: '200px',
// //           background: 'rgba(255, 255, 255, 0.1)',
// //           borderRadius: '50%',
// //           animation: 'float 6s ease-in-out infinite'
// //         }} />
// //         <div style={{
// //           position: 'absolute',
// //           top: '60%',
// //           right: '10%',
// //           width: '150px',
// //           height: '150px',
// //           background: 'rgba(255, 255, 255, 0.08)',
// //           borderRadius: '30%',
// //           animation: 'float 8s ease-in-out infinite reverse'
// //         }} />
// //         <div style={{
// //           position: 'absolute',
// //           bottom: '20%',
// //           left: '20%',
// //           width: '100px',
// //           height: '100px',
// //           background: 'rgba(255, 255, 255, 0.05)',
// //           borderRadius: '40%',
// //           animation: 'float 10s ease-in-out infinite'
// //         }} />
// //       </div>

// //       {showHeader && <Header />}
// //       <main style={{ 
// //         flex: 1, 
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         padding: '2rem 1rem',
// //         position: 'relative'
// //       }}>
// //         {children}
// //       </main>
// //       {showFooter && <Footer />}
      
// //       <style jsx>{`
// //         @keyframes float {
// //           0%, 100% {
// //             transform: translateY(0px) rotate(0deg);
// //           }
// //           50% {
// //             transform: translateY(-20px) rotate(180deg);
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }