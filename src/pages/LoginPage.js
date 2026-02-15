import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const {
    sendVerificationCode,
    verifyCode,
    verificationSent,
    verificationEmail,
    isLoading,
    resetVerification
  } = useAuth();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRefs = useRef([]);

  // Auto-focus first code input when verification is sent
  useEffect(() => {
    if (verificationSent && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [verificationSent]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const result = await sendVerificationCode(email);
    if (result.success) {
      setSuccess(result.message);
    } else {
      setError(result.message || 'Failed to send verification code');
    }
  };

  const handleCodeChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (index === 5 && value) {
      const fullCode = newCode.join('');
      if (fullCode.length === 6) {
        handleVerifyCode(fullCode);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
      setCode(newCode);
      if (newCode.join('').length === 6) {
        handleVerifyCode(newCode.join(''));
      }
    }
  };

  const handleVerifyCode = async (fullCode) => {
    const result = await verifyCode(fullCode);
    if (!result.success) {
      setError(result.message || 'Invalid code. Please try again.');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendCode = async () => {
    setCode(['', '', '', '', '', '']);
    setError('');
    const result = await sendVerificationCode(verificationEmail);
    if (result.success) {
      setSuccess('New verification code sent!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <div className="login-page">
      {/* Decorative Background */}
      <div className="login-background">
        <div className="pattern-overlay"></div>
        <div className="gradient-overlay"></div>
      </div>

      {/* Brand Side */}
      <div className="login-brand">
        <div className="brand-content">
          <div className="brand-logo">
            <span className="logo-icon">R</span>
          </div>
          <h1 className="brand-title">Renu's Boutique</h1>
          <p className="brand-tagline">Exquisite Saree Collection</p>
          <div className="brand-ornament">
            <span className="ornament-line"></span>
            <span className="ornament-diamond"></span>
            <span className="ornament-line"></span>
          </div>
          <p className="brand-description">
            Discover the elegance of handcrafted sarees, where tradition meets contemporary design.
            Each piece tells a story of artistry and heritage.
          </p>
        </div>
      </div>

      {/* Login Form Side */}
      <div className="login-form-container">
        <div className="login-card">
          {!verificationSent ? (
            /* Email Entry Step */
            <div className="login-step animate-fadeIn">
              <div className="step-header">
                <h2>Welcome Back</h2>
                <p>Enter your email to receive a verification code</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Sending Code...
                    </>
                  ) : (
                    'Send Verification Code'
                  )}
                </button>
              </form>

              <div className="login-footer">
                <p>New to Renu's Boutique?</p>
                <p className="footer-note">Enter your email to create an account automatically</p>
              </div>
            </div>
          ) : (
            /* Verification Code Step */
            <div className="login-step animate-fadeIn">
              <div className="step-header">
                <h2>Enter Verification Code</h2>
                <p>We sent a 6-digit code to</p>
                <p className="verification-email">{verificationEmail}</p>
              </div>

              <div className="verification-form">
                <div className="verification-input" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={isLoading}
                      className={error ? 'error' : ''}
                    />
                  ))}
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                {isLoading && (
                  <div className="verifying-message">
                    <span className="spinner"></span>
                    Verifying...
                  </div>
                )}

                <div className="verification-actions">
                  <button
                    type="button"
                    className="btn-link"
                    onClick={handleResendCode}
                    disabled={isLoading}
                  >
                    Resend Code
                  </button>
                  <span className="divider-dot">•</span>
                  <button
                    type="button"
                    className="btn-link"
                    onClick={resetVerification}
                    disabled={isLoading}
                  >
                    Change Email
                  </button>
                </div>
              </div>

              <div className="code-hint">
                <p>Check your console for the verification code (development mode)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
