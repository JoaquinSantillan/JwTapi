
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export const Sigin = () => {

      const [newUsuario, setNewUsuario] = useState({name:''})
      const [newEmail, setNewEmail] = useState({email:''})
      const [newPass, setNewPass] = useState({password:''})

      const url = 'http://localhost:3001/api/user/register'

      
      const peticionPost = async()=>{
            await axios.post(url,{
            name:newUsuario,
            email:newEmail,
            password:newPass
      })
            .then (res=>{
            console.log(res)
      })
            .catch(err=> console.log(err));
      }

      const handleChange = (event)=>{
            setNewUsuario({...newUsuario,[event.target.name]:event.target.value})
            setNewEmail({...newEmail,[event.target.name]:event.target.value})
            setNewPass({...newPass,[event.target.name]:event.target.value})

      }

      const handleSubmit = (e)=>{
            e.preventDefault()
            peticionPost()
      }

return (
      <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text"  placeholder='usuario' name='name'/>
            <input onChange={handleChange} type="email"  placeholder='email' name='email'/>
            <input onChange={handleChange} type="password"  placeholder='password' name='password'/>
      <button>registrarse</button>
      </form>
)
}
