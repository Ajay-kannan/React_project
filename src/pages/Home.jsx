import React , {useState} from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useLocation , Navigate } from 'react-router-dom'
import { UserContext } from '../components/UserContext'

const Protected = ({friend,friendid,showFriend,firstfriend}) => {

  const [addfriendclick , getaddfriendclick] = useState(0);

  // get the instance of addfriend button from user

  function setclickfunction(value)
  {
    getaddfriendclick(value);
  }
  
  let location = useLocation();
  let username;
  let usernameid;
  // when user log by login or register will get in or catch by err and redirect to login page
  try{
    username = location.state.username;
    usernameid = location.state.id;
    return (
      <div>
        <UserContext.Provider value={addfriendclick}>
        <Sidebar username={username} showFriend = {showFriend}  usernameid={usernameid} firstfriend={firstfriend} />
        <Chat username = {username} friend = {friend} friendid={friendid} usernameid={usernameid} setclickfunction={setclickfunction}/>
       </UserContext.Provider>
      </div>
      )
  }
  catch(err){
   return <Navigate to="/login" />
    }
}

const Home = () => {
  const [friend , getfriend] = useState("");
  const [friendid , getfriendid] = useState("");

// just getting and setting user, friend

  function showFriend (friend,userid) {
    getfriend(friend);
    getfriendid(userid)
  }
  function firstfriend(friend, userid)
  {
    getfriend(friend);
    getfriendid(userid)
  }
 

  return (
    <div className='homeContainer'>
          <Protected friend = {friend} friendid={friendid} showFriend = {showFriend} firstfriend={firstfriend}>
          </Protected>  
    </div>
  )
}

export default Home
 