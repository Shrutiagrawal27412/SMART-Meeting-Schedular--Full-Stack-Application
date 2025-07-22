// // src/ForgotPassword.js
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from './Layout';

// function ForgotPassword() {
//   const [step, setStep] = useState(1); // 1: Email, 2: Security Question, 3: New Password
//   const [email, setEmail] = useState('');
//   const [securityQuestion, setSecurityQuestion] = useState('');
//   const [securityAnswer, setSecurityAnswer] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('http://localhost:8080/api/get-security-question', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSecurityQuestion(data.securityQuestion);
//         setStep(2);
//       } else {
//         const error = await response.text();
//         setMessage(error || 'Email not found');
//       }
//     } catch (error) {
//       setMessage('Error occurred. Try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSecuritySubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('http://localhost:8080/api/verify-security-answer', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, securityAnswer })
//       });

//       if (response.ok) {
//         setStep(3);
//       } else {
//         const error = await response.text();
//         setMessage(error || 'Incorrect security answer');
//       }
//     } catch (error) {
//       setMessage('Error occurred. Try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     if (newPassword !== confirmPassword) {
//       setMessage('Passwords do not match');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, newPassword })
//       });

//       if (response.ok) {
//         setMessage('Password reset successful! You can now login with your new password.');
//         setTimeout(() => {
//           window.location.href = '/';
//         }, 2000);
//       } else {
//         const error = await response.text();
//         setMessage(error || 'Password reset failed');
//       }
//     } catch (error) {
//       setMessage('Error occurred. Try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="modern-container animate-fade-in">
//         <div className="page-header">
//           <h2 className="page-title gradient-text">Reset Password</h2>
//           <p className="page-subtitle">
//             {step === 1 && "Enter your email to get started"}
//             {step === 2 && "Answer your security question"}
//             {step === 3 && "Create your new password"}
//           </p>
//         </div>

//         {/* Step Indicator */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           marginBottom: '2rem',
//           gap: '1rem'
//         }}>
//           {[1, 2, 3].map((stepNum) => (
//             <div
//               key={stepNum}
//               style={{
//                 width: '40px',
//                 height: '40px',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 background: step >= stepNum 
//                   ? 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)'
//                   : '#e5e7eb',
//                 color: step >= stepNum ? 'white' : '#6b7280',
//                 fontWeight: '600',
//                 fontSize: '0.875rem',
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               {stepNum}
//             </div>
//           ))}
//         </div>

//         {/* Step 1: Email */}
//         {step === 1 && (
//           <form onSubmit={handleEmailSubmit} className="modern-form">
//             <div className="form-group">
//               <label className="form-label">Email Address</label>
//               <input
//                 type="email"
//                 placeholder="Enter your registered email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-input"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Checking...' : 'Continue'}
//             </button>
//           </form>
//         )}

//         {/* Step 2: Security Question */}
//         {step === 2 && (
//           <form onSubmit={handleSecuritySubmit} className="modern-form">
//             <div className="form-group">
//               <label className="form-label">Security Question</label>
//               <div style={{
//                 padding: '1rem',
//                 background: 'var(--gray-50)',
//                 borderRadius: 'var(--radius-lg)',
//                 border: '2px solid var(--gray-200)',
//                 fontSize: '0.875rem',
//                 color: 'var(--gray-700)'
//               }}>
//                 {securityQuestion}
//               </div>
//             </div>

//             <div className="form-group">
//               <label className="form-label">Your Answer</label>
//               <input
//                 type="text"
//                 placeholder="Enter your security answer"
//                 value={securityAnswer}
//                 onChange={(e) => setSecurityAnswer(e.target.value)}
//                 className="form-input"
//                 required
//               />
//             </div>

//             <div style={{ display: 'flex', gap: '1rem' }}>
//               <button
//                 type="button"
//                 onClick={() => setStep(1)}
//                 className="btn btn-secondary"
//                 style={{ flex: 1 }}
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={isLoading}
//                 style={{ flex: 1 }}
//               >
//                 {isLoading ? 'Verifying...' : 'Verify'}
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Step 3: New Password */}
//         {step === 3 && (
//           <form onSubmit={handlePasswordReset} className="modern-form">
//             <div className="form-group">
//               <label className="form-label">New Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="form-input"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Confirm Password</label>
//               <input
//                 type="password"
//                 placeholder="Confirm your new password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="form-input"
//                 required
//               />
//             </div>

//             <div style={{ display: 'flex', gap: '1rem' }}>
//               <button
//                 type="button"
//                 onClick={() => setStep(2)}
//                 className="btn btn-secondary"
//                 style={{ flex: 1 }}
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={isLoading}
//                 style={{ flex: 1 }}
//               >
//                 {isLoading ? 'Resetting...' : 'Reset Password'}
//               </button>
//             </div>
//           </form>
//         )}

//         {message && (
//           <div className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
//             {message}
//           </div>
//         )}

//         <div style={{ 
//           textAlign: 'center', 
//           marginTop: '2rem',
//           paddingTop: '2rem',
//           borderTop: '1px solid rgba(0, 0, 0, 0.1)'
//         }}>
//           <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
//             Remember your password?{' '}
//             <Link to="/" className="modern-link">
//               Back to Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default ForgotPassword;

