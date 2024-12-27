import React, { useState } from 'react'
import axios from "axios";
function Button() {
  const [data, setdata] = useState([])
   function call_fun(){
    console.log("calling");
    axios.get('http://localhost:3000/get-user')
    .then(response => {
        console.log(response.data.message)
        setdata(response.data.message)
    })
    .catch(error => {
        console.log(error)
    }
    )
   }
  return (
    <div>
        <button onClick={()=>{
            call_fun()
        }}>Click</button>
       <div>
       {data.map((item) => {
              return (
                <div key={item._id}>
                    <h3>NAME:{item.username}</h3>
                    <h3>PASS:{item.password}</h3>
                </div>
              );
            })}
       </div>
    </div>
  )
}

export default Button