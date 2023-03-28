import React, { useEffect } from 'react';
import View from './view';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { confirmOption } from '../../components/confirm-alert'

const Header = ({ auth }) => {

    const navigate = useNavigate()

    // Check if the user exists
    useEffect(() => { if (!auth.token) navigate("/") }, [auth, navigate])

    /**
     * Handle show signOut
     */
    const handleShowSignOut = () => {
        confirmOption("Cerrar Sesión", "¿Realmente quieres cerrar la sesión?", () => {
            localStorage.clear()
            sessionStorage.clear()
            navigate(0)
        }, (onClose) => onClose(),  "fas fa-sign-out-alt")
    }

    return (
        <View auth={auth} handleShowSignOut={handleShowSignOut} />
    )
}

const mapStateToProps = ({ auth }) => ({
    auth
})

const mapDispatchToProps = () => ({ })

export default connect(mapStateToProps, mapDispatchToProps())(Header)