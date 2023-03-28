import { get, patch, post, remove, errorRequest } from '../../library/requests'
import { setActUsers } from '../states/users'
import { setActAuth } from '../states/auth'
import { setConfig } from '../states/config'
import { confirmError } from '../../components/confirm-alert'

/**
 * Add new user
 * @returns 
 */
const setUser = (form, callBack) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth, users } = getState()
        const res = await post("user", auth.token, form)
        dispatch(setActUsers({ users: [...users.users, res.data] }))
        callBack()
    } catch (err) {
        if (err?.response?.status === 400) {
            confirmError('User not available', `The username ${form.username} is already taken.`)
        } else {
            errorRequest(err)
        }
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

/**
 * Update user by user id
 * @returns 
 */
const setUpdUser = (uid, form, callBack) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth, users } = getState(), updatedUser = { ...form }
        updatedUser.isActive = Boolean(updatedUser.isActive)
        await patch(`user/${uid}`, auth.token, updatedUser)
        const updatedUsers = users.users.map(user => user.usrId === uid ? { ...user, ...updatedUser } : user)
        dispatch(setActUsers({ users: updatedUsers }))
        callBack()
    } catch (err) {
        errorRequest(err, () => dispatch(setConfig({ loading: false })))
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

/**
 * Update profile by user id
 * @returns 
 */
const setUpdProfile = (uid, form) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth } = getState()
        await patch(`user/${uid}`, auth.token, form)
        dispatch(setActAuth({ name: form.name }))
    } catch (err) {
        errorRequest(err)
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

/**
 * Get list of users
 * @returns 
 */
const getUsers = () => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth } = getState()
        const res = await get("users", auth.token)
        dispatch(setActUsers({ users: res.data }))
    } catch (errorRequest) {
        errorRequest(errorRequest)
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

/**
 * Get user by id
 * @returns 
 */
const getUser = () => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth } = getState()
        const res = await get(`user/${auth.usrId}`, auth.token)
        dispatch(setActUsers({ user: res.data }))
    } catch (errorRequest) {
        errorRequest(errorRequest)
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

/**
 * Update user by user id
 * @returns 
 */
const setDltUser = (uid) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth, users } = getState()
        await remove(`user/${uid}`, auth.token)
        const list = users.users.filter((r) => r.usrId !== uid)
        dispatch(setActUsers({ users: list }))
    } catch (errorRequest) {
        errorRequest(errorRequest);
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}


const exportConst = { setUser, setUpdUser, getUsers, setDltUser, getUser, setUpdProfile }
export default exportConst