import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="container-fluid bg-primary text-white p-3 d-flex justify-content-between align-items-center">
      
      
      <h4 className="m-0">Customer Management System</h4>

      <div>
        <Link to="/signin"><button className="btn btn-light text-primary me-2">
          LOGIN
        </button></Link>
        <Link to="/signup"><button className="btn btn-light  text-primary me-2">
          Sign Up
        </button></Link>
      </div>

    </div>
  );
}