import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

    const [pass, setPass] = useState(true)
    const [data, setData] = useState({ email: "", password: "" })
    const [err, setErr] = useState({ emailErr: false, passwordErr: false, allErr:false, success:false })
    const navigate = useNavigate();

    function HandleInput(e) {
        const { email, password } = data;
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
        const { email, password } = data;
        if (!email || !password) {
            setErr({...err, allErr:true})
        }
        else if (!email.includes("@") || !email.includes(".")) {
            setErr({ emailErr: true, passwordErr: false, allErr:false, success:false })
        }
        else if (password.length < 6) {
            setErr({ emailErr: false, passwordErr: true, allErr:false, success:false })
        }else {
            try {
                const res = await fetch("http://127.0.0.1:8000/login", {
                    method: "POST",
                    body: JSON.stringify({email, password }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const result = await res.json();
                console.log(result)
                if (result.status === 201) {
                    setErr({ emailErr: false, passwordErr: false, allErr:false, success:true })
                    localStorage.setItem("user", JSON.stringify(result.user));
                    localStorage.setItem("token", JSON.stringify(result.auth));
                    // localStorage.setItem("token", JSON.stringify(result))
                    navigate("/")
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
            navigate("/")
        }
    })
    const ShowPass=() =>{
        if(pass==true){
            setPass(false)
        }else{
            setPass(true)
        }
    }
    return (
        <>
            <div className="container my-5 py-5" style={{ backgroundColor: "lightgrey" }}>
                <div className="border rounded-3 m-auto text-center" style={{ width: "300px", backgroundColor: "white" }}>
                    <div className="my-4">
                        <h3>Login Page</h3>
                        {err.allErr?<h6 className='text-danger'>please fill all details</h6>:null}
                        {err.success?<h6 className='text-success'>Login successfully</h6>:null}
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
                            type={pass ? "password" : "text"}
                            required
                            name="password"
                            placeholder='Enter Password'
                            value={data.password}
                            onChange={HandleInput}
                            focused
                        /><br />
                        <Button onClick={() => ShowPass()}>
                            {pass ? "Show" : "Hide"}
                        </Button>
                        {err.passwordErr?<h6 className='text-danger'>please enter valid password</h6>:null}
                    </div>

                    <div className="my-2">
                        <Button type='button' variant="contained" onClick={HandleSubmit}>Submit</Button>
                    </div>
                    <div className="my-2">
                        <NavLink to="/pass-reset" >forget password ?</NavLink>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login