// src/ForgotPassword.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Assuming you have Swal installed
import Layout from './Layout'; // Assuming Layout component exists

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: Security Question, 3: New Password
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // API call to get security question
      const response = await fetch('http://localhost:8080/api/forgot-password/get-security-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        const data = await response.json();
        setSecurityQuestion(data.securityQuestion);
        setStep(2); // Move to security question step
        Swal.fire('Success', 'Security question retrieved.', 'success');
      } else {
        const errorText = await response.text();
        setMessage(errorText || 'Email not found or error fetching security question.');
        Swal.fire('Error', errorText || 'Email not found or error fetching security question.', 'error');
      }
    } catch (error) {
      console.error('Error in handleEmailSubmit:', error);
      setMessage('Network error. Please try again later.');
      Swal.fire('Error', 'Network error. Please try again later.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // API call to verify security answer
      const response = await fetch('http://localhost:8080/api/forgot-password/verify-security-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, securityAnswer })
      });

      if (response.ok) {
        setStep(3); // Move to new password step
        Swal.fire('Success', 'Security answer verified.', 'success');
      } else {
        const errorText = await response.text();
        setMessage(errorText || 'Incorrect security answer.');
        Swal.fire('Error', errorText || 'Incorrect security answer.', 'error');
      }
    } catch (error) {
      console.error('Error in handleSecuritySubmit:', error);
      setMessage('Network error. Please try again later.');
      Swal.fire('Error', 'Network error. Please try again later.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      setIsLoading(false);
      Swal.fire('Error', 'New password and confirm password do not match.', 'error');
      return;
    }

    try {
      // API call to reset password
      const response = await fetch('http://localhost:8080/api/forgot-password/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });

      if (response.ok) {
        setMessage('Password reset successful! Redirecting to login...');
        Swal.fire('Success', 'Password reset successful!', 'success');
        setTimeout(() => navigate('/'), 2000); // Redirect to login after 2 seconds
      } else {
        const errorText = await response.text();
        setMessage(errorText || 'Failed to reset password.');
        Swal.fire('Error', errorText || 'Failed to reset password.', 'error');
      }
    } catch (error) {
      console.error('Error in handlePasswordReset:', error);
      setMessage('Network error. Please try again later.');
      Swal.fire('Error', 'Network error. Please try again later.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleEmailSubmit}>
            <h2 className="welcome-text">Forgot Password?</h2>
            <p className="instruction-text">
              Enter your email to retrieve your security question.
            </p>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <div className="input-icon">📧</div>
              </div>
            </div>
            <button type="submit" className="primary-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Finding Question...
                </>
              ) : (
                'Next'
              )}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleSecuritySubmit}>
            <h2 className="welcome-text">Verify Identity</h2>
            <p className="instruction-text">
              Please answer your security question to continue.
            </p>
            <div className="form-group">
              <label className="form-label">Security Question</label>
              <input
                type="text"
                className="form-input"
                value={securityQuestion}
                readOnly // Make the question read-only
                disabled
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="securityAnswer">Your Answer</label>
              <input
                type="text"
                id="securityAnswer"
                className="form-input"
                placeholder="Enter your security answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-options" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
                <Link to="#" onClick={() => setStep(1)} className="link-text">
                    Go Back to Email
                </Link>
            </div>
            <button type="submit" className="primary-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Verifying...
                </>
              ) : (
                'Verify Answer'
              )}
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handlePasswordReset}>
            <h2 className="welcome-text">Set New Password</h2>
            <p className="instruction-text">
              Enter your new password below.
            </p>
            <div className="form-group">
                <label className="form-label" htmlFor="newPassword">New Password</label>
                <div className="input-wrapper password-input-wrapper">
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        className="form-input"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <div className="input-icon">🔒</div>
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="password-toggle-button"
                    >
                        {showNewPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="confirmNewPassword">Confirm New Password</label>
                <div className="input-wrapper password-input-wrapper">
                    <input
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        id="confirmNewPassword"
                        className="form-input"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <div className="input-icon">🔒</div>
                    <button
                        type="button"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        className="password-toggle-button"
                    >
                        {showConfirmNewPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                    <p className="error-message">Passwords do not match</p>
                )}
            </div>
            <div className="form-options" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
                <Link to="#" onClick={() => setStep(2)} className="link-text">
                    Go Back to Security Question
                </Link>
            </div>
            <button type="submit" className="primary-btn" disabled={isLoading || newPassword !== confirmPassword}>
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="auth-page-container">
        <div className="auth-card">
          <div className="auth-internal-header">
            <div className="logo-container">
              <div className="logo-icon">🗓️</div> {/* Changed icon to calendar */}
              <span className="logo-text">Schedule</span> {/* Changed name to Schedule */}
            </div>
          </div>
          <div className="auth-form-content">
            {renderCurrentStep()}

            {message && (
                <div className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
                    {message}
                </div>
            )}

            <div className="auth-footer-links">
              <p className="prompt-text">
                Remember your password?{' '}
                <Link to="/" className="link-text">
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPassword;