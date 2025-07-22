// // src/components/Register.js
// import axios from 'axios';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import Layout from './Layout';
// import './Register.css';

// const securityQuestions = [
//   "What was the name of your first pet?",
//   "What is your mother's maiden name?",
//   "What was the name of your first school?",
//   "In which city were you born?",
//   "What is your favorite book?",
//   "What was your childhood nickname?",
//   "What is the name of your best friend from childhood?"
// ];

// function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     age: '',
//     department: '',
//     securityQuestion: '',
//     securityAnswer: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });

//     // Password strength indicator
//     if (name === 'password') {
//       let strength = 0;
//       if (value.length >= 8) strength++;
//       if (/[A-Z]/.test(value)) strength++;
//       if (/[0-9]/.test(value)) strength++;
//       if (/[^A-Za-z0-9]/.test(value)) strength++;
//       setPasswordStrength(strength);
//     }
//   };

//   const getPasswordStrengthText = () => {
//     switch (passwordStrength) {
//       case 0:
//       case 1: return { text: 'Weak', color: '#ef4444' };
//       case 2: return { text: 'Fair', color: '#f59e0b' };
//       case 3: return { text: 'Good', color: '#06b6d4' };
//       case 4: return { text: 'Strong', color: '#10b981' };
//       default: return { text: '', color: '' };
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (form.password !== form.confirmPassword) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Password Mismatch',
//         text: 'Passwords do not match. Please try again.',
//         confirmButtonColor: '#6366f1'
//       });
//       return;
//     }

//     if (passwordStrength < 2) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Weak Password',
//         text: 'Please choose a stronger password with at least 8 characters, including uppercase letters and numbers.',
//         confirmButtonColor: '#6366f1'
//       });
//       return;
//     }

