import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import axios from "axios";
import { UserContext } from './UserContext';

// sidebar of program , contain user friend list card
const Chatfriends = ({users , showFriend}) => {
  return(
    <React.Fragment>
      <div className="userChat1" onClick={(e) => {showFriend(users.user,users.userid) ;}}>
    <img src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg" alt="" />
      <span>{users.user}</span>
      </div>
    </React.Fragment>
  )
}

const Chats = ({showFriend,usernameid,firstfriend}) => {

  const value = useContext(UserContext);

  // getting the user friend list from db

  useEffect(()=>{
    async function func(){
      try{
        await axios.post('http://localhost:8080/userfriend',{usernameid})
         .then(json => {
           let result = [];
          json.data.forEach((user) => {
                result.push({user : user.friend, userid : user.friendid});
           });
           setuserlist(result);
         })
       }
       catch(err)
       {
         console.log(err)
       }
    }
    func();
  },[value]);

  const [userlist , getuserlist] = useState([]);

  function setuserlist(result)
  {
    getuserlist(result);
    firstfriend(result[0].user,result[0].userid);
  }

  return (
    <div className='chats'> 
      {
        userlist.map((item, index)=> {
          return <Chatfriends showFriend={showFriend} users={item} key={index}/>
        })
      }
    </div>
    
  )
}

export default Chats  