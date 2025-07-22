// src/components/Sidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Accept sidebarOpen prop
export default function Sidebar({ sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const sidebarItems = [
    {
      title: 'Home',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      ),
      link: '/main' // Link to the dashboard route
    },
    {
      title: 'Update Profile',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      link: '/main/update-profile'
    },
    {
      title: 'Create Meeting',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
        </svg>
      ),
      link: '/main/create-meeting'
    },
    {
      title: 'View Meetings', // Added this back for completeness
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <path d="M12 16h.01"></path>
          <path d="M12 12h.01"></path>
          <path d="M16 12h.01"></path>
          <path d="M8 12h.01"></path>
        </svg>
      ),
      link: '/main/view-meetings'
    },
    {
      title: 'Reset Password',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      link: '/forgot-password'
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      padding: '1rem 0',
      color: '#E0E1DD' // Default text color for sidebar items
    }}>
      <div>
        {/* Dashboard Menu Header */}
        <div style={{
          padding: sidebarOpen ? '0 1rem 1.5rem' : '0 0.5rem 1.5rem',
          color: 'black',
          fontSize: sidebarOpen ? '1.2rem' : '0.9rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'flex-start' : 'center',
          gap: '10px',
          borderBottom: '1px solid #415A77', // Accent border
          marginBottom: '1rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {sidebarOpen && "Dashboard Menu"}
        </div>

        {/* Sidebar Items */}
        <div style={{ padding: sidebarOpen ? '0 0.5rem' : '0 0.2rem' }}>
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                gap: sidebarOpen ? '12px' : '0',
                padding: sidebarOpen ? '12px 18px' : '12px',
                margin: '4px 0',
                borderRadius: '10px',
                color: 'black',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                background: location.pathname === item.link ? '#415A77' : 'transparent', // Medium blue for active
                boxShadow: location.pathname === item.link ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.link) {
                  e.currentTarget.style.background = '#E0E1DD'; // Dark blue on hover
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.link) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {item.icon}
              {sidebarOpen && (
                <span style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {item.title}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div style={{ padding: sidebarOpen ? '1rem' : '0.5rem' }}>
        <button
          onClick={handleLogout}
          style={{
            width: sidebarOpen ? '100%' : '50px',
            height: sidebarOpen ? 'auto' : '50px',
            background: '#EF4444', // Red for logout button
            border: '1px solid #DC2626',
            color: '#E0E1DD',
            padding: sidebarOpen ? '12px' : '0',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarOpen ? 'center' : 'center',
            gap: '10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
              e.currentTarget.style.background = '#DC2626'; // Darker red on hover
              e.currentTarget.style.borderColor = '#B91C1C';
              e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
              e.currentTarget.style.background = '#EF4444';
              e.currentTarget.style.borderColor = '#DC2626';
              e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="17 16 22 12 17 8"></polyline>
            <line x1="22" y1="12" x2="10" y2="12"></line>
          </svg>
          {sidebarOpen && "Logout"}
        </button>
      </div>
    </div>
  );
}

// // src/components/Sidebar.jsx
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// // Accept sidebarOpen prop
// export default function Sidebar({ sidebarOpen }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userData');
//     navigate('/');
//   };

//   const sidebarItems = [
//     {
//       title: 'Home',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <rect x="3" y="3" width="7" height="7"/>
//           <rect x="14" y="3" width="7" height="7"/>
//           <rect x="14" y="14" width="7" height="7"/>
//           <rect x="3" y="14" width="7" height="7"/>
//         </svg>
//       ),
//       link: '/main' // Link to the dashboard route
//     },
//     {
//       title: 'Update Profile',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//           <circle cx="12" cy="7" r="4"/>
//         </svg>
//       ),
//       link: '/main/update-profile'
//     },
//     {
//       title: 'Create Meeting',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
//           <line x1="16" y1="2" x2="16" y2="6"/>
//           <line x1="8" y1="2" x2="8" y2="6"/>
//           <line x1="3" y1="10" x2="21" y2="10"/>
//           <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
//         </svg>
//       ),
//       link: '/main/create-meeting'
//     },
//     {
//       title: 'Reset Password',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//           <circle cx="12" cy="16" r="1"/>
//           <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//         </svg>
//       ),
//       link: '/forgot-password'
//     }
//   ];

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       height: '100%',
//       padding: '1rem 0'
//     }}>
//       <div>
//         {/* Dashboard Menu Header */}
//         <div style={{
//           padding: sidebarOpen ? '0 1rem 1.5rem' : '0 0.5rem 1.5rem', // Adjust padding based on state
//           color: 'white',
//           fontSize: sidebarOpen ? '1.2rem' : '0.9rem', // Adjust font size
//           fontWeight: '600',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: sidebarOpen ? 'flex-start' : 'center', // Center when collapsed
//           gap: '10px',
//           borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//           marginBottom: '1rem',
//           whiteSpace: 'nowrap',
//           overflow: 'hidden'
//         }}>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//           </svg>
//           {sidebarOpen && "Dashboard Menu"} {/* Conditionally render text */}
//         </div>

//         {/* Sidebar Items */}
//         <div style={{ padding: sidebarOpen ? '0 0.5rem' : '0 0.2rem' }}> {/* Adjust padding */}
//           {sidebarItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.link}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: sidebarOpen ? 'flex-start' : 'center', // Center icon when collapsed
//                 gap: sidebarOpen ? '12px' : '0', // No gap when collapsed
//                 padding: sidebarOpen ? '12px 18px' : '12px', // Adjust padding for icon-only
//                 margin: '4px 0',
//                 borderRadius: '10px',
//                 color: 'white',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease',
//                 // Using Sea Salt Sage with opacity for active background
//                 background: location.pathname === item.link ? 'rgba(135, 157, 145, 0.4)' : 'transparent',
//                 boxShadow: location.pathname === item.link ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none',
//               }}
//               onMouseEnter={(e) => {
//                 if (location.pathname !== item.link) {
//                   // Using Sea Salt Sage with less opacity for hover background
//                   e.currentTarget.style.background = 'rgba(135, 157, 145, 0.2)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (location.pathname !== item.link) {
//                   e.currentTarget.style.background = 'transparent';
//                 }
//               }}
//             >
//               {item.icon}
//               {sidebarOpen && ( // Conditionally render text
//                 <span style={{
//                   fontSize: '15px',
//                   fontWeight: '500',
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis'
//                 }}>
//                   {item.title}
//                 </span>
//               )}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Logout Button */}
//       <div style={{ padding: sidebarOpen ? '1rem' : '0.5rem' }}> {/* Adjust padding */}
//         <button
//           onClick={handleLogout}
//           style={{
//             width: sidebarOpen ? '100%' : '50px', // Adjust width for icon-only
//             height: sidebarOpen ? 'auto' : '50px', // Adjust height for icon-only
//             // Using a reddish hue for logout, keeping it distinct but toned down
//             background: 'rgba(239, 68, 68, 0.2)',
//             border: '1px solid rgba(239, 68, 68, 0.3)',
//             color: 'white',
//             padding: sidebarOpen ? '12px' : '0', // No padding when icon-only
//             borderRadius: '12px',
//             cursor: 'pointer',
//             fontWeight: '600',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: sidebarOpen ? 'center' : 'center', // Always center content
//             gap: '10px',
//             transition: 'all 0.3s ease',
//             boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
//             whiteSpace: 'nowrap',
//             overflow: 'hidden',
//           }}
//           onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
//               e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
//               e.currentTarget.style.transform = 'translateY(-2px)';
//           }}
//           onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
//               e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
//               e.currentTarget.style.transform = 'translateY(0)';
//           }}
//         >
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//             <polyline points="17 16 22 12 17 8"></polyline>
//             <line x1="22" y1="12" x2="10" y2="12"></line>
//           </svg>
//           {sidebarOpen && "Logout"} {/* Conditionally render text */}
//         </button>
//       </div>
//     </div>
//   );
// }
// // // src/components/Sidebar.jsx
// // import { Link, useLocation, useNavigate } from 'react-router-dom';

// // // Accept sidebarOpen prop
// // export default function Sidebar({ sidebarOpen }) {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const handleLogout = () => {
// //     localStorage.removeItem('userEmail');
// //     localStorage.removeItem('authToken');
// //     localStorage.removeItem('userData');
// //     navigate('/');
// //   };

// //   const sidebarItems = [
// //     {
// //       title: 'Home',
// //       icon: (
// //         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           <rect x="3" y="3" width="7" height="7"/>
// //           <rect x="14" y="3" width="7" height="7"/>
// //           <rect x="14" y="14" width="7" height="7"/>
// //           <rect x="3" y="14" width="7" height="7"/>
// //         </svg>
// //       ),
// //       link: '/main' // Link to the dashboard route
// //     },
// //     {
// //       title: 'Update Profile',
// //       icon: (
// //         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
// //           <circle cx="12" cy="7" r="4"/>
// //         </svg>
// //       ),
// //       link: '/main/update-profile'
// //     },
// //     {
// //       title: 'Create Meeting',
// //       icon: (
// //         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
// //           <line x1="16" y1="2" x2="16" y2="6"/>
// //           <line x1="8" y1="2" x2="8" y2="6"/>
// //           <line x1="3" y1="10" x2="21" y2="10"/>
// //           <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
// //         </svg>
// //       ),
// //       link: '/main/create-meeting'
// //     },
// //     {
// //       title: 'Reset Password',
// //       icon: (
// //         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
// //           <circle cx="12" cy="16" r="1"/>
// //           <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
// //         </svg>
// //       ),
// //       link: '/forgot-password'
// //     }
// //   ];

// //   return (
// //     <div style={{
// //       display: 'flex',
// //       flexDirection: 'column',
// //       justifyContent: 'space-between',
// //       height: '100%',
// //       padding: '1rem 0'
// //     }}>
// //       <div>
// //         {/* Dashboard Menu Header */}
// //         <div style={{
// //           padding: sidebarOpen ? '0 1rem 1.5rem' : '0 0.5rem 1.5rem', // Adjust padding based on state
// //           color: 'white',
// //           fontSize: sidebarOpen ? '1.2rem' : '0.9rem', // Adjust font size
// //           fontWeight: '600',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: sidebarOpen ? 'flex-start' : 'center', // Center when collapsed
// //           gap: '10px',
// //           borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
// //           marginBottom: '1rem',
// //           whiteSpace: 'nowrap',
// //           overflow: 'hidden'
// //         }}>
// //           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //             <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
// //           </svg>
// //           {sidebarOpen && "Dashboard Menu"} {/* Conditionally render text */}
// //         </div>

// //         {/* Sidebar Items */}
// //         <div style={{ padding: sidebarOpen ? '0 0.5rem' : '0 0.2rem' }}> {/* Adjust padding */}
// //           {sidebarItems.map((item, index) => (
// //             <Link
// //               key={index}
// //               to={item.link}
// //               style={{
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: sidebarOpen ? 'flex-start' : 'center', // Center icon when collapsed
// //                 gap: sidebarOpen ? '12px' : '0', // No gap when collapsed
// //                 padding: sidebarOpen ? '12px 18px' : '12px', // Adjust padding for icon-only
// //                 margin: '4px 0',
// //                 borderRadius: '10px',
// //                 color: 'white',
// //                 textDecoration: 'none',
// //                 transition: 'all 0.3s ease',
// //                 background: location.pathname === item.link ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
// //                 boxShadow: location.pathname === item.link ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none',
// //               }}
// //               onMouseEnter={(e) => {
// //                 if (location.pathname !== item.link) {
// //                   e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
// //                 }
// //               }}
// //               onMouseLeave={(e) => {
// //                 if (location.pathname !== item.link) {
// //                   e.currentTarget.style.background = 'transparent';
// //                 }
// //               }}
// //             >
// //               {item.icon}
// //               {sidebarOpen && ( // Conditionally render text
// //                 <span style={{
// //                   fontSize: '15px',
// //                   fontWeight: '500',
// //                   whiteSpace: 'nowrap',
// //                   overflow: 'hidden',
// //                   textOverflow: 'ellipsis'
// //                 }}>
// //                   {item.title}
// //                 </span>
// //               )}
// //             </Link>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Logout Button */}
// //       <div style={{ padding: sidebarOpen ? '1rem' : '0.5rem' }}> {/* Adjust padding */}
// //         <button
// //           onClick={handleLogout}
// //           style={{
// //             width: sidebarOpen ? '100%' : '50px', // Adjust width for icon-only
// //             height: sidebarOpen ? 'auto' : '50px', // Adjust height for icon-only
// //             background: 'rgba(239, 68, 68, 0.2)',
// //             border: '1px solid rgba(239, 68, 68, 0.3)',
// //             color: 'white',
// //             padding: sidebarOpen ? '12px' : '0', // No padding when icon-only
// //             borderRadius: '12px',
// //             cursor: 'pointer',
// //             fontWeight: '600',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: sidebarOpen ? 'center' : 'center', // Always center content
// //             gap: '10px',
// //             transition: 'all 0.3s ease',
// //             boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
// //             whiteSpace: 'nowrap',
// //             overflow: 'hidden',
// //           }}
// //           onMouseEnter={(e) => {
// //               e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
// //               e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
// //               e.currentTarget.style.transform = 'translateY(-2px)';
// //           }}
// //           onMouseLeave={(e) => {
// //               e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
// //               e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
// //               e.currentTarget.style.transform = 'translateY(0)';
// //           }}
// //         >
// //           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
// //             <polyline points="17 16 22 12 17 8"></polyline>
// //             <line x1="22" y1="12" x2="10" y2="12"></line>
// //           </svg>
// //           {sidebarOpen && "Logout"} {/* Conditionally render text */}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
