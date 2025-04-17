import React, { useState, useContext } from 'react';
import './auth.css';
//import { AuthContext } from '../context/Context';
import { Context } from '../context/Context';


const Login = () => {
  const { setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser?.email === email && storedUser?.password === password) {
      setIsAuthenticated(true);
      alert('Login successful!');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
