import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {

    const [customerDetails, setCustomerDetails] = useState([]);
    const [active, setactive] = useState("dashboard");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_no, setPhoneNo] = useState("");
    const [search, setSearch] = useState("");
    const filteredCustomers = customerDetails.filter((c) =>
  c.name.toLowerCase().includes(search.toLowerCase())
);

    useEffect(() => {
        fetch("http://localhost:8080/customerdetails")
            .then((res) => res.json())
            .then((data) => setCustomerDetails(data))
            .catch((err) => console.log(err));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newcustomer = { name, email, phone_no };

        fetch("http://localhost:8080/addcustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newcustomer)
        })
        .then((res) => res.text())
        .then((data) => {
            alert("Customer Added Successfully")

            setName("");
            setEmail("");
            setPhoneNo("");

            // 👉 switch to view instead of navigate
            setactive("dashboard");
        })
        .catch((err) => console.log(err));
    }
    function handleDelete(id) {
    fetch(`http://localhost:8080/delete/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Customer Deleted");
        setCustomerDetails(customerDetails.filter(c => c.id !== id));
    });
}

    return (
        <>
         {/* <ToastContainer position="top-right" autoClose={2000}/> */}
        <div className="container-fluid vh-100">
           
            <div className="row h-100">

                {/* 🔹 Sidebar */}
                <div className="col-md-2 bg-dark text-white d-flex flex-column p-3">
                    <h4 className="text-center">Dashboard</h4>
                    <hr />
                    <p style={{cursor:"pointer"}} onClick={() => setactive("dashboard")}>Home</p>
                    <p style={{cursor:"pointer"}} onClick={() => setactive("view")}>Customers</p>
                </div>

                {/* 🔹 Main Content */}
                <div className="col-md-10 p-5">

                    {/* 🔹 DASHBOARD */}
                    {active === "dashboard" && (
                        <>
                            <h2 className="mb-4">Welcome Ramya 👋</h2>

                            <div className="row g-4">

                                <div className="col-md-4">
                                    <div 
                                        className="card text-center bg-dark text-light p-4 shadow h-100"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setactive("add")}
                                    >
                                        <h1 className="text-primary">+</h1>
                                        <h5>Add Customer</h5>
                                        <p>Create a new record</p>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div 
                                        className="card text-center bg-dark text-light p-4 shadow h-100"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setactive("view")}
                                    >
                                        <h5 style={{marginTop:"40px"}}>View Customers</h5>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card text-center bg-dark text-light p-4 shadow h-100">
                                        <h5>Total Customers</h5>
                                        <h2>{customerDetails.length}</h2>
                                        <p>All time</p>
                                    </div>
                                </div>

                            </div>
                        </>
                    )}

                    {/* 🔹 ADD CUSTOMER */}
                    {active === "add" && (
                        <div className=" d-flex justify-content-center mt-2">
                            <div className=" card p-5" style={{ width: "600px",height:"550px" }}>
                                <h4 className="text-center text-Dark">Customer Detail</h4>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="fw-bold">Name</label>
                                        <input type="text" className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="fw-bold">Email</label>
                                        <input type="email" className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="fw-bold">Phone</label>
                                        <input type="text" className="form-control"
                                            value={phone_no}
                                            onChange={(e) => setPhoneNo(e.target.value)} />
                                    </div>

                                    <button className="btn btn-dark text-light w-100 mt-20px">
                                        Add Customer
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* 🔹 VIEW CUSTOMERS */}
                    {active === "view" && (
                        <div className="mt-4">
                            <p onClick={()=>setactive("dashboard")} style={{cursor:"pointer"}}>Back To Dashboard</p>
                            <h3 className="text-center bg-dark text-white p-2 rounded">
                                Customer Details
                            </h3>
                            <input 
  type="text"
  placeholder="Search by name..."
  className="form-control mb-3"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

                            <div className="table-responsive mt-3">
                                <table className="table table-bordered text-center">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredCustomers.length > 0 ? (
                                            filteredCustomers.map((c) => (
                                                <tr key={c.id}>
                                                    <td>{c.name}</td>
                                                    <td>{c.email}</td>
                                                    <td>{c.phone_no}</td>
                                                    <td>
                                                        <Link to={`/edit/${c.id}`} className="btn btn-success btn-sm">Edit</Link>
                                                    </td>
                                                    <td>
                                                        <button onClick={()=>handleDelete(c.id)}className="btn btn-danger btn-sm">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5">No Data Found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
        </>
    );
}