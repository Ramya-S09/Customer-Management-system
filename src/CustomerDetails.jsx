import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
export default function CustomerDetails() {
    const [customerDetails, setCustomerDetails] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/customerdetails")
            .then((res) => res.json())
            .then((data) => {
                setCustomerDetails(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container mt-4">

            <div className="bg-primary text-white text-center p-3 rounded">
                <h2>Customer Details</h2>
            </div>

            <div className="table-responsive mt-4">
                <table className="table table-bordered table-striped table-hover text-center">
                    
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customerDetails.length > 0 ? (
                            customerDetails.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone_no}</td>

                                    <td>
                                       <Link to={`/edit/${customer.id}`} className='btn btn-success btn-sm'>Edit</Link>
                                    </td>

                                    <td>
                                        <Link to={`/delete/${customer.id}`} className="btn btn-danger btn-sm">
                                            Delete
                                        </Link>
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
    );
}