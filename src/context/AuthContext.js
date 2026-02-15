import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  // Simulated verification code (in production, this would come from backend)
  const [generatedCode, setGeneratedCode] = useState('');

  const sendVerificationCode = useCallback(async (email) => {
    setIsLoading(true);

    // Simulate API call to send verification code
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setVerificationEmail(email);
    setVerificationSent(true);
    setIsLoading(false);

    // In development, log the code for testing
    console.log(`Verification code for ${email}: ${code}`);

    return { success: true, message: 'Verification code sent to your email' };
  }, []);

  const verifyCode = useCallback(async (code) => {
    setIsLoading(true);

    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (code === generatedCode) {
      const userData = {
        email: verificationEmail,
        name: verificationEmail.split('@')[0],
        joinedAt: new Date().toISOString(),
      };

      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);

      // Store in localStorage for persistence
      localStorage.setItem('boutique_user', JSON.stringify(userData));

      return { success: true };
    }

    setIsLoading(false);
    return { success: false, message: 'Invalid verification code' };
  }, [generatedCode, verificationEmail]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setVerificationEmail('');
    setVerificationSent(false);
    setGeneratedCode('');
    localStorage.removeItem('boutique_user');
  }, []);

  const resetVerification = useCallback(() => {
    setVerificationSent(false);
    setVerificationEmail('');
    setGeneratedCode('');
  }, []);

  // Check for existing session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('boutique_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('boutique_user');
      }
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    verificationEmail,
    verificationSent,
    sendVerificationCode,
    verifyCode,
    logout,
    resetVerification,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
