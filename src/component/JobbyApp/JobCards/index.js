import React from 'react'
import {Link} from "react-router-dom"
import "./index.css"
import { AiFillStar } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import { BsFillBriefcaseFill } from 'react-icons/bs'

export default function JobCards(props) {
    const { jobList } = props
    const { companyLogoUrl,
        employmentType,
        jobDescription,
        id,
        location,
        rating,
        title,
        packagePerAnnum } = jobList

    return (
        <>
        <Link to = {`/jobs/${id}`} className='job-card-container'>
            <div className='logo-title-container'>
                <img className='logo' src={companyLogoUrl} alt="company logo" />
                <div className='job-title-container'>
                    <h1 className='title'>{title}</h1>
                    <div className='job-rating-container'>

                        <AiFillStar color="gold" size={20} />
                        <p className='job-rating'> {rating}</p>
                    </div>
                </div>
            </div>
            <div className='contact-lpa-container'>
                <div className='contact-container'>

                    <div className='location-container'>
                        <MdLocationOn size={25} color="white" />
                        <p className="location">{location}</p>

                    </div>
                    <div className="location-container">
                        <BsFillBriefcaseFill size={25} color="white" />
                        <p className="location">{employmentType}</p>
                    </div>
                </div>
                <p className='package'>
                    {packagePerAnnum}
                </p>

            </div>
            <hr className='horizatal-line-in-card'/>
            <p className='description'>Description</p>
            <p className='description-content'> {jobDescription} </p>
        </Link>
        </>
    )
}
