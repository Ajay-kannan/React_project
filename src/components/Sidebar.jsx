import React from 'react'
import '../App.css'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
const Sidebar = ({username,showFriend,usernameid,firstfriend}) => {
 
  return (
    <div className='sidebar'>
    <Navbar username={username}/>
    <Search showFriend={showFriend} username={username}/>
    <Chats showFriend={showFriend} usernameid={usernameid} firstfriend={firstfriend}/>
    </div>
  )
}

export default Sidebar