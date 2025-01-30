import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import "./header.css"

export default function Header() {

    const navigate = useNavigate()



    const onClickLogout =()=>{
        Cookies.remove("jwt_token")
        navigate('/login',{replac:true})

    }
    return (
        <header className='header'>

            <div>
                <Link to="/" className='btn'>
                    <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website logo" className="header-logo" />
                </Link>
            </div>
            <ul className='u-list'>

                <li className='list'>
                    <Link to="/" className='list2 btn'>
                        Home
                    </Link>
                </li>
                <li className='list'>
                    <Link to="/jobs" className='list2 btn'>
                        Jobs
                    </Link>
                </li>
                
            </ul>
            
            <button onClick={onClickLogout}  className='logout'>Logout</button>
            
        </header>
    )
}
