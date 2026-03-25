import React, { useState } from 'react'
import logo from "./assets/logo.jpg"
import { useNavigate } from 'react-router-dom'

export default function Landing() {

  const navigate = useNavigate();

  // 🔹 Tab control
  const [activeTab, setActiveTab] = useState("signin")
  const [text, setText] = useState("Sign In")
  const [ptext, setptext] = useState("Sign in to your workspace.")

  // 🔹 Signin states
  const [signinEmail, setSigninEmail] = useState("")
  const [signinPassword, setSigninPassword] = useState("")

  // 🔹 Register states
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regConfirmPassword, setRegConfirmPassword] = useState("")

  // 🔹 SIGNIN FUNCTION
  function handleSignin(e) {
    e.preventDefault();

    const user = { email: signinEmail, password: signinPassword }

    fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message)

      if (data.message.trim() === "Login successfull") {
        navigate("/dashboard");
      }

      setSigninEmail("")
      setSigninPassword("")
    })
    .catch((err) => console.log(err))
  }

  // 🔹 REGISTER FUNCTION
  function handleRegister(e) {
    e.preventDefault();

    if (regPassword !== regConfirmPassword) {
      alert("Password and Confirm Password must match");
      return;
    }

    const newuser = {
      email: regEmail,
      password: regPassword
    }

    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newuser)
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === "Customer added successfully") {
        alert("Registered Successfully");
        navigate("/dashboard");
      } else if (data.message === "Email already exists") {
        alert("Email already exists, please login");
      } else {
        alert("Something went wrong");
      }

      // 👉 Switch back to signin
      setActiveTab("signin");
      setText("Sign In");
      setptext("Sign in to your workspace.");

      setRegEmail("")
      setRegPassword("")
      setRegConfirmPassword("")
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* 🔹 LEFT SIDE */}
        <div className="col-md-8 bg-dark text-white d-flex flex-column justify-content-center align-items-center text-center">
          <img src={logo} alt="logo" style={{ width: "120px" }} />
          <h1 className="mt-3">Customer Management System</h1>
          <p>Manage your customers efficiently</p>
        </div>

        {/* 🔹 RIGHT SIDE */}
        <div className="col-md-4 d-flex justify-content-center align-items-center bg-light">

          <div className="card shadow p-4" style={{ width: "350px" }}>

            <h3 className="fw-bold">{text}</h3>
            <p className="text-muted">{ptext}</p>

            {/* 🔹 TABS */}
            <div className="d-flex justify-content-between border-bottom mb-4">
              <span 
                className={activeTab === "signin" ? "fw-bold text-dark  " : "text-muted"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveTab("signin")
                  setText("Sign In")
                  setptext("Sign in to your workspace.")
                }}
              >
                Sign In
              </span>

              <span 
                className={activeTab === "register" ? "fw-bold text-danger " : "text-muted"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveTab("register")
                  setText("Register")
                  setptext("Create your account")
                }}
              >
                Register
              </span>
            </div>

            {/* 🔹 SIGNIN FORM */}
            {activeTab === "signin" && (
              <form onSubmit={handleSignin}>
                <div className="mb-3">
                  <label className="form-label mb-3">Email</label>
                  <input 
                    type="email"
                    className="form-control"
                    value={signinEmail}
                    onChange={(e)=>setSigninEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label mb-3">Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    value={signinPassword}
                    onChange={(e)=>setSigninPassword(e.target.value)}
                    required
                  />
                </div>

                <button className="btn btn-dark w-100">Sign In</button>
              </form>
            )}

            {/* 🔹 REGISTER FORM */}
            {activeTab === "register" && (
              <form onSubmit={handleRegister}>

                <div className="mb-3">
                  <label className="form-label mb-3">Email</label>
                  <input 
                    type="email"
                    className="form-control"
                    value={regEmail}
                    onChange={(e)=>setRegEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label mb-3">Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    value={regPassword}
                    onChange={(e)=>setRegPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label mb-3">Confirm Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    value={regConfirmPassword}
                    onChange={(e)=>setRegConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button className="btn btn-dark w-100">Register</button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}