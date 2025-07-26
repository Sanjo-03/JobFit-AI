import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    const { data, error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      if (isLogin) {
        setMessage('Login successful!');
        navigate('/'); // 🚀 Redirect to the protected app
      } else {
        setMessage('Signup successful! Check your email to confirm.');
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h1>
      <input
        className="border p-2 w-full mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="bg-blue-600 text-white py-2 px-4 rounded w-full">
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-600 underline text-sm w-full"
      >
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
      </button>
      <p className="mt-4 text-red-500">{message}</p>
    </div>
  );
}
