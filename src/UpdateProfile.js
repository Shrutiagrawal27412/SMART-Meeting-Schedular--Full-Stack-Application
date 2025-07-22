// src/UpdateProfile.js
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Layout from './Layout';

function UpdateProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: '',
    department: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const securityQuestions = [
    'What was the name of your first pet?',
    'What city were you born in?',
    'What was your mother\'s maiden name?',
    'What was the name of your first school?',
    'What is your favorite movie?',
    'What was the name of your first car?'
  ];

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      fetch(`http://localhost:8080/api/employees/email/${storedEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setMessage('Failed to load user data');
          setIsLoading(false);
        });
    } else {
      setMessage('No email found. Please log in again.');
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:8080/employees/email-update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      const data = await response.text();

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully!',
          icon: 'success',
          confirmButtonColor: '#6366f1',
          timer: 2000
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data,
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Update failed due to a server issue.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout showHeader={false} showFooter={false}>
        <div className="modern-container animate-fade-in">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showHeader={false} showFooter={false}>
      <div className="modern-container animate-fade-in">
        <div className="page-header">
          <h2 className="page-title gradient-text">Update Profile</h2>
          <p className="page-subtitle">Keep your information up to date</p>
        </div>

        <form onSubmit={handleSubmit} className="modern-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
              required
              disabled
              style={{
                backgroundColor: '#f9fafb',
                cursor: 'not-allowed',
                opacity: 0.7
              }}
            />
            <small className="form-hint">
              Email cannot be changed
            </small>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                placeholder="Age"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                value={user.department}
                onChange={handleChange}
                placeholder="Department"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Security Question</label>
            <select
              name="securityQuestion"
              value={user.securityQuestion}
              onChange={handleChange}
              className="form-select"
              required
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
              value={user.securityAnswer}
              onChange={handleChange}
              placeholder="Enter your answer"
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="modern-button mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="loading-spinner"></div>
            ) : (
              'Update Profile'
            )}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
}

export default UpdateProfile;

