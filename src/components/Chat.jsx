import React, { useEffect, useState , useRef, useContext} from 'react'
import '../App.css'
import Message from './message'
import Input from './Input'
import axios from 'axios'
import { UserContext } from './UserContext'

const Chat = ({username,friend,usernameid,friendid ,setclickfunction}) => {

  let value = useContext(UserContext);

  const [messagedb , getmessage] = useState([]);

  const [message, setinput] = useState("");


  const scrollRef = useRef();

  const handleChange = (event) => {
    setinput(event);
  }

  const setmessage = (result) => {
    getmessage(result);
  }




  useEffect(() => {
   try{
       axios.post("http://localhost:8080/messages" ,
       {usernameid , friendid}
      ).then( res => {
        if(res.data === "new"){
          getmessage([]);
        }
        else {
          const result = res.data.filter((mes)=>{
              return ((mes.friend === friendid && mes.username === usernameid) || (mes.friend === usernameid && mes.username === friendid) )  ;
          })
          setmessage(result);
        }
      })
   }
   catch(err)
   {
    console.log(err);
   }
  },[friend,message])
  

  function addfriendtodb() {
  setclickfunction(()=>{
    return value += 1;
  });
    try{
      axios.post("http://localhost:8080/addfriend" ,
      {username,friend,usernameid,friendid}
     ).then( res => {
       if(res.data  === "ok")
       {
        console.log("ok");
       }
       else if(res.data === "already")
       {
        console.log("user is already exists");
       }
     })
  }
  catch(err)
  {
   console.log(err);
  }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let date = new Date();
    let actualdate = date.getDate()+ "/" + date.getMonth() + "/" +date.getFullYear() ;
    let time = date.toLocaleTimeString();
    try{
        await axios.post("http://localhost:8080/message" , {
          usernameid, friendid, message , actualdate , username ,time
        }).then( res => {
          console.log(res)
        })
    }
    catch(err)
    {
      console.log(err);
    }
    handleChange("");
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  },[message]);
  

  return (
    <div className='chat'>

      <div className="chatInfo">
        <span>{friend}</span>
        <div className=''>
              <button onClick={addfriendtodb} className='addbutton'>Add friend</button>
        </div>
      </div>
<div className='message'>
      {messagedb.map((item, id)=> {
       return <div  ref={scrollRef} key={id}><Message message={item.message} date={item.date} time={item.time} username={username} sender={item.sender} key={id}/></div> 
      })}
</div>
      <Input username={username} friend={friend} usernameid={usernameid} friendid={friendid} message={message} handleSubmit={handleSubmit} handleChange={handleChange}/>
    </div>
  )
}

export default Chat