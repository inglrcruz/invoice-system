import React from "react"
import { Link } from "react-router-dom"
import { ucwords } from "../../library/format"
import "./style.css"

const view = (props) => {

    const { auth, handleShowSignOut } = props

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <a href="/" className="logo d-flex align-items-center">
                    <img src={require('../../assets/img/logo700x160.png')} className="img-fluid" alt="MofetaPOS Logo" />
                </a>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>
            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    {
                        auth.role === "seller" && <li className="nav-item profile-name">
                            <span className="nav-link nav-profile d-flex align-items-center pe-0">
                                <span className="d-none d-md-block">
                                    <i className="fas fa-store-alt"></i>&nbsp;&nbsp;{ucwords(auth?.branch?.name)}
                                </span>
                            </span>
                        </li>
                    }
                    <li className="nav-item profile-name">
                        <span className="nav-link nav-profile d-flex align-items-center pe-0">
                            <span className="d-none d-md-block">
                                <i className="fas fa-user"></i>&nbsp;&nbsp;{ucwords(auth.name)}
                            </span>
                        </span>
                    </li>
                    {/* Sign off */}
                    <li className="nav-item dropdown">
                        <Link className="nav-link nav-icon" to="#" onClick={handleShowSignOut}>
                            <i className="fas fa-sign-out-alt"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default view