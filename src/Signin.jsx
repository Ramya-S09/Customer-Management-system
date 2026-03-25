import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Signin() {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpass, setcpass] = useState("");
   const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault(); // prevent reload

    if (password !== cpass) {
      alert("Password and confirm password should be same");
      return;
    }

    const newuser = { email, password ,confirm_password: cpass};

    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newuser)
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === "Customer added successfully") {
        alert("Customer created successfully");
      } else if (data.message === "Email already exists") {
        alert("Email already exists, please login");
      } else {
        alert("Something went wrong");
      }
      navigate("/signin");

    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className='card shadow p-4' style={{ width: "400px" }}>
         <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label fw-bold'>Email</label>
          <input type="email" className='form-control' onChange={(e)=>setemail(e.target.value)} placeholder='email' />
        </div>
        <div className='mb-3'>
          <label className='form-label fw-bold'>Password</label>
          <input type="password" className='form-control' onChange={(e)=>setpassword(e.target.value)} placeholder='password' />
        </div>
          <div className='mb-3'>
            <label className='form-label fw-bold'>Confirm Password</label>
            <input type="password" className='form-control' onChange={(e)=>setcpass(e.target.value)} placeholder='confirm password' />
          </div>
        
        <button type="submit" className='btn btn-primary mb-3 w-100'>Sign In</button>
        <p className='text-center'>Already have an account? <a href="/Signup">Login</a></p>
      </form>
      </div>
     
    </div>
  );
}