import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const ResetPass = () => {

    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const sendLink = async () => {

        if (!email || !email.includes("@") || !email.includes(".")) {
            alert("please enter valid email")
        }
        else {
            const res = await fetch("http://127.0.0.1:8000/sendpasswordlink", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if (data.status === 201) {
                alert("password reset link send successfully in your email")
            } else {
                console.log("invalid user")
            }
        }
    }
    useEffect(() => {
        let auth1 = localStorage.getItem("user");
        if (auth1) {
            navigate("/")
        }
    })
    return (
        <>
            <div className="container my-5 py-5" style={{ backgroundColor: "lightgrey" }}>
                <div className="border rounded-3 m-auto text-center" style={{ width: "300px", backgroundColor: "white" }}>
                <div className="my-4">
                        <h3>Enter your Email</h3>
                    </div>
                    <div className="my-3">
                        <TextField
                            type={"email"}
                            required
                            name="email"
                            placeholder='Enter Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            focused
                        />
                    </div>

                    <div className="my-2">
                        <Button type='button' variant="contained" onClick={sendLink}>Send</Button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default ResetPass;