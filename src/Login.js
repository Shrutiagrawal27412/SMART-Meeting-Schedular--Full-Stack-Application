import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from './axiosConfig';
import './common-auth.css'; // New shared CSS file
import Layout from './Layout';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const { data } = await api.post('/login', { email, password });
//       const user = { email: data.email };
// localStorage.setItem('user', JSON.stringify({ email: data.email }));

//       await Swal.fire({
//         icon: 'success',
//         title: 'Welcome back!',
//         text: data.data,
//         timer: 2000,
//         showConfirmButton: false,
//         background: '#fff',
//         backdrop: 'rgba(0,0,0,0.4)'
//       });

//       navigate('/main');
//     } catch (err) {
//       console.error(err);
//       const message = err.response?.data?.message || 'Invalid credentials. Please try again.';

//       await Swal.fire({
//         icon: 'error',
//         title: 'Login Failed',
//         text: message,
//         confirmButtonColor: '#00a884', // Use the new accent color
//         background: '#fff',
//         backdrop: 'rgba(0,0,0,0.4)'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const { data } = await api.post('/login', { email, password });

    // ✅ Save correct email to localStorage
    localStorage.setItem('user', JSON.stringify({ email: data.email }));

    await Swal.fire({
      icon: 'success',
      title: 'Welcome back!',
      text: data.data,
      timer: 2000,
      showConfirmButton: false,
      background: '#fff',
      backdrop: 'rgba(0,0,0,0.4)'
    });

    navigate('/main');
  } catch (err) {
    console.error(err);
    const message = err.response?.data?.message || 'Invalid credentials. Please try again.';

    await Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: message,
      confirmButtonColor: '#00a884',
      background: '#fff',
      backdrop: 'rgba(0,0,0,0.4)'
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Layout>
      <div className="auth-page-container">
        <div className="auth-card animate-entry">
          <div className="auth-internal-header">
            <div className="logo-container animate-logo">
              <div className="logo-icon pulse-effect">S</div>
              <span className="logo-text slide-in">Schedule</span>
            </div>
            <p className="tagline fade-in">Professional Meeting Scheduler</p>
          </div>
          
          <div className="auth-form-content">
            <h2 className="welcome-text">Welcome <span className="highlight">Back!</span></h2>
            <p className="instruction-text">Please login to your account.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group slide-up">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="input-wrapper hover-effect">
                  <span className="input-icon">👤</span>
                  <input
                    type="email"
                    id="email"
                    className="form-input focus-effect"
                    placeholder="abc@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group slide-up" style={{animationDelay: '0.2s'}}>
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-wrapper password-input-wrapper hover-effect">
                  <span className="input-icon animate-lock">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-input focus-effect"
                    placeholder="**********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-button"
                    disabled={isLoading}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="link-text">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="primary-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner" />
                    Logging In...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="auth-footer-links">
              <p className="prompt-text">
                Don't have an account?{' '}
                <Link to="/register" className="link-text">Sign up here</Link>
              </p>
              <p className="terms-privacy-text">
                By signing in you agree to Schedule's{' '}
                <Link to="/terms-and-conditions" className="link-text">Terms and Conditions</Link> &{' '}
                <Link to="/privacy-policy" className="link-text">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;

// // src/components/Login.js
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import api from './axiosConfig';
// import Layout from './Layout';
// import './login.css';

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const { data } = await api.post('/login', { email, password });
//       const user = { email: data.email };
//       localStorage.setItem('user', JSON.stringify(user));

//       await Swal.fire({
//         icon: 'success',
//         title: 'Welcome back!',
//         text: data.data,
//         timer: 2000,
//         showConfirmButton: false,
//         background: '#fff',
//         backdrop: 'rgba(0,0,0,0.4)'
//       });

//       navigate('/main');
//     } catch (err) {
//       console.error(err);
//       const message = err.response?.data?.message || 'Invalid credentials. Please try again.';

//       await Swal.fire({
//         icon: 'error',
//         title: 'Login Failed',
//         text: message,
//         confirmButtonColor: '#6366f1',
//         background: '#fff',
//         backdrop: 'rgba(0,0,0,0.4)'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="login-page-container">
//         <div className="login-card">
//           {/* Left Section - Organic Green Panel */}
//           <div className="login-left-section">
//             <div className="organic-shape-1"></div>
//             <div className="organic-shape-2"></div>
//             <div className="organic-shape-3"></div>
            
//             <div className="left-nav-area">
//               <Link to="/about-us" className="nav-link-item">ABOUT US</Link>
//               <Link to="/contact" className="nav-link-item">CONTACT</Link>
//               <Link to="/blog" className="nav-link-item">BLOG</Link>
//             </div>
            
//             <div className="vertical-text">FLOWER LAB</div>
            
//             <Link to="/showcase" className="showcase-button">SHOWCASE</Link>
//           </div>

//           {/* Right Section - Login Form */}
//           <div className="login-right-section">
//             <div className="brand-header">
//               <div className="logo-container">
//                 <div className="logo-icon">S</div>
//                 <span className="logo-text">Schedule</span>
//               </div>
//               <p className="tagline">Professional Meeting Scheduler</p>
//             </div>
            
//             <div className="login-tag">LOGIN</div>
            
//             <div className="login-form-container">
//               <h2>Welcome <span>Back!</span></h2>
//               <p>Please login to your account.</p>

//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label className="form-label" htmlFor="email">Email Address</label>
//                   <div className="form-input-wrapper">
//                     <span className="input-icon">👤</span>
//                     <input
//                       type="email"
//                       id="email"
//                       className="form-input"
//                       placeholder="robertspencer@gmail.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label" htmlFor="password">Password</label>
//                   <div className="form-input-wrapper">
//                     <span className="input-icon">🔒</span>
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       id="password"
//                       className="form-input"
//                       placeholder="**********"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="password-toggle-button"
//                       disabled={isLoading}
//                     >
//                       {showPassword ? '👁️' : '👁️‍🗨️'}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="login-options">
//                   <label className="remember-me">
//                     <input
//                       type="checkbox"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                     />
//                     Remember me
//                   </label>
//                   <Link to="/forgot-password" className="forgot-password-link">
//                     Forgot Password?
//                   </Link>
//                 </div>

//                 <button
//                   type="submit"
//                   className="login-btn"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="spinner" />
//                       Logging In...
//                     </>
//                   ) : (
//                     'Login'
//                   )}
//                 </button>
//               </form>

//               <div className="register-link-container">
//                 Don't have an account?{' '}
//                 <Link to="/register">Sign up here</Link>
//               </div>

//               <p className="login-footer-text">
//                 By signing in you agree to Schedule's{' '}
//                 <Link to="/terms-and-conditions">Terms and Conditions</Link> &{' '}
//                 <Link to="/privacy-policy">Privacy Policy</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Login;
// src/components/Login.js
