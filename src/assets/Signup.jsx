import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const newuser = { email, password }

        fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newuser)
        })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message)

            if (data.message.trim() === "Login successfull") {
                navigate("/dashboard");
            }

            setemail("")
            setpassword("")
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card shadow p-4" style={{ width: "400px" }}>
                
                <h4 className="text-center text-primary mb-3">Sign In</h4>

                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input 
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input 
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Sign In
                    </button>

                </form>
            </div>
        </div>
    )
}