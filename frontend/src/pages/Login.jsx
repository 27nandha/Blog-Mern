import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login',
                {email,password}
            )
            if(response.data.success){
                localStorage.setItem("token",response.data.token)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="******" required />
          </div>
          <button type="submit">Login</button>
          <p>Dont have an account? <Link to='/register'>Register</Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
