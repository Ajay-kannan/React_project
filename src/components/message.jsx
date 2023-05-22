import React from 'react'

const Message = ({message,sender,username,date,time}) => {
  const style = sender === username ? "owner" : "messages";
  return (
    <div className={style}>
      <div className="messageInfo">
        <img src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg" alt="" />
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className='messageContent'>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message