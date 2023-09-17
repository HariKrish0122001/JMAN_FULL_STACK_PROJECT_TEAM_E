import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';

import { ToastContainer, toast } from 'react-toastify';
import loginapiService from '../../../services/login/loginservice';


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const formref = useRef()
 
  const validationReg = async (e) => {

    e.preventDefault();

    const isValid = /@jmangroup\.com$/.test(email);

    if (!isValid) {
      toast.error("Enter the organisation mail")
      formref.current.reset()
    }
    else if (email.trim() === '' || password.trim() === '') {
      toast.error('Please fill in all fields.');
    }
    else {
      if (email.trim() !== '' && password.trim() !== '') {
        try {
          console.log("entered");
          const response = await loginapiService.login(email, password);
          const token = response.data.token;
          if (response.data.message === 'User logged') {
            localStorage.setItem('jwtToken',token);
            toast.success("Login successful")
            setTimeout(() => {
              navigate('/userform', { state: { user_id: response.data.id,username:response.data.username } })
            }, 2000)
          }
          else if (response.data.message === 'Admin logged') {
            localStorage.setItem('jwtToken',token);
            toast.success(" Admin Login successful")
            setTimeout(() => {
              navigate('/admin_training')
            }, 2000)
          }
          else if (response.data === 'invaild mail') {
            toast.error("Enter the organisation mail")
            formref.current.reset()
          }
          else if (response.data === 'Passoword is weak') {
            // toast.error("Wrong credentials")
            formref.current.reset()
          }
        }

        catch (error) {
          console.log("catch",error);
          toast.error('Invalid credentials');
        }

      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <ToastContainer />
        <img src="login_bg.png" alt="Login" className="imagefirst" />
        <img src="Login-logo-signup.92ae013a.png" className="pngimg" />
      </div>
      <div className="login-right">
        <form onSubmit={validationReg}>
          <h1 className="heading">Welcome Back :)</h1>
          <div className="login-input-container">
            <i className="fa-regular fa-envelope"></i>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="login-input-container">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="buttons">
            <Link to="/signup">
              <button className="oldloginbutton">New User?</button>
            </Link>
            <button className="loginbutton" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;