import { useState } from 'react';
import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';  // Assuming db is already imported
import GoogleIcon from '@mui/icons-material/Google'; // Google icon
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await checkUserInFirestore(user);  // Check if the user is in Firestore
    } catch (err) {
      setError(err.message);  // Set error message if login fails
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await checkUserInFirestore(user);  // Check if the user is in Firestore
    } catch (err) {
      setError(err.message);  // Set error message if login fails
    }
  };

  const checkUserInFirestore = async (user) => {
    const userRef = doc(db, 'users', user.uid); // Check the users collection by UID
    const docSnap = await getDoc(userRef);
  
    if (docSnap.exists()) {
      console.log('User exists, proceeding with login.');
      navigate('/');  // Redirect to the home page after successful login
    } else {
      console.log('User not registered. Please sign up first.');
      await signOut(auth);  // Log out the user immediately
      alert('Please sign up before logging in.');
      navigate('/signup');  // Redirect to signup page
    }
  };
  

  return (
    <div className="shadow-lg shadow-slate-400 max-w-md mx-auto p-6 text-center bg-white rounded-lg">
      <h2 className="mt-6 mb-4 text-2xl font-semibold text-[#231f20]">
        Login here
      </h2>

      <form onSubmit={handleLogin}>
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
        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full mt-6 py-2 border-2 border-[#68e1fd] bg-[#68e1fd] text-black font-bold rounded-lg hover:bg-black hover:text-[#68e1fd] hover:border-black transition-colors duration-200"
        >
          Login
        </button>
      </form>

      {/* Google Login Section */}
      <div className="mt-6 mb-4">
        <div className="border-t border-[#231f20] pt-4 mb-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 py-2 border-2 border-[#68e1fd] bg-[#68e1fd] text-black font-bold rounded-lg hover:bg-black hover:text-[#68e1fd] hover:border-black transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <GoogleIcon style={{ marginRight: '8px' }} />
            Login with Google
          </button>
        </div>
      </div>

      <p className="mt-4 text-[#231f20]">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-[#68e1fd] font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
