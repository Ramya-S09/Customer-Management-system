import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function Edit() {
    const [name, setName] = useState("")
        const [email, setEmail] = useState("")
        const [phone_no, setPhoneNo] = useState("")
       const {id}=useParams();
       const navigate=useNavigate();
        function handleSubmit(e) {
            e.preventDefault();
    
            const newcustomer = { name, email, phone_no }
    
            fetch(`http://localhost:8080/updatecustomer/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newcustomer)
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.message==="Customer updated successfully"){
                    alert("customer updated successfully")
                }
                setName("")
                setEmail("")
                setPhoneNo("")
                setTimeout(()=>{
                     navigate("/CustomerDetails")
                },1000)
            })
            .catch((err) => console.log(err))
        }
  return (
       <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='card shadow p-4' style={{ width: "400px" }}>
                <h4 className='card-title text-center text-primary'>Customer Detail</h4>
                <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                   <label className='form-label fw-bold'>Name</label>
                   <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} /> 
                </div>
                <div className='mb-3'>
                    <label className='form-label fw-bold'>Email</label>
                    <input type="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label className='form-label fw-bold'>Phone Number</label>
                    <input type="text" className='form-control' value={phone_no} onChange={(e) => setPhoneNo(e.target.value)} /> 
                </div>
                <button type="submit" className='btn btn-primary w-100'>Update </button>   
            </form>
            </div>
            
        </div>
  )
}
