import React, { useState } from 'react'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

//register page

export const Register = () => {

  const history = useNavigate() ;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert , setalert] = useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  }
  const handleChange1 = (event) => {
    setEmail(event.target.value);
  }
  const handleChange2 = (event) => {
    setPassword(event.target.value);
  }


  async function handleSubmit(event) {
    event.preventDefault();

    try{
        await axios.post("http://localhost:8080/register" , {
          name , email , password
        }).then( res => {
          if(res.data === "not exist"){
            history("/home", {state : {id : email ,username : name}})
          }
          else if(res.data === "exist")
          {
            setalert("user name is already taken !");
          }
        })
    }
    catch(err)
    {
      setalert("user name is already taken !");
    }
  }

  return (
    <div className='container'>
        <div className='formContainer'>
        <span className='logo'>chat-app</span>
        <span className='title'>Register</span>

        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={handleChange} name='name' placeholder='display name'/>
            <input type="email"  value={email} onChange={handleChange1} name='email' placeholder='email' />
            <input type="password" value={password} onChange={handleChange2} name='password' placeholder='password'  />
            <input type="file"  />
            <button type='submit'>Sign up</button>
        </form>
            <div>do you have a account ? <Link to="/login"> login</Link> </div>
        </div>
        {alert}
     </div>
  )
}
