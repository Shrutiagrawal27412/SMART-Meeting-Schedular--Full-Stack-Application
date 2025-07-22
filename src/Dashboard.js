// src/components/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUserName(userEmail.split('@')[0]);
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const quickActions = [
    {
      title: 'Create Meeting',
      description: 'Schedule a new meeting with participants',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
        </svg>
      ), 
      link: '/main/create-meeting',
      bgColor: '#415A77' // Medium blue
    },
    {
      title: 'Update Profile',
      description: 'Manage your account settings',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      link: '/main/update-profile',
      bgColor: '#778DA9' // Light blue/gray
    },
    {
      title: 'Reset Password',
      description: 'Change your account password',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      link: '/main/forgot-password',
      bgColor: '#E0E1DD' // Lightest color (will need dark icon)
    }
  ];

  return (
    <div style={{
      color: '#E0E1DD', // Default text color for the Dashboard content
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* User Welcome and Time Display */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
      }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem', fontWeight: '700' }}>Welcome, {userName}</h1>
          <p style={{ margin: 0, fontSize: '1.1rem', opacity: '0.8', color: '#778DA9' }}>{formatDate(currentTime)}</p>
        </div>
        <div style={{
          textAlign: 'right',
          fontSize: '1.5rem',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          color: '#778DA9'
        }}>
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Header for the Dashboard content */}
      <div style={{
        background: '#1B263B', // Dark blue background for this section
        borderRadius: '20px',
        border: '1px solid #415A77', // Accent border
        padding: '2rem',
        textAlign: 'center',
        marginBottom: '3rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        color: '#E0E1DD' // Light text color
      }}>
        <Header title="Schedule" subtitle="Professional Meeting Scheduler" /> {/* Your existing Header component */}
        <p style={{
          color: '#E0E1DD',
          fontSize: '1.2rem',
          fontWeight: '500',
          marginTop: '1rem'
        }}>
          Your central hub for meeting management.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div style={{
        marginBottom: '3rem'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          marginBottom: '2rem',
          color: '#E0E1DD',
          textAlign: 'center'
        }}>
          Quick Actions
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              style={{
                textDecoration: 'none',
                display: 'block'
              }}
            >
              <div
                style={{
                  background: '#1B263B', // Dark blue for card background
                  borderRadius: '20px',
                  border: '1px solid #415A77', // Accent border
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  height: '100%',
                  color: '#E0E1DD' // Light text color for card content
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.background = '#0D1B2A'; // Even darker blue on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.background = '#1B263B';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: action.bgColor,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: action.bgColor === '#E0E1DD' ? '#0D1B2A' : '#E0E1DD', // Dark icon for lightest background, light for others
                    boxShadow: `0 8px 25px ${action.bgColor}30`
                  }}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#E0E1DD',
                      margin: 0
                    }}>
                      {action.title}
                    </h3>
                  </div>
                </div>
                <p style={{
                  color: '#778DA9', // Lighter accent for description
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats or Additional Info */}
      <div style={{
        background: '#1B263B', // Dark blue background for this section
        borderRadius: '20px',
        border: '1px solid #415A77', // Accent border
        padding: '2rem',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        color: '#E0E1DD' // Light text color
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#E0E1DD',
          marginBottom: '1rem'
        }}>
          Meeting Scheduler Dashboard
        </h3>
        <p style={{
          color: '#778DA9', // Lighter accent for description
          fontSize: '1rem',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Streamline your meeting scheduling with our professional platform.
          Create meetings, manage your profile, and stay organized with our intuitive interface.
        </p>
      </div>
    </div>
  );
}
// // src/components/Dashboard.jsx
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Header from './Header'; // This is your title/subtitle Header component

// export default function Dashboard() {
//   const [userName, setUserName] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const userEmail = localStorage.getItem('userEmail');
//     if (userEmail) {
//       setUserName(userEmail.split('@')[0]);
//     }


//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

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

//   const quickActions = [
//     {
//       title: 'Create Meeting',
//       description: 'Schedule a new meeting with participants',
//       icon: (
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
//           <line x1="16" y1="2" x2="16" y2="6"/>
//           <line x1="8" y1="2" x2="8" y2="6"/>
//           <line x1="3" y1="10" x2="21" y2="10"/>
//           <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
//         </svg>
//       ),
//       link: '/main/create-meeting',
//       // Changed to Deep Harbor
//       color: '#134340'
//     },
//     {
//       title: 'Update Profile',
//       description: 'Manage your account settings',
//       icon: (
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//           <circle cx="12" cy="7" r="4"/>
//         </svg>
//       ),
//       link: '/main/update-profile',
//       // Changed to Misty Pine
//       color: '#7C8C76'
//     },
//     {
//       title: 'Reset Password',
//       description: 'Change your account password',
//       icon: (
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//           <circle cx="12" cy="16" r="1"/>
//           <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//         </svg>
//       ),
//       link: '/main/forgot-password',
//       // Changed to Sea Salt Sage
//       color: '#879D91'
//     }
//   ];

//   return (
//     <div style={{
//       color: 'white',
//       fontFamily: 'Inter, system-ui, sans-serif'
//     }}>
//       {/* User Welcome and Time Display */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '2rem',
//       }}>
//         <div>
//           <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem', fontWeight: '700' }}>Welcome, {userName}</h1>
//           <p style={{ margin: 0, fontSize: '1.1rem', opacity: '0.8' }}>{formatDate(currentTime)}</p>
//         </div>
//         <div style={{
//           textAlign: 'right',
//           fontSize: '1.5rem',
//           fontWeight: '600',
//           whiteSpace: 'nowrap'
//         }}>
//           {formatTime(currentTime)}
//         </div>
//       </div>

//       {/* This is the Header for the Dashboard content */}
//       <div style={{
//         // Using Sea Salt Sage with opacity for header background
//         background: 'rgba(135, 157, 145, 0.3)',
//         backdropFilter: 'blur(20px)',
//         borderRadius: '20px',
//         border: '1px solid rgba(255, 255, 255, 0.2)',
//         padding: '2rem',
//         textAlign: 'center',
//         marginBottom: '3rem',
//         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
//       }}>
//         <Header title="Schedule" subtitle="Professional Meeting Scheduler" /> {/* Your existing Header component */}
//         <p style={{
//           color: 'rgba(255, 255, 255, 0.8)',
//           fontSize: '1.2rem',
//           fontWeight: '500',
//           marginTop: '1rem'
//         }}>
//           Your central hub for meeting management.
//         </p>
//       </div>

//       {/* Quick Actions Grid */}
//       <div style={{
//         marginBottom: '3rem'
//       }}>
//         <h2 style={{
//           fontSize: '1.8rem',
//           fontWeight: '600',
//           marginBottom: '2rem',
//           color: 'white',
//           textAlign: 'center'
//         }}>
//           Quick Actions
//         </h2>

//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//           gap: '1.5rem',
//           maxWidth: '1000px',
//           margin: '0 auto'
//         }}>
//           {quickActions.map((action, index) => (
//             <Link
//               key={index}
//               to={action.link}
//               style={{
//                 textDecoration: 'none',
//                 display: 'block'
//               }}
//             >
//               <div
//                 style={{
//                   // Using Sea Salt Sage with opacity for action background
//                   background: 'rgba(135, 157, 145, 0.3)',
//                   backdropFilter: 'blur(20px)',
//                   borderRadius: '20px',
//                   border: '1px solid rgba(255, 255, 255, 0.2)',
//                   padding: '2rem',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//                   height: '100%'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = 'translateY(-8px)';
//                   e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
//                   // Using Sea Salt Sage with more opacity for hover
//                   e.currentTarget.style.background = 'rgba(135, 157, 145, 0.45)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
//                   e.currentTarget.style.background = 'rgba(135, 157, 145, 0.3)';
//                 }}
//               >
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '1rem',
//                   marginBottom: '1rem'
//                 }}>
//                   <div style={{
//                     width: '60px',
//                     height: '60px',
//                     background: action.color || '#6366f1',
//                     borderRadius: '16px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: 'white',
//                     boxShadow: `0 8px 25px ${action.color}30`
//                   }}>
//                     {action.icon}
//                   </div>
//                   <div>
//                     <h3 style={{
//                       fontSize: '1.25rem',
//                       fontWeight: '600',
//                       color: 'white',
//                       margin: 0
//                     }}>
//                       {action.title}
//                     </h3>
//                   </div>
//                 </div>
//                 <p style={{
//                   color: 'rgba(255, 255, 255, 0.7)',
//                   fontSize: '1rem',
//                   lineHeight: '1.5',
//                   margin: 0
//                 }}>
//                   {action.description}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Stats or Additional Info */}
//       <div style={{
//         // Using Sea Salt Sage with opacity for info section background
//         background: 'rgba(135, 157, 145, 0.3)',
//         backdropFilter: 'blur(20px)',
//         borderRadius: '20px',
//         border: '1px solid rgba(255, 255, 255, 0.2)',
//         padding: '2rem',
//         textAlign: 'center',
//         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
//       }}>
//         <h3 style={{
//           fontSize: '1.5rem',
//           fontWeight: '600',
//           color: 'white',
//           marginBottom: '1rem'
//         }}>
//           Meeting Scheduler Dashboard
//         </h3>
//         <p style={{
//           color: 'rgba(255, 255, 255, 0.7)',
//           fontSize: '1rem',
//           lineHeight: '1.6',
//           maxWidth: '600px',
//           margin: '0 auto'
//         }}>
//           Streamline your meeting scheduling with our professional platform.
//           Create meetings, manage your profile, and stay organized with our intuitive interface.
//         </p>
//       </div>
//     </div>
//   );
// }
// // // src/components/Dashboard.jsx
// // import { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import Header from './Header'; // This is your title/subtitle Header component

// // export default function Dashboard() {
// //   const [userName, setUserName] = useState('');
// //   const [currentTime, setCurrentTime] = useState(new Date());

// //   useEffect(() => {
// //     const userEmail = localStorage.getItem('userEmail');
// //     if (userEmail) {
// //       setUserName(userEmail.split('@')[0]);
// //     }


// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   const formatTime = (date) => {
// //     return date.toLocaleTimeString('en-US', {
// //       hour: '2-digit',
// //       minute: '2-digit',
// //       second: '2-digit',
// //       hour12: true
// //     });
// //   };

// //   const formatDate = (date) => {
// //     return date.toLocaleDateString('en-US', {
// //       weekday: 'long',
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   const quickActions = [
// //     {
// //       title: 'Create Meeting',
// //       description: 'Schedule a new meeting with participants',
// //       icon: (
// //         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
// //           <line x1="16" y1="2" x2="16" y2="6"/>
// //           <line x1="8" y1="2" x2="8" y2="6"/>
// //           <line x1="3" y1="10" x2="21" y2="10"/>
// //           <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
// //         </svg>
// //       ),
// //       link: '/main/create-meeting',
// //       color: '#3b82f6'
// //     },
// //     {
// //       title: 'Update Profile',
// //       description: 'Manage your account settings',
// //       icon: (
// //         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
// //           <circle cx="12" cy="7" r="4"/>
// //         </svg>
// //       ),
// //       link: '/main/update-profile',
// //       color: '#8b5cf6'
// //     },
// //     {
// //       title: 'Reset Password',
// //       description: 'Change your account password',
// //       icon: (
// //         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
// //           <circle cx="12" cy="16" r="1"/>
// //           <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
// //         </svg>
// //       ),
// //       link: '/main/forgot-password',
// //       color: '#10b981'
// //     }
// //   ];

// //   return (
// //     <div style={{
// //       color: 'white',
// //       fontFamily: 'Inter, system-ui, sans-serif'
// //     }}>
// //       {/* User Welcome and Time Display */}
// //       <div style={{
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         marginBottom: '2rem',
// //       }}>
// //         <div>
// //           <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem', fontWeight: '700' }}>Welcome, {userName}</h1>
// //           <p style={{ margin: 0, fontSize: '1.1rem', opacity: '0.8' }}>{formatDate(currentTime)}</p>
// //         </div>
// //         <div style={{
// //           textAlign: 'right',
// //           fontSize: '1.5rem',
// //           fontWeight: '600',
// //           whiteSpace: 'nowrap'
// //         }}>
// //           {formatTime(currentTime)}
// //         </div>
// //       </div>

// //       {/* This is the Header for the Dashboard content */}
// //       <div style={{
// //         background: 'rgba(255, 255, 255, 0.1)',
// //         backdropFilter: 'blur(20px)',
// //         borderRadius: '20px',
// //         border: '1px solid rgba(255, 255, 255, 0.2)',
// //         padding: '2rem',
// //         textAlign: 'center',
// //         marginBottom: '3rem',
// //         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
// //       }}>
// //         <Header title="Schedule" subtitle="Professional Meeting Scheduler" /> {/* Your existing Header component */}
// //         <p style={{
// //           color: 'rgba(255, 255, 255, 0.8)',
// //           fontSize: '1.2rem',
// //           fontWeight: '500',
// //           marginTop: '1rem'
// //         }}>
// //           Your central hub for meeting management.
// //         </p>
// //       </div>

// //       {/* Quick Actions Grid */}
// //       <div style={{
// //         marginBottom: '3rem'
// //       }}>
// //         <h2 style={{
// //           fontSize: '1.8rem',
// //           fontWeight: '600',
// //           marginBottom: '2rem',
// //           color: 'white',
// //           textAlign: 'center'
// //         }}>
// //           Quick Actions
// //         </h2>

// //         <div style={{
// //           display: 'grid',
// //           gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
// //           gap: '1.5rem',
// //           maxWidth: '1000px',
// //           margin: '0 auto'
// //         }}>
// //           {quickActions.map((action, index) => (
// //             <Link
// //               key={index}
// //               to={action.link}
// //               style={{
// //                 textDecoration: 'none',
// //                 display: 'block'
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   background: 'rgba(255, 255, 255, 0.1)',
// //                   backdropFilter: 'blur(20px)',
// //                   borderRadius: '20px',
// //                   border: '1px solid rgba(255, 255, 255, 0.2)',
// //                   padding: '2rem',
// //                   cursor: 'pointer',
// //                   transition: 'all 0.3s ease',
// //                   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
// //                   height: '100%'
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   e.currentTarget.style.transform = 'translateY(-8px)';
// //                   e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
// //                   e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   e.currentTarget.style.transform = 'translateY(0)';
// //                   e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
// //                   e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
// //                 }}
// //               >
// //                 <div style={{
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   gap: '1rem',
// //                   marginBottom: '1rem'
// //                 }}>
// //                   <div style={{
// //                     width: '60px',
// //                     height: '60px',
// //                     background: action.color || '#6366f1',
// //                     borderRadius: '16px',
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     justifyContent: 'center',
// //                     color: 'white',
// //                     boxShadow: `0 8px 25px ${action.color}30`
// //                   }}>
// //                     {action.icon}
// //                   </div>
// //                   <div>
// //                     <h3 style={{
// //                       fontSize: '1.25rem',
// //                       fontWeight: '600',
// //                       color: 'white',
// //                       margin: 0
// //                     }}>
// //                       {action.title}
// //                     </h3>
// //                   </div>
// //                 </div>
// //                 <p style={{
// //                   color: 'rgba(255, 255, 255, 0.7)',
// //                   fontSize: '1rem',
// //                   lineHeight: '1.5',
// //                   margin: 0
// //                 }}>
// //                   {action.description}
// //                 </p>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Stats or Additional Info */}
// //       <div style={{
// //         background: 'rgba(255, 255, 255, 0.1)',
// //         backdropFilter: 'blur(20px)',
// //         borderRadius: '20px',
// //         border: '1px solid rgba(255, 255, 255, 0.2)',
// //         padding: '2rem',
// //         textAlign: 'center',
// //         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
// //       }}>
// //         <h3 style={{
// //           fontSize: '1.5rem',
// //           fontWeight: '600',
// //           color: 'white',
// //           marginBottom: '1rem'
// //         }}>
// //           Meeting Scheduler Dashboard
// //         </h3>
// //         <p style={{
// //           color: 'rgba(255, 255, 255, 0.7)',
// //           fontSize: '1rem',
// //           lineHeight: '1.6',
// //           maxWidth: '600px',
// //           margin: '0 auto'
// //         }}>
// //           Streamline your meeting scheduling with our professional platform.
// //           Create meetings, manage your profile, and stay organized with our intuitive interface.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }
