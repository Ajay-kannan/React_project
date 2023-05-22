import React  from 'react'
const Input = ({ handleChange, message ,handleSubmit}) => {

  return (
    <div >
     <form onSubmit={handleSubmit} className='input'>
     <input type='text' value={message} onChange={(event) => handleChange(event.target.value)} name = "message" placeholder='Type something...'/>
      <div className='send'>
        <img src='' alt='' />
        <input type="file" style={{display : "none"}}  name="" id="file" />
        <label htmlFor="file"><img src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/attach.png" alt="" /></label>
        <button type='submit'>send</button>
      </div>
     </form>
    </div>
  )
}

export default Input