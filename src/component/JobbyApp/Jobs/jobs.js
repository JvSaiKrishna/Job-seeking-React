import React, { useEffect, useState } from 'react'
import Header from "../Header/header"
import "./jobs.css"
import { BsSearch } from 'react-icons/bs'
import Profile from '../Profile/index'
import FilterData from '../FilterData'
import Cookies from "js-cookie"
import JobCards from '../JobCards'


const typeOfEmployments = [
    {
        id: "FULLTIME",
        type: "Full Time"
    },
    {
        id: "PARTTIME",
        type: "Part Time"
    },
    {
        id: "FREELANCE",
        type: "Freelance"
    },
    {
        id: "INTERNSHIP",
        type: "Internship"
    },
]

const salaryRange = [
    {
        id: "1000000",
        range: "10 LPA and Above"
    },
    {
        id: "2000000",
        range: "20 LPA and Above"
    },
    {
        id: "3000000",
        range: "30 LPA and Above"
    },
    {
        id: "4000000",
        range: "40 LPA and Above"
    },
]
const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}


export default function Jobs() {
    const [status, setstatus] = useState(apiStatusConstants.initial)
    const [jobList, setjobList] = useState([])
    const [filteringData, setfilteringData] = useState({
        search: '',
        jobRole: [],
        rangeBetween: salaryRange[0].id
    })
    const [changesOnSearch, setchangesOnSearch] = useState('')

    useEffect(() => {
        Fetchjobs(filteringData)
    }, [filteringData])

    const Fetchjobs = async (filteringData) => {
        setstatus(apiStatusConstants.inProgress)
        const jwt = Cookies.get("jwt_token")
        const url = `https://apis.ccbp.in/jobs/?search=${filteringData.search}&minimum_package=${filteringData.rangeBetween}&employment_type=${filteringData.jobRole.join()}`
        const options = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            method: 'GET',
        }
        const response = await fetch(url, options)
        if (response.ok === true) {
            const data = await response.json()
            const updatedJobsData = data.jobs.map(eachJob => ({
                companyLogoUrl: eachJob.company_logo_url,
                employmentType: eachJob.employment_type,
                id: eachJob.id,
                jobDescription: eachJob.job_description,
                location: eachJob.location,
                packagePerAnnum: eachJob.package_per_annum,
                rating: eachJob.rating,
                title: eachJob.title,
            }))
            setjobList(updatedJobsData)
            setstatus(apiStatusConstants.success)
        }
        else {
            setstatus(apiStatusConstants.failure)
        }


    }


    const renderJobsview = () => {
        return jobList.length > 0 ? (

            <>
                <div className='jobs-container'>

                    {
                        jobList.map(each => (
                            <JobCards jobList={each} key={each.id} />
                        ))
                    }
                </div>
            </>
        ) : (
            <>
                <div className="no-jobs-view">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                        className="no-jobs-img"
                        alt="no jobs"
                    />
                    <h1 className="no-jobs-heading">No Jobs Found</h1>
                    <p className="no-jobs-description">
                        We could not find any jobs. Try other filters.
                    </p>
                </div>
            </>
        )




    }
    const renderFailureview = () => {
        return (<div className="jobs-error-view-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="jobs-failure-img"
            />
            <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
            <p className="jobs-failure-description">
                We cannot seem to find the page you are looking for
            </p>
            <button
                type="button"

                className="jobs-failure-button"
                onClick={this.getJobs}
            >
                Retry
            </button>
        </div>)

    }
    const renderLoadingview = () => {
        return (<h1>Loading...</h1>)

    }

    const swithOperation = () => {
        switch (status) {
            case apiStatusConstants.success:
                return renderJobsview()
            case apiStatusConstants.failure:
                return renderFailureview()
            case apiStatusConstants.inProgress:
                return renderLoadingview()
            default:
                return null
        }
    }


    const onSearchKeyDown = (event) => {
        if (event.key === "Enter") {
            // onChangesearch()
            setfilteringData((prev) => {
                return { ...prev, search: event.target.value }
            })


        }

    }
    const onChangesearch = (event) => {
        setchangesOnSearch(event.target.value)
    }
    const onClickSearch = () => {

        setfilteringData((prev) => {
            return { ...prev, search: changesOnSearch }
        })

    }

    const onSalaryRange = (id) => {
        setfilteringData((prev) => {
            return {
                ...prev,
                rangeBetween: id
            }
        })

    }
    // let roles= [];
    const onEmployment = (id) => {
        if(filteringData.jobRole.includes(id) === false){
            setfilteringData((prev)=>{
                return {
                    ...prev,
                    jobRole:[...prev.jobRole,id]
                }
            })
        }
        else{
            const updateRole = filteringData.jobRole.filter(each=>{
                return id !== each
            })
            setfilteringData((prev)=>{
                return {
                    ...prev,
                    jobRole:updateRole
                }
            })
        }

                
    }
    console.log(filteringData.jobRole.join())



    // console.log(filteringData)

    return (
        <>
            <Header />
            <div className='job-container'>
                <div className='inner-jobs-container'>

                    <div className='input-container'>
                        <input
                            onChange={onChangesearch}
                            onKeyDown={onSearchKeyDown}
                            type='search' placeholder='Search'
                            className='search-input'
                        />
                        <button
                            type="button" onClick={onClickSearch}
                            className="search-button-container"
                        >
                            <BsSearch className="search-icon" />
                        </button>
                    </div>
                    <Profile />

                    <hr className='horizontal-line' />

                    <FilterData typeOfEmployments={typeOfEmployments} salaryRange={salaryRange} onSalaryRange={onSalaryRange} onEmployment={onEmployment} />

                    {swithOperation()}

                </div>
            </div>
        </>
    )
}