//     if (!form.securityQuestion || !form.securityAnswer.trim()) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Security Question Required',
//         text: 'Please select a security question and provide an answer.',
//         confirmButtonColor: '#6366f1'
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const registrationData = {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         age: parseInt(form.age),
//         department: form.department,
//         securityQuestion: form.securityQuestion,
//         securityAnswer: form.securityAnswer.toLowerCase().trim() // Normalize for comparison
//       };

//       const res = await axios.post('http://localhost:8080/api/register', registrationData);
      
//       await Swal.fire({
//         icon: 'success',
//         title: 'Registration Successful!',
//         text: 'Your account has been created. You can now sign in.',
//         confirmButtonColor: '#6366f1',
//         timer: 3000
//       });

//       navigate('/');
//     } catch (err) {
//       console.error(err);
//       const message = err.response?.data || 'Registration failed. Please try again.';
      
//       await Swal.fire({
//         icon: 'error',
//         title: 'Registration Failed',
//         text: message,
//         confirmButtonColor: '#6366f1'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const strengthIndicator = getPasswordStrengthText();

//   return (
//     <Layout>
//       <div className="animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
//         <div className="card">
//           <div className="card-header">
//             <h2 className="card-title">Create Account</h2>
//             <p className="card-subtitle">Join Schedule today</p>
//           </div>
          
//           <div className="card-body">
//             <form onSubmit={handleSubmit}>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                 <div className="form-group">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="form-input"
//                     placeholder="Enter your full name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Age</label>
//                   <input
//                     type="number"
//                     name="age"
//                     className="form-input"
//                     placeholder="Age"
//                     value={form.age}
//                     onChange={handleChange}
//                     required
//                     min="18"
//                     max="100"
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Email Address</label>
//                 <div style={{ position: 'relative' }}>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-input"
//                     placeholder="Enter your email"
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     style={{ paddingLeft: '3rem' }}
//                   />
//                   <div style={{
//                     position: 'absolute',
//                     left: '1rem',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     color: 'var(--gray-400)'
//                   }}>
//                     📧
//                   </div>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Department</label>
//                 <input
//                   type="text"
//                   name="department"
//                   className="form-input"
//                   placeholder="Enter your department"
//                   value={form.department}
//                   onChange={handleChange}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Password</label>
//                 <div style={{ position: 'relative' }}>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     className="form-input"
//                     placeholder="Create a strong password"
//                     value={form.password}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     style={{
//                       paddingLeft: '3rem',
//                       paddingRight: '3rem'
//                     }}
//                   />
//                   <div style={{
//                     position: 'absolute',
//                     left: '1rem',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     color: 'var(--gray-400)'
//                   }}>
//                     🔒
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     style={{
//                       position: 'absolute',
//                       right: '1rem',
//                       top: '50%',
//                       transform: 'translateY(-50%)',
//                       background: 'none',
//                       border: 'none',
//                       color: 'var(--gray-400)',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     {showPassword ? '👁️' : '👁️‍🗨️'}
//                   </button>
//                 </div>
//                 {form.password && (
//                   <div style={{ 
//                     marginTop: '0.5rem',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '0.5rem'
//                   }}>
//                     <div style={{
//                       flex: 1,
//                       height: '4px',
//                       backgroundColor: 'var(--gray-200)',
//                       borderRadius: '2px',
//                       overflow: 'hidden'
//                     }}>
//                       <div style={{
//                         width: `${(passwordStrength / 4) * 100}%`,
//                         height: '100%',
//                         backgroundColor: strengthIndicator.color,
//                         transition: 'all 0.3s ease'
//                       }} />
//                     </div>
//                     <span style={{
//                       fontSize: '0.75rem',
//                       color: strengthIndicator.color,
//                       fontWeight: '500'
//                     }}>
//                       {strengthIndicator.text}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Confirm Password</label>
//                 <div style={{ position: 'relative' }}>
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     className="form-input"
//                     placeholder="Confirm your password"
//                     value={form.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     style={{
//                       paddingLeft: '3rem',
//                       paddingRight: '3rem',
//                       borderColor: form.confirmPassword && form.password !== form.confirmPassword ? 'var(--error)' : undefined
//                     }}
//                   />
//                   <div style={{
//                     position: 'absolute',
//                     left: '1rem',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     color: 'var(--gray-400)'
//                   }}>
//                     🔒
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     style={{
//                       position: 'absolute',
//                       right: '1rem',
//                       top: '50%',
//                       transform: 'translateY(-50%)',
//                       background: 'none',
//                       border: 'none',
//                       color: 'var(--gray-400)',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
//                   </button>
//                 </div>
//                 {form.confirmPassword && form.password !== form.confirmPassword && (
//                   <p style={{ 
//                     color: 'var(--error)', 
//                     fontSize: '0.75rem', 
//                     marginTop: '0.25rem' 
//                   }}>
//                     Passwords do not match
//                   </p>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Security Question</label>
//                 <select
//                   name="securityQuestion"
//                   className="form-select"
//                   value={form.securityQuestion}
//                   onChange={handleChange}
//                   required
//                   disabled={isLoading}
//                 >
//                   <option value="">Select a security question</option>
//                   {securityQuestions.map((question, index) => (
//                     <option key={index} value={question}>
//                       {question}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Security Answer</label>
//                 <input
//                   type="text"
//                   name="securityAnswer"
//                   className="form-input"
//                   placeholder="Enter your answer"
//                   value={form.securityAnswer}
//                   onChange={handleChange}
//                   required
//                   disabled={isLoading}
//                 />
//                 <p style={{ 
//                   fontSize: '0.75rem', 
//                   color: 'var(--gray-500)', 
//                   marginTop: '0.25rem' 
//                 }}>
//                   This will be used for password recovery
//                 </p>
//               </div>

//               <button 
//                 type="submit" 
//                 className="btn btn-primary"
//                 disabled={isLoading}
//                 style={{ 
//                   width: '100%',
//                   marginBottom: '1rem',
//                   height: '3rem',
//                   fontSize: '1rem'
//                 }}
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="spinner" />
//                     Creating Account...
//                   </>
//                 ) : (
//                   'Create Account'
//                 )}
//               </button>
//             </form>

//             <div style={{ 
//               textAlign: 'center',
//               marginTop: '1.5rem',
//               paddingTop: '1.5rem',
//               borderTop: '1px solid var(--gray-200)'
//             }}>
//               <p style={{ 
//                 color: 'var(--gray-600)',
//                 fontSize: '0.875rem'
//               }}>
//                 Already have an account?{' '}
//                 <Link 
//                   to="/" 
//                   style={{
//                     color: 'var(--primary)',
//                     textDecoration: 'none',
//                     fontWeight: '500'
//                   }}
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Register;

/// src/components/Register.js
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from './Layout';
import './common-auth.css'; // New shared CSS file

const securityQuestions = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "In which city were you born?",
  "What is your favorite book?",
  "What was your childhood nickname?",
  "What is the name of your best friend from childhood?"
];

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    department: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Password strength indicator
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return { text: 'Weak', color: '#ef4444' };
      case 2: return { text: 'Fair', color: '#f59e0b' };
      case 3: return { text: 'Good', color: '#00a884' }; // Accent color
      case 4: return { text: 'Strong', color: '#10b981' }; // Darker accent
      default: return { text: '', color: '' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please try again.',
        confirmButtonColor: '#00a884' // New accent color
      });
      return;
    }

    if (passwordStrength < 2) {
      Swal.fire({
        icon: 'warning',
        title: 'Weak Password',
        text: 'Please choose a stronger password with at least 8 characters, including uppercase letters and numbers.',
        confirmButtonColor: '#00a884' // New accent color
      });
      return;
    }

    if (!form.securityQuestion || !form.securityAnswer.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Security Question Required',
        text: 'Please select a security question and provide an answer.',
        confirmButtonColor: '#00a884' // New accent color
      });
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = {
        name: form.name,
        email: form.email,
        password: form.password,
        age: parseInt(form.age),
        department: form.department,
        securityQuestion: form.securityQuestion,
        securityAnswer: form.securityAnswer.toLowerCase().trim() // Normalize for comparison
      };

      const res = await axios.post('http://localhost:8080/api/register', registrationData);
      
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created. You can now sign in.',
        confirmButtonColor: '#00a884', // New accent color
        timer: 3000
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      const message = err.response?.data || 'Registration failed. Please try again.';
      
      await Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: message,
        confirmButtonColor: '#00a884' // New accent color
      });
    } finally {
      setIsLoading(false);
    }
  };

  const strengthIndicator = getPasswordStrengthText();

  return (
    <Layout>
      <div className="auth-page-container">
        <div className="auth-card">
          {/* Internal header for Register page */}
          <div className="auth-internal-header">
            <h2 className="card-title">Create Account</h2>
            <p className="instruction-text">Join Schedule today</p>
          </div>
          
          <div className="auth-form-content">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-input"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    required
                    min="18"
                    max="100"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                {/* <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <div className="input-icon"> */}
                  
                    {/* 📧
                  </div>
                </div>
              </div> */}
              <div className="input-wrapper">
    <input
        type="email"
        name="email"
        className="form-input"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
        required
        disabled={isLoading}
        // style={{ paddingLeft: '3rem' }} // REMOVE THIS LINE
    />
    <div className="input-icon"> {/* REMOVE INLINE STYLE HERE */}
        📧
    </div>
</div>
</div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  className="form-input"
                  placeholder="Enter your department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                {/* <div className="input-wrapper password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-input"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <div className="input-icon">
                    🔒
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-button"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div> */}
                <div className="input-wrapper password-input-wrapper">
    <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        className="form-input"
        placeholder="Create a strong password"
        value={form.password}
        onChange={handleChange}
        required
        disabled={isLoading}
        // style={{ paddingLeft: '3rem', paddingRight: '3rem' }} // REMOVE THIS LINE
    />
    <div className="input-icon"> {/* REMOVE INLINE STYLE HERE */}
        🔒
    </div>
    <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="password-toggle-button"
        // REMOVE INLINE STYLE HERE
    >
        {showPassword ? '👁️' : '👁️‍🗨️'}
    </button>
</div>
                {form.password && (
                  <div className="password-strength-indicator">
                    {/* <div className="strength-bar">
                      <div 
                        className="strength-progress" 
                        style={{ 
                          width: `${(passwordStrength / 4) * 100}%`,
                          backgroundColor: strengthIndicator.color
                        }} 
                      />
                    </div> */}
                    <div className="strength-bar">
    <div
        className="strength-progress"
        style={{
            width: `${(passwordStrength / 4) * 100}%`,
            backgroundColor: strengthIndicator.color // KEEP THIS INLINE STYLE
        }}
    />
</div>
                    {/* <span className="strength-text" style={{ color: strengthIndicator.color }}>
                      {strengthIndicator.text}
                    </span> */}
                    <span className="strength-text" style={{ color: strengthIndicator.color }}> {/* KEEP THIS INLINE STYLE */}
    {strengthIndicator.text}
</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                {/* <div className="input-wrapper password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="form-input"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    style={{
                      borderColor: form.confirmPassword && form.password !== form.confirmPassword ? 'var(--error-color)' : undefined
                    }}
                  />
                  <div className="input-icon">
                    🔒
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle-button"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div> */}
                <div className="input-wrapper password-input-wrapper">
    <input
        type={showConfirmPassword ? 'text' : 'password'}
        name="confirmPassword"
        className="form-input"
        placeholder="Confirm your password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
        disabled={isLoading}
        // REMOVE INLINE STYLE HERE: style={{ borderColor: form.confirmPassword && form.password !== form.confirmPassword ? 'var(--error)' : undefined }}
    />
    <div className="input-icon"> {/* REMOVE INLINE STYLE HERE */}
        🔒
    </div>
    <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="password-toggle-button"
        // REMOVE INLINE STYLE HERE
    >
        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
    </button>
</div>
                {/* {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="error-message">
                    Passwords do not match
                  </p>
                )} */}
                {form.confirmPassword && form.password !== form.confirmPassword && (
    <p className="error-message"> {/* REMOVE INLINE STYLES HERE */}
        Passwords do not match
    </p>
)}
              </div>

              <div className="form-group">
                <label className="form-label">Security Question</label>
                <select
                  name="securityQuestion"
                  className="form-select"
                  value={form.securityQuestion}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                >
                  <option value="">Select a security question</option>
                  {securityQuestions.map((question, index) => (
                    <option key={index} value={question}>
                      {question}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Security Answer</label>
                <input
                  type="text"
                  name="securityAnswer"
                  className="form-input"
                  placeholder="Enter your answer"
                  value={form.securityAnswer}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <p className="hint-text">
                  This will be used for password recovery
                </p>
              </div>

              <button 
                type="submit" 
                className="primary-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-footer-links">
              <p className="prompt-text">
                Already have an account?{' '}
                <Link to="/" className="link-text">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
