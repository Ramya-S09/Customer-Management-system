import React, { use } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
export default function Delete() {
    const {id}=useParams();
    const Navigate=useNavigate();
    useEffect(() => {
        fetch(`http://localhost:8080/deleteById/${id}`, {
            method: "DELETE",
        }).then((res) => res.text())    
        .then((data) => {
            if(data==="customer deleted sucessfully"){
                alert("customer deleted successfully")
                Navigate("/customerDetails")
            } 
            else{
                alert("something went wrong")
            }
        } ) 
    },[id])
  return (
    <div>
      <h4>Deleting customer</h4>
    </div>
  )
}
