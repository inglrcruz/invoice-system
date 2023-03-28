import React, { useEffect, useState } from 'react';
import View from './view';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import authActions from '../../redux/actions/auth'
import { changeTitle } from '../../library/format';

const SignIn = ({ auth, setAuth }) => {

    const [errors, setErrors] = useState({}),
        [form, setForm] = useState({ username: "", password: "" }),
        navigate = useNavigate()

    // Redirect user
    useEffect(() => {
        changeTitle("Log in")
        if (auth.token) navigate("/invoices")
    }, [auth, navigate])

    /**
     * Handle authenticates the user by credentials
     */
    const handleSignIn = () => {
        if (handleValidated()) {
            setAuth({ username: form.username, password: form.password })
        }
    }

    /**
     * Updates the form state with the event value.
     * @param evt 
     */
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setForm({ ...form, [name]: value })
    }

    /**
     * Handle validate the form
     * @returns 
     */
    const handleValidated = () => {
        setErrors({})
        const { username, password } = form
        if (!username) { setErrors({ username: true }); return false; }
        else if (!password) { setErrors({ password: true }); return false; }
        return true;
    }

    return (
        <View form={form} errors={errors} handleChange={handleChange} handleSignIn={handleSignIn} />
    )
}

const mapStateToProps = ({ auth }) => ({
    auth
})

const mapDispatchToProps = () => ({
    ...authActions
})

export default connect(mapStateToProps, mapDispatchToProps())(SignIn)