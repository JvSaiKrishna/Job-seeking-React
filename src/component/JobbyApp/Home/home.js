import React from 'react'
import {Link, Navigate} from "react-router-dom"
import Cookies from "js-cookie"
import "./home.css"
import Header from '../Header/header'

export default function Home() {
    const jwt = Cookies.get("jwt_token")
    if(jwt === undefined){
        return <Navigate to='/login' replace/>

    }
  return (
    <div className="home-bg-container">
    <Header />
    <div className="title-container">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary information, salary
        information, company reviews. Find the job that fits your abilities and
        potential.
      </p>

      <Link className="link-item" to="/jobs">
        <button className="fin-jobs-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
    
  )
}
