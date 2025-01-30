import React,{useState} from 'react'
import {useNavigate, Navigate} from "react-router-dom"
import "./login.css"
import Cookies from "js-cookie"

export default function Login() {
    const [loginDetails , setloginDetails] = useState({
        username:'',
        password:''
    })
    const [error, seterror] = useState('')
    const [isError, setisError] = useState(false)


    const navigate = useNavigate()

    
    const jwt = Cookies.get("jwt_token")
    if(jwt){
        return <Navigate to='/' replace/>

    }

    
    

    
    const loginsuccess = (jwtoken)=>{
       
        // console.log(data)
        Cookies.set("jwt_token",jwtoken,{expires:30})
        navigate("/",{replace:true})


        
    }
    const OnSubmitData = async (event)=>{
        event.preventDefault()

        const details = {username:loginDetails.username,password:loginDetails.password}
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method:"POST",
            body:JSON.stringify(details)
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if(response.ok === true){
            
            loginsuccess(data.jwt_token)
            
        }
        else{

            seterror(data.error_msg)
            setisError(true)
            
        }
        setloginDetails({
            username:'',
            password:''
        })
    }

    



    const onUsername = (event)=>{
        setloginDetails((prev)=>({
            ...prev,
            username:event.target.value

        }))
    }

    const onPassword = (event)=>{
        setloginDetails((prev)=>({
            ...prev,
            password:event.target.value

        }))
    }

  return (
    <div className='container'>
        
            <form onSubmit={OnSubmitData} className='login-form'>

                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website logo" className="website-logo"/><br/>
                <div className='input-container'>
                <label htmlFor='username' className='label'>USERNAME</label><br/>
                <input onChange={onUsername} type='text' id="username" placeholder='Username' className='input' value={loginDetails.username}/><br/>
                </div>
                <div className='input-container'>

                <label htmlFor='password' className='label'>PASSWORD</label><br/>
                <input onChange={onPassword} type='password' id="password" placeholder='Password' className='input' value={loginDetails.password}/><br/>
                </div>
                <button type='submit' className='login-btn'>Login</button>
                {isError && <p className='error'>*{error}</p>}
            </form>

            

        
    </div>
  )
}
