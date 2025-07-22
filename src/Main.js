// src/Main.js
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Sidebar from './sidebar';

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
      setUserName(email.split('@')[0]);
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleUserDropdown = () => setUserDropdownOpen(prev => !prev);

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const getUserInitials = (name, email) => {
    if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return email ? email.slice(0, 2).toUpperCase() : 'U';
  };

  return (
    <div className="fullscreen-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      width: '100vw', // Full viewport width
      backgroundColor: '#ffffff', // Pure white background
      position: 'fixed', // Force full screen
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto', // Allow scrolling within this container
    }}>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Header - Green theme */}
        <header style={{
          height: '70px',
          background: 'linear-gradient(135deg, #00695c 0%, #004d40 100%)', // Green gradient
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button onClick={toggleSidebar} className="hover-effect" style={{
              background: 'rgba(255,255,255,0.25)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(10px)',
              fontSize: '1.1rem',
              transition: 'all 0.2s ease'
            }}>
              {sidebarOpen ? '⇦' : '≡'}
            </button>
            <h1 style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              color: '#fff',
              margin: 0,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Meeting Scheduler
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                Welcome, {userName}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                {formatDate(currentTime)}
              </div>
              <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.9)' }}>
                {formatTime(currentTime)}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <button onClick={toggleUserDropdown} className="hover-effect" style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.25)',
                color: '#fff',
                border: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}>
                {getUserInitials(userName, userEmail)}
              </button>
              {userDropdownOpen && (
                <div className="fade-in" style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  minWidth: '260px',
                  zIndex: 1001,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  color: '#1a202c'
                }}>
                  <div style={{ 
                    marginBottom: '1rem', 
                    borderBottom: '1px solid #e2e8f0', 
                    paddingBottom: '1rem' 
                  }}>
                    <strong style={{ color: '#2d3748', fontSize: '1rem' }}>{userName}</strong>
                    <div style={{ fontSize: '0.9rem', color: '#718096' }}>{userEmail}</div>
                  </div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#4a5568' }}>
                    Account Status: <span style={{ color: '#38a169', fontWeight: '600' }}>Active</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#4a5568' }}>
                    Member Since: {new Date().toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                    Last Login: {formatTime(currentTime)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Section: Sidebar and Main Panel */}
        <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 70px)' }}>
          {/* Sidebar - Light green background */}
          <aside style={{
            width: sidebarOpen ? '250px' : '80px',
            background: 'linear-gradient(180deg, #e8f5e8 0%, #f1f8e9 100%)', // Light green gradient
            padding: '1.5rem',
            borderRight: '1px solid #c8e6c9',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            boxShadow: '2px 0 10px rgba(0,0,0,0.05)'
          }}>
            <Sidebar sidebarOpen={sidebarOpen} />
          </aside>

          {/* Main Panel - Clean background with proper text color */}
          <main style={{
            flex: 1,
            padding: '2rem',
            backgroundColor: '#ffffff', // Clean white background
            color: '#2d3748', // Dark gray text for readability
            animation: 'fadeIn 0.8s ease-out',
            margin: '0',
            borderRadius: '0'
          }}>
            <Outlet />
          </main>
        </div>

        {/* Footer */}
        <Footer />

        {/* Click outside to close dropdown */}
        {userDropdownOpen && (
          <div
            onClick={() => setUserDropdownOpen(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0, bottom: 0, right: 0,
              zIndex: 999
            }}
          />
        )}
      </div>

      {/* Add some global styles to override any external backgrounds */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background-color: #ffffff !important;
          height: 100vh;
          overflow: hidden;
        }
        
        #root {
          background-color: #ffffff !important;
          height: 100vh;
        }
        
        .hover-effect:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}
// // src/Main.js
// import { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
// // import './common-auth.css';
// import Footer from './Footer';
// import Sidebar from './sidebar';

// export default function Main() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const email = localStorage.getItem('userEmail');
//     if (email) {
//       setUserEmail(email);
//       setUserName(email.split('@')[0]);
//     }

