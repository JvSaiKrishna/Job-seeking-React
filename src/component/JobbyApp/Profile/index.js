import { Component } from 'react'
import Cookies from "js-cookie"
import "./index.css"

const Status = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

export default class Profile extends Component {
    state = {
        apiStatus: Status.initial,
        profile: []
    }

    componentDidMount() {
        this.fetchProfile()
    }

    fetchProfile = async () => {
        this.setState({ apiStatus: Status.inProgress })
        const jwt = Cookies.get("jwt_token")
        const url = 'https://apis.ccbp.in/profile'
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }
        const response = await fetch(url, options)
        if (response.ok === true) {
            const data = await response.json()
            const profileData = {
                name: data.profile_details.name,
                profileImageUrl: data.profile_details.profile_image_url,
                shortBio: data.profile_details.short_bio,
            }
            this.setState({ profile: profileData, apiStatus: Status.success })
        }
        else {
            this.setState({ apiStatus: Status.failure })

        }
    }

    renderProfileView = () => {
        const { profile } = this.state
        const { name, profileImageUrl, shortBio } = profile
        return (<>
            <div className='profile-container'>
                <img src={profileImageUrl} alt="profile" className="profile-img" />
                <h1 className="profile-heading">{name}</h1>
                <p className="profile-bio">{shortBio}</p>
            </div>
        </>)

    }
    renderFailureView = () => {
        return (
            <div className="profile-error-view-container">
                <button
                    type="button"
                    id="button"
                    className="profile-failure-button"
                    onClick={this.fetchProfile}
                >
                    Retry
                </button>
            </div>

        )

    }
    renderLoadingView = () => {
        return <h1 className='loading'>Loading...</h1>

    }

    switchOperation = () => {
        const { apiStatus } = this.state
        switch (apiStatus) {
            case (Status.success):
                return this.renderProfileView()
            case (Status.failure):
                return this.renderFailureView()
            case (Status.inProgress):
                return this.renderLoadingView()
            default:
                return null

        }
    }

    render() {

        return (
            <>
                {
                    this.switchOperation()
                }
            </>
        )
    }





}
