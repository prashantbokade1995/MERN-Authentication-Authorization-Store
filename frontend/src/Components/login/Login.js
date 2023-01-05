import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/")
        }
    },[]);

    const handleLogin = async () => {
        // console.log("email",email, "password",password);
        let result = await fetch('http://localhost:5000/login', {
            method:'post',
            body:JSON.stringify({email, password}),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        // console.warn(result)
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/")
        }else{
            alert("Please Enter the correct input details")
        }
    }

  return (
    <>
    <div className='login'>
      <h1>Login </h1>
      <br />
      <label>Enter Your Email : </label>
            <input className='inputBox' type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder = "Enter the email"/>
            <br />
            <label>Enter Your Password : </label>
            <input className='inputBox' type="password"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder = " Enter the password "/>
            <br />
            <button className="appButton" onClick={handleLogin} type= "button">Login</button>
    </div>
    </>
  )
}

export default Login
