import axios from 'axios';
import React, { useState } from 'react'

// showing the search result to render the search input changed

 const Searchresult = ({result,showFriend , handleChange}) => {
 
  return (
    <div className="userChat">
   {
    result.map((result,id)=> {
      return <div  key={id} className='userChatInfo' onClick={ (e) => {
         showFriend(result.name,result.userid);
         handleChange("");
      }}>
        <span>{result.name}</span>
         </div>
       
  })
   }
    </div>
  )
}


const Search = ({showFriend ,username}) => {
  const [input, setInput] = useState("");
  const [result ,setResult] = useState([]);

// search field from user and fetch from db every time we make changes and filter

  const fetchdata = async(value) => {
    try{
     await axios.post('http://localhost:8080/getuser')
      .then(json => {
        const result = json.data.filter((user) => {
          return  value && user && user.name && user.name.toLowerCase().includes(value);
        });
        setResult(result);
      })
    }
    catch(err)
    {
      console.log(err)
    }
  }

  const handleChange = (value) => {
    setInput(value);
    fetchdata(value)
  }

  return (
    <div className='search'>

    <div className="searchForm">
      <input type="text" name="" value={input} onChange={e => {handleChange(e.target.value)}} id="" placeholder='find a user' />
    </div>
    <Searchresult showFriend={showFriend} handleChange = {handleChange} result = {result}/>

    </div>
  )
}

export default Search