import React from 'react'
import {Link} from "react-router-dom";

// left siderbar contain username and logout button

const Navbar = ({username}) => {
  return (
    <div className='navbar'>
      <div className='user'>
        <span>{username}</span>
        <button ><Link to="/login" className='logoutbtn'>Logout</Link></button>
      </div>

    </div>
  )
}

export default Navbar