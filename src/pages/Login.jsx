import React, {useState} from 'react'
import {Link , useNavigate} from "react-router-dom";
import axios from "axios";

//login page

export const Login = () => {

  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert , setalert] = useState('');

  const handleChange1 = (event) => {
    setEmail(event.target.value);
  }

  const handleChange2 = (event) => {
    setPassword(event.target.value);
  }

  async function handleSubmit(event){

    event.preventDefault();

    try{
      await axios.post("http://localhost:8080/login" , {
        email ,password
      }).then( res => {
        if(res.data === "invaild"){
          setalert("User doesn't exist");
        }
        else if(res.data.status === "vaild"){
          history("/home",{state : {id : res.data.email , username : res.data.name }});
        }
        else if(res.data === "invaild password"){
          setalert("password doesn't match");

        }
      })

    }
    catch(err)
    {
      console.log(err);
      setalert("something went wrong");
    }

  }


  return (
    <div className='container'>
    <div className='formContainer'>
    <span className='logo'>chat-app</span>
    <span className='title'>login</span>

    <form onSubmit={handleSubmit}>
           <input type="email"  value={email} onChange={handleChange1} name='email' placeholder='email' />
            <input type="password" value={password} onChange={handleChange2} name='password' placeholder='password'  />
        <button>Sign in</button>
    </form>
        <div> you not have a account ? <Link to="/register">register</Link></div>
    </div>
    {alert}
 </div>
  )
}
