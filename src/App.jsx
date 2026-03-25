import React from 'react'
import Signin from './Signin'
import Customer from './Customer'
import Signup from './assets/Signup'
import Home from './Home'
import Edit from './Edit'
import Delete from './Delete'
import CustomerDetails from './CustomerDetails'
import Dashboard from './Dashboard'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from './Landing'
export default function App() {
  return (
    <div>
      {/* <Signin/> */}
      {/* <Customer/> */}
      {/* <Signup/> */}
     
      
        <Routes>
          {/* <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<Signin/>} /> */}
          <Route path="/customer" element={<Customer/>} />
          <Route path="/CustomerDetails" element={<CustomerDetails/>} />
          <Route path="/" element={<Landing/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/delete/:id" element={<Delete/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
        

    </div>
  )
}
