import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Ragister = () => {

    const [data, setData] = useState({ username: "", email: "", password: "", cpassword: "", number: "" })
    const [err, setErr] = useState({ usernameErr: false, emailErr: false, passwordErr: false, cpasswordErr: false, numberErr: false, allErr:false, success:false })
    const navigate = useNavigate();

    function HandleInput(e) {
        const { username, email, password, cpassword, number } = data;
        let name = e.target.name;
        let value = e.target.value;

        setData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
    }
    const HandleSubmit = async () => {

        const { username, email, password, cpassword, number } = data;

        if (!username || !email || !password || !cpassword || !number) {
            setErr({...err, allErr:true})
        }
        else if (username.length<2) {
            setErr({ usernameErr: true, emailErr: false, passwordErr: false, cpasswordErr: false, numberErr: false, allErr:false })
        }
        else if (!email.includes("@") || !email.includes(".")) {
            setErr({ usernameErr: false, emailErr: true, passwordErr: false, cpasswordErr: false, numberErr: false, allErr:false })
        }
        else if (password.length < 6) {
            setErr({ usernameErr: false, emailErr: false, passwordErr: true, cpasswordErr: false, numberErr: false, allErr:false })
        }
        else if (password !== cpassword) {
            setErr({ usernameErr: false, emailErr: false, passwordErr: false, cpasswordErr: true, numberErr: false, allErr:false })
        }
        else if (number.length < 10) {
            setErr({ usernameErr: false, emailErr: false, passwordErr: false, cpasswordErr: false, numberErr: true, allErr:false })
        } else {
            try {
                const res = await fetch("http://127.0.0.1:8000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, email, password, cpassword, number })
                })
                console.log(res)
                const result = await res.json();
                if (result.status === 201) {
                    setErr({...err, numberErr:false, success:true })
                    navigate("/login")
                } else {
                    console.log("this is err ...... !!!!")
                }
            } catch (err) {
                alert("user not found")
            }

        }
    }
    useEffect(() => {
        let auth1 = localStorage.getItem("user");
        if (auth1) {
            navigate("/");
        }
    })
    return (
        <>
            <div className="container my-5 py-4" style={{ backgroundColor: "lightgrey" }}>
                <div className="border rounded-3 m-auto text-center" style={{ width: "400px", backgroundColor: "white" }}>
                    <div className="my-4">
                        <h3>Register</h3>
                        {err.allErr?<h6 className='text-danger'>please fill all details</h6>:null}
                        {err.success?<h6 className='text-success'>Register successfully</h6>:null}
                    </div>
                    <div className="my-3">
                        <TextField
                            type={"text"}
                            required
                            name="username"
                            placeholder='Enter name'
                            value={data.username}
                            onChange={HandleInput}
                            focused
                            />
                            {err.usernameErr?<h6 className='text-danger'>please enter valid name</h6>:null}
                    </div>
                    <div className="my-3">
                        <TextField
                            type={"email"}
                            required
                            name="email"
                            placeholder='Enter Your Email'
                            value={data.email}
                            onChange={HandleInput}
                            focused
                            />
                            {err.emailErr?<h6 className='text-danger'>please enter valid email</h6>:null}
                    </div>
                    <div className="my-3">
                        <TextField
                            type={"password"}
                            required
                            name="password"
                            placeholder='Enter Password'
                            value={data.password}
                            onChange={HandleInput}
                            focused
                            />
                            {err.passwordErr?<h6 className='text-danger'>please enter valid password</h6>:null}
                    </div>
                    <div className="my-3">
                        <TextField
                            type={"password"}
                            required
                            name="cpassword"
                            placeholder='Re-Enter Password'
                            value={data.cpassword}
                            onChange={HandleInput}
                            focused
                            />
                            {err.cpasswordErr?<h6 className='text-danger'>password not match</h6>:null}
                    </div>
                    <div className="my-2">
                        <TextField
                            type={"number"}
                            required
                            name="number"
                            placeholder="Enter Mobile Number"
                            value={data.number}
                            onChange={HandleInput}
                            focused
                            />
                            {err.numberErr?<h6 className='text-danger'>please enter valid number</h6>:null}
                    </div>
                    <div className="my-2">
                        <Button type='button' variant="contained" onClick={HandleSubmit}>Submit</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Ragister;