//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const toggleSidebar = () => setSidebarOpen(prev => !prev);
//   const toggleUserDropdown = () => setUserDropdownOpen(prev => !prev);

//   const formatTime = (date) =>
//     date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

//   const formatDate = (date) =>
//     date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//   const getUserInitials = (name, email) => {
//     if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//     return email ? email.slice(0, 2).toUpperCase() : 'U';
//   };

//   return (
//     <div className="fullscreen-container">

//     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
//       {/* Header */}
//       <header style={{
//         height: '70px',
//         backgroundColor: 'rgba(0, 77, 64, 0.95)',
//         backdropFilter: 'blur(8px)',
//         borderBottom: '1px solid var(--border-color)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '0 1.5rem',
//         position: 'sticky',
//         top: 0,
//         zIndex: 1000,
//         boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
//           {/* Sidebar Toggle */}
//           <button onClick={toggleSidebar} className="hover-effect" style={{
//             background: 'var(--primary-accent)',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '10px',
//             padding: '0.5rem',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//           }}>
//             {sidebarOpen ? '⇦' : '≡'}
//           </button>

//           {/* App Title */}
//           <h1 style={{
//             fontSize: '1.5rem',
//             fontWeight: '700',
//             color: '#fff',
//             margin: 0
//           }}>
//             Meeting Scheduler
//           </h1>
//         </div>

//         {/* Right Side */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//           <div style={{ textAlign: 'right' }}>
//             <div style={{ fontWeight: '600', color: '#fff' }}>Welcome, {userName}</div>
//             <div style={{ fontSize: '0.85rem', color: '#ccc' }}>{formatDate(currentTime)}</div>
//             <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: '#ccc' }}>{formatTime(currentTime)}</div>
//           </div>

//           {/* Avatar Button */}
//           <div style={{ position: 'relative' }}>
//             <button onClick={toggleUserDropdown} className="hover-effect" style={{
//               width: '40px',
//               height: '40px',
//               borderRadius: '10px',
//               background: 'var(--primary-accent)',
//               color: '#fff',
//               border: 'none',
//               fontWeight: '600',
//               fontSize: '0.9rem',
//               cursor: 'pointer',
//               boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//             }}>
//               {getUserInitials(userName, userEmail)}
//             </button>

//             {/* Dropdown */}
//             {userDropdownOpen && (
//               <div className="fade-in" style={{
//                 position: 'absolute',
//                 top: '110%',
//                 right: 0,
//                 backgroundColor: '#fff',
//                 border: '1px solid var(--border-color)',
//                 borderRadius: '10px',
//                 padding: '1rem',
//                 minWidth: '240px',
//                 zIndex: 1001,
//                 boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
//                 color: 'var(--text-dark)'
//               }}>
//                 <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
//                   <strong>{userName}</strong>
//                   <div style={{ fontSize: '0.9rem', color: 'var(--text-medium)' }}>{userEmail}</div>
//                 </div>
//                 <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Account Status: <span style={{ color: 'var(--success-color)' }}>Active</span></div>
//                 <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Member Since: {new Date().toLocaleDateString()}</div>
//                 <div style={{ fontSize: '0.9rem' }}>Last Login: {formatTime(currentTime)}</div>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Content */}
//       <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 70px)' }}>
//         {/* Sidebar */}
//         <aside style={{
//           width: sidebarOpen ? '250px' : '80px',
//           backgroundColor: 'rgba(255,255,255,0.1)',
//           backdropFilter: 'blur(10px)',
//           padding: '1rem',
//           borderRight: '1px solid var(--border-color)',
//           transition: 'width 0.3s ease',
//           overflow: 'hidden'
//         }}>
//           <Sidebar sidebarOpen={sidebarOpen} />
//         </aside>

//         {/* Main Panel */}
//         <main style={{
//           flex: 1,
//           padding: '2rem',
//           background: 'rgba(255,255,255,0.03)',
//           backdropFilter: 'blur(4px)',
//           color: '#fff',
//           animation: 'fadeIn 0.8s ease-out'
//         }}>
//           <Outlet />
//         </main>
//       </div>

