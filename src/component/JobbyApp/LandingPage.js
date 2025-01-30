import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './Login/login'
import NotFound from './NotFound/index'
import Home from './Home/home'
import Jobs from './Jobs/jobs'
import JobItemDetails from './JobItemDetails'

export default function JobbyApp() {
    return (
        <div>
            <BrowserRouter>
            <Routes>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/' element = {<Home/>}/>
            <Route path='/jobs' element = {<Jobs/>}/>
            <Route path='/jobs/:id' element = {<JobItemDetails/>}/>
            <Route path='*' element = {<NotFound/>}/>
            </Routes>
            </BrowserRouter>
           

        </div>
    )
}
