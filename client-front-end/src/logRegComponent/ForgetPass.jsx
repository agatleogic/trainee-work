import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';

const ForgetPass = () => {

    const { id, token } = useParams()

    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const userValid = async () => {
        const res = await fetch(`http://127.0.0.1:8000/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        if (data.status === 201) {
            console.log("user verify successfully")
        } else {
            console.log("token expired generate new link")
        }
    }
    useEffect(() => {
        userValid();
    }, [])

    const HandleSubmit = async () => {

        if (!password) {
            alert("please enter valid password")
        }
        else {
            const res = await fetch(`http://127.0.0.1:8000/${id}/${token}`, {
                method: "POST",
                body: JSON.stringify({ password }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if (data.status === 201) {
                localStorage.clear()
                alert("password changed successfully")
                navigate("/login")
            } else {
                console.log("invalid user")
            }
        }
    }

    return (
        <>
            <div className="container my-5 py-5" style={{ backgroundColor: "lightgrey" }}>
                <div className="border rounded-3 m-auto text-center" style={{ width: "300px", backgroundColor: "white" }}>

                    <div className="my-4">
                        <h3>Enter New Password</h3>
                    </div>
                    <div className="my-3">
                        <TextField
                            type={"password"}
                            required
                            name="password"
                            placeholder='Enter Your New Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            focused
                        />
                    </div>

                    <div className="my-2">
                        <Button type='button' variant="contained" onClick={HandleSubmit}>Submit</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ForgetPass;