import { TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import GoogleIcon from '@mui/icons-material/Google';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);  // Show loading state

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
        createdAt: new Date(),
      });

      navigate('/login');  // Navigate to login page after successful signup
    } catch (err) {
      setError(err.message);  // Set error message if something goes wrong
      console.error(err.message);  // Log the error for debugging
    } finally {
      setLoading(false);  // Hide loading state
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);  // Show loading state

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create user document in Firestore with Google details
      await setDoc(doc(db, 'users', user.uid), {
        username: user.displayName || 'Google User',
        email: user.email,
        createdAt: new Date(),
      });

      navigate('/login');  // Navigate to login page after successful signup
    } catch (err) {
      setError(err.message);  // Set error message if something goes wrong
      console.error(err.message);  // Log the error for debugging
    } finally {
      setLoading(false);  // Hide loading state
    }
  };

  return (
    <div className="shadow-lg shadow-slate-400 max-w-md mx-auto p-6 text-center bg-white rounded-lg mt-16">
      <h2 className="mt-6 mb-4 text-2xl font-semibold text-[#231f20]">
        Create an account
      </h2>
      <form onSubmit={handleSignup}>
        {/* Username Field */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: '#231f20' } }}
          inputProps={{ style: { color: 'black' } }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-4"
        />

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: '#231f20' } }}
          inputProps={{ style: { color: 'black' } }}
          className="mt-4"
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: '#231f20' } }}
          inputProps={{ style: { color: 'black' } }}
          className="mt-4"
        />

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputLabelProps={{ style: { color: '#231f20' } }}
          inputProps={{ style: { color: 'black' } }}
          className="mt-4"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Signup Button */}
        <button
          type="submit"
          disabled={loading}  // Disable the button while loading
          className="w-full mt-6 py-2 border-2 border-[#68e1fd] bg-[#68e1fd] text-black font-bold rounded-lg hover:bg-black hover:text-[#68e1fd] hover:border-black transition-colors duration-200"
        >
          {loading ? 'Signing up...' : 'Signup'}  {/* Show loading text */}
        </button>
      </form>

      {/* Google Signup Button */}
      <div className="mt-6 mb-4">
        <hr className="border-[#231f20] mb-4" />
        <button
          type="button"
          disabled={loading}  // Disable button while loading
          className="w-full mt-4 py-2 border-2 border-[#68e1fd] bg-[#68e1fd] text-black font-bold rounded-lg hover:bg-black hover:text-[#68e1fd] hover:border-black transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={handleGoogleSignup}
        >
          <GoogleIcon />
          {loading ? 'Signing up with Google...' : 'Sign up with Google'}
        </button>
      </div>

      {/* Login Link */}
      <p className="mt-4 text-[#231f20]">
        Already a user?{' '}
        <Link to="/login" className="text-[#68e1fd] font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
