import React, { useState } from 'react';
import axios from 'axios';
import { Link,  useNavigate } from 'react-router-dom';

const Signup = () => {
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register',
                {name,email,password}
            )
            if(response.data.success){
              navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">UserName</label>
            <input type="text" onChange={(e)=> setName(e.target.value)} placeholder="Enter Name" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="******" required />
          </div>
          <button type="submit">SignUp</button>
          <p>Already have an account? <Link to='/login'>Login</Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
