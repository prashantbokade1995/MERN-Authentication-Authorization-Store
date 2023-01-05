import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css'


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const auth = localStorage.getItem('user');
      if(auth){
        navigate("/")
      }
    },[])
    

    const collectData = async () => {
      // console.log(name, email, password);
      let result = await fetch('http://localhost:5000/register', {
        method: 'post',
        body: JSON.stringify({name, email, password}),
        headers:{
          'Content-Type' : 'application/json'
        },
      });
      result = await result.json()
      // console.log(result);
      // if(result){
      //   navigate("/")
      // }
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/") 
  }


  return (
    <>
        <div className="register">
            <h1>Register </h1>
           <br />

            <label>Enter Your FullName : </label>
            <input className='inputBox' type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder = " Enter the Name"/>
            <br />
            <label>Enter Your Email : </label>
            <input className='inputBox' type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder = " Enter the email"/>
            <br />

            <label>Enter Your Password : </label>
            <input className='inputBox' type="password"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder = " Enter the password "/>
            <br />

            <button className="appButton" onClick={collectData} type= "button" >Sign Up </button>
            <br />
            <button type= "button"><Link to="/login">Login</Link></button>
            
        </div>
    </>
  )
}

export default SignUp