//       {/* Footer */}
//       <Footer />

//       {/* Click outside to close dropdown */}
//       {userDropdownOpen && (
//         <div
//           onClick={() => setUserDropdownOpen(false)}
//           style={{
//             position: 'fixed',
//             top: 0, left: 0, bottom: 0, right: 0,
//             zIndex: 999
//           }}
//         />
//       )}
//     </div>
//     </div>
//   );
// }

// // src/Main.js
// import { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Footer from './Footer';
// import Sidebar from './sidebar';

// export default function Main() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const email = localStorage.getItem('userEmail');
//     if (email) {
//       setUserEmail(email);
//       setUserName(email.split('@')[0]);
//     }

//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(prev => !prev);
//   };

//   const toggleUserDropdown = () => {
//     setUserDropdownOpen(prev => !prev);
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     });
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getUserInitials = (name, email) => {
//     if (name) {
//       return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//     }
//     return email ? email.slice(0, 2).toUpperCase() : 'U';
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       // Changed to Deep Harbor and Misty Pine for the main background
//       background: 'linear-gradient(135deg, #134340 0%, #7C8C76 100%)',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//       display: 'flex',
//       flexDirection: 'column'
//     }}>

//       {/* Modern Header */}
//       <header style={{
//         // Using Sea Salt Sage with opacity for header background
//         background: 'rgba(135, 157, 145, 0.3)',
//         backdropFilter: 'blur(20px)',
//         borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//         padding: '1rem 2rem',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         position: 'sticky',
//         top: 0,
//         zIndex: 1000
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '1rem'
//         }}>
//           {/* Sidebar Toggle Button */}
//           <button
//             onClick={toggleSidebar}
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               border: '1px solid rgba(255, 255, 255, 0.2)',
//               borderRadius: '8px',
//               padding: '0.5rem',
//               color: 'white',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = 'rgba(255, 255, 255, 0.2)';
//               e.target.style.transform = 'translateY(-1px)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
//               e.target.style.transform = 'translateY(0)';
//             }}
//           >
//             {sidebarOpen ? (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             ) : (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             )}
//           </button>

//           {/* Site Logo/Title */}
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '0.5rem',
//             color: 'white'
//           }}>
//             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
//               <line x1="16" y1="2" x2="16" y2="6"/>
//               <line x1="8" y1="2" x2="8" y2="6"/>
//               <line x1="3" y1="10" x2="21" y2="10"/>
//               <circle cx="8" cy="14" r="2"/>
//               <path d="M10.5 17.5L8 15l-2.5 2.5"/>
//             </svg>
//             <h1 style={{
//               fontSize: '1.5rem',
//               fontWeight: '700',
//               margin: 0,
//               background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text'
//             }}>
//               Schedule
//             </h1>
//           </div>
//         </div>

//         {/* Welcome Section and User Info */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '2rem',
//           color: 'white'
//         }}>
//           {/* Welcome Message with Time */}
//           <div style={{
//             textAlign: 'right',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '0.25rem'
//           }}>
//             <div style={{
//               fontSize: '1.1rem',
//               fontWeight: '600'
//             }}>
//               Welcome, {userName}
//             </div>
//             <div style={{
//               fontSize: '0.9rem',
//               opacity: '0.8'
//             }}>
//               {formatDate(currentTime)}
//             </div>
//             <div style={{
//               fontSize: '1rem',
//               fontWeight: '500',
//               // Using Sea Salt Sage for the time color
//               color: '#879D91'
//             }}>
//               {formatTime(currentTime)}
//             </div>
//           </div>

//           {/* User Avatar with Dropdown */}
//           <div style={{ position: 'relative' }}>
//             <button
//               onClick={toggleUserDropdown}
//               style={{
//                 width: '45px',
//                 height: '45px',
//                 borderRadius: '50%',
//                 // Changed to Deep Harbor and Misty Pine for avatar background
//                 background: 'linear-gradient(135deg, #134340 0%, #7C8C76 100%)',
//                 border: '2px solid rgba(255, 255, 255, 0.2)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontWeight: 'bold',
//                 fontSize: '1rem',
//                 color: 'white',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = 'scale(1.05)';
//                 e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = 'scale(1)';
//                 e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
//               }}
//             >
//               {getUserInitials(userName, userEmail)}
//             </button>

//             {/* User Dropdown */}
//             {userDropdownOpen && (
//               <div style={{
//                 position: 'absolute',
//                 top: '100%',
//                 right: '0',
//                 marginTop: '0.5rem',
//                 background: 'rgba(255, 255, 255, 0.95)',
//                 backdropFilter: 'blur(20px)',
//                 borderRadius: '12px',
//                 border: '1px solid rgba(255, 255, 255, 0.2)',
//                 boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
//                 padding: '1rem',
//                 minWidth: '250px',
//                 zIndex: 1001,
//                 animation: 'fadeInDown 0.3s ease'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.75rem',
//                   marginBottom: '1rem',
//                   paddingBottom: '1rem',
//                   borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
//                 }}>
//                   <div style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     // Changed to Deep Harbor and Misty Pine for dropdown avatar
//                     background: 'linear-gradient(135deg, #134340 0%, #7C8C76 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontWeight: 'bold',
//                     fontSize: '0.9rem',
//                     color: 'white'
//                   }}>
//                     {getUserInitials(userName, userEmail)}
//                   </div>
//                   <div>
//                     <div style={{
//                       fontWeight: '600',
//                       color: '#1f2937',
//                       fontSize: '0.95rem'
//                     }}>
//                       {userName}
//                     </div>
//                     <div style={{
//                       fontSize: '0.8rem',
//                       color: '#6b7280'
//                     }}>
//                       {userEmail}
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: '0.5rem'
//                 }}>
//                   <div style={{
//                     padding: '0.5rem',
//                     borderRadius: '6px',
//                     fontSize: '0.85rem',
//                     color: '#374151'
//                   }}>
//                     <strong>Account Status:</strong> Active
//                   </div>
//                   <div style={{
//                     padding: '0.5rem',
//                     borderRadius: '6px',
//                     fontSize: '0.85rem',
//                     color: '#374151'
//                   }}>
//                     <strong>Member Since:</strong> {new Date().toLocaleDateString()}
//                   </div>
//                   <div style={{
//                     padding: '0.5rem',
//                     borderRadius: '6px',
//                     fontSize: '0.85rem',
//                     color: '#374151'
//                   }}>
//                     <strong>Last Login:</strong> {formatTime(currentTime)}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <div style={{
//         display: 'flex',
//         flex: 1,
//         minHeight: 'calc(100vh - 80px)'
//       }}>
//         {/* Sidebar */}
//         <aside style={{
//           width: sidebarOpen ? '280px' : '90px',
//           // Using Sea Salt Sage with opacity for sidebar background
//           background: 'rgba(135, 157, 145, 0.3)',
//           backdropFilter: 'blur(20px)',
//           borderRight: '1px solid rgba(255, 255, 255, 0.1)',
//           padding: '2rem 1rem',
//           transition: 'width 0.3s ease, padding 0.3s ease',
//           overflow: 'hidden',
//           flexShrink: 0
//         }}>
//           <Sidebar sidebarOpen={sidebarOpen} />
//         </aside>

//         {/* Page Content */}
//         <main style={{
//           flex: 1,
//           padding: '2rem',
//           background: 'transparent',
//           transition: 'all 0.3s ease'
//         }}>
//           <div style={{
//             // Using Sea Salt Sage with opacity for main content area background
//             background: 'rgba(135, 157, 145, 0.3)',
//             backdropFilter: 'blur(20px)',
//             borderRadius: '20px',
//             border: '1px solid rgba(255, 255, 255, 0.1)',
//             padding: '2rem',
//             minHeight: 'calc(100% - 4rem)',
//             boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
//             animation: 'fadeInUp 0.6s ease',
//             color: 'white'
//           }}>
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       {/* Footer */}
//       <Footer />

//       {/* Click outside to close dropdown */}
//       {userDropdownOpen && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 999
//           }}
//           onClick={() => setUserDropdownOpen(false)}
//         />
//       )}

//       {/* Global Styles for Animations */}
//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             transform: translateX(-100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         @keyframes fadeInUp {
//           from {
//             transform: translateY(20px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         @keyframes fadeInDown {
//           from {
//             transform: translateY(-10px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
//     </div>
//   );
// // }

// // src/Main.js
// import { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Footer from './Footer';
// import Sidebar from './sidebar';

// export default function Main() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const email = localStorage.getItem('userEmail');
//     if (email) {
//       setUserEmail(email);
//       setUserName(email.split('@')[0]);
//     }

//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(prev => !prev);
//   };

//   const toggleUserDropdown = () => {
//     setUserDropdownOpen(prev => !prev);
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     });
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getUserInitials = (name, email) => {
//     if (name) {
//       return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//     }
//     return email ? email.slice(0, 2).toUpperCase() : 'U';
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//       display: 'flex',
//       flexDirection: 'column'
//     }}>
      
//       {/* Modern Header */}
//       <header style={{
//         background: 'rgba(255, 255, 255, 0.1)',
//         backdropFilter: 'blur(20px)',
//         borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//         padding: '1rem 2rem',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         position: 'sticky',
//         top: 0,
//         zIndex: 1000
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '1rem'
//         }}>
//           {/* Sidebar Toggle Button */}
//           <button
//             onClick={toggleSidebar}
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               border: '1px solid rgba(255, 255, 255, 0.2)',
//               borderRadius: '8px',
//               padding: '0.5rem',
//               color: 'white',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = 'rgba(255, 255, 255, 0.2)';
//               e.target.style.transform = 'translateY(-1px)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
//               e.target.style.transform = 'translateY(0)';
//             }}
//           >
//             {sidebarOpen ? (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             ) : (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             )}
//           </button>

//           {/* Site Logo/Title */}
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '0.5rem',
//             color: 'white'
//           }}>
//             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
//               <line x1="16" y1="2" x2="16" y2="6"/>
//               <line x1="8" y1="2" x2="8" y2="6"/>
//               <line x1="3" y1="10" x2="21" y2="10"/>
//               <circle cx="8" cy="14" r="2"/>
//               <path d="M10.5 17.5L8 15l-2.5 2.5"/>
//             </svg>
//             <h1 style={{
//               fontSize: '1.5rem',
//               fontWeight: '700',
//               margin: 0,
//               background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text'
//             }}>
//               Schedule
//             </h1>
//           </div>
//         </div>

//         {/* Welcome Section and User Info */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '2rem',
//           color: 'white'
//         }}>
//           {/* Welcome Message with Time */}
//           <div style={{
//             textAlign: 'right',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '0.25rem'
//           }}>
//             <div style={{
//               fontSize: '1.1rem',
//               fontWeight: '600'
//             }}>
//               Welcome, {userName}
//             </div>
//             <div style={{
//               fontSize: '0.9rem',
//               opacity: '0.8'
//             }}>
//               {formatDate(currentTime)}
//             </div>
//             <div style={{
//               fontSize: '1rem',
//               fontWeight: '500',
//               color: '#93c5fd'
//             }}>
//               {formatTime(currentTime)}
//             </div>
//           </div>

//           {/* User Avatar with Dropdown */}
//           <div style={{ position: 'relative' }}>
//             <button
//               onClick={toggleUserDropdown}
//               style={{
//                 width: '45px',
//                 height: '45px',
//                 borderRadius: '50%',
//                 background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
//                 border: '2px solid rgba(255, 255, 255, 0.2)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontWeight: 'bold',
//                 fontSize: '1rem',
//                 color: 'white',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = 'scale(1.05)';
//                 e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = 'scale(1)';
//                 e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
//               }}
//             >
//               {getUserInitials(userName, userEmail)}
//             </button>

//             {/* User Dropdown */}
//             {userDropdownOpen && (
//               <div style={{
//                 position: 'absolute',
//                 top: '100%',
//                 right: '0',
//                 marginTop: '0.5rem',
//                 background: 'rgba(255, 255, 255, 0.95)',
//                 backdropFilter: 'blur(20px)',
//                 borderRadius: '12px',
//                 border: '1px solid rgba(255, 255, 255, 0.2)',
//                 boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
//                 padding: '1rem',
//                 minWidth: '250px',
//                 zIndex: 1001,
//                 animation: 'fadeInDown 0.3s ease'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.75rem',
//                   marginBottom: '1rem',
//                   paddingBottom: '1rem',
//                   borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
//                 }}>
//                   <div style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontWeight: 'bold',
//                     fontSize: '0.9rem',
//                     color: 'white'
//                   }}>
//                     {getUserInitials(userName, userEmail)}
//                   </div>
//                   <div>
//                     <div style={{
//                       fontWeight: '600',
//                       color: '#1f2937',
//                       fontSize: '0.95rem'
//                     }}>
//                       {userName}
//                     </div>
//                     <div style={{
//                       fontSize: '0.8rem',
//                       color: '#6b7280'
//                     }}>
//                       {userEmail}
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: '0.5rem'
//                 }}>
//                   <div style={{
//                     padding: '0.5rem',
//                     borderRadius: '6px',
//                     fontSize: '0.85rem',
//                     color: '#374151'
//                   }}>
//                     <strong>Account Status:</strong> Active
//                   </div>
//                   <div style={{
//                     padding: '0.5rem',
//                     borderRadius: '6px',
//                     fontSize: '0.85rem',
//                     color: '#374151'
//                   }}>
//                     <strong>Member Since:</strong> {new Date().toLocaleDateString()}
//                   </div>
//                   <div style={{
//                     padding: '0.5rem',
//                     borderRadius: '6px',
//                     fontSize: '0.85rem',
//                     color: '#374151'
//                   }}>
//                     <strong>Last Login:</strong> {formatTime(currentTime)}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <div style={{
//         display: 'flex',
//         flex: 1,
//         minHeight: 'calc(100vh - 80px)'
//       }}>
//         {/* Sidebar */}
//         <aside style={{
//           width: sidebarOpen ? '280px' : '90px',
//           background: 'rgba(255, 255, 255, 0.1)',
//           backdropFilter: 'blur(20px)',
//           borderRight: '1px solid rgba(255, 255, 255, 0.1)',
//           padding: '2rem 1rem',
//           transition: 'width 0.3s ease, padding 0.3s ease',
//           overflow: 'hidden',
//           flexShrink: 0
//         }}>
//           <Sidebar sidebarOpen={sidebarOpen} />
//         </aside>

//         {/* Page Content */}
//         <main style={{
//           flex: 1,
//           padding: '2rem',
//           background: 'transparent',
//           transition: 'all 0.3s ease'
//         }}>
//           <div style={{
//             background: 'rgba(255, 255, 255, 0.1)',
//             backdropFilter: 'blur(20px)',
//             borderRadius: '20px',
//             border: '1px solid rgba(255, 255, 255, 0.1)',
//             padding: '2rem',
//             minHeight: 'calc(100% - 4rem)',
//             boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
//             animation: 'fadeInUp 0.6s ease',
//             color: 'white',
//             maxWidth: '100%'
//           }}>
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       {/* Footer */}
//       <Footer />

//       {/* Click outside to close dropdown */}
//       {userDropdownOpen && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 999
//           }}
//           onClick={() => setUserDropdownOpen(false)}
//         />
//       )}

//       {/* Global Styles for Animations */}
//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             transform: translateX(-100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         @keyframes fadeInUp {
//           from {
//             transform: translateY(20px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         @keyframes fadeInDown {
//           from {
//             transform: translateY(-10px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         * {
//           box-sizing: full-page;
//         }
//       `}</style>
//     </div>
//   );
// }
