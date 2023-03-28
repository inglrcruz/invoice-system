import axios from 'axios'
import { confirmError } from '../components/confirm-alert';

const url = process.env.REACT_APP_URL

/**
 * Request to perform pos
 * @param {*} route 
 * @param {*} token 
 * @param {*} params 
 * @returns 
 */
export const post = (route, token, params) => {
    try {
        if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axios.post(url + route, params)
    } catch (error) {
        this.error(error)
    }
}

/**
 * Request to perform patch
 * @param {*} route 
 * @param {*} token 
 * @param {*} params 
 * @returns 
 */
export const patch = (route, token, params) => {
    try {
        if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axios.patch(url + route, params)
    } catch (error) {
        this.error(error)
    }
}

/**
 * Request to perform get
 * @param {*} route 
 * @param {*} token 
 * @returns 
 */
export const get = (route, token) => {
    try {
        if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axios.get(url + route)
    } catch (error) {
        this.error(error)
    }
}

/**
 * Request to perform delete
 * @param {*} route 
 * @param {*} token 
 * @param {*} params 
 * @returns 
 */
export const remove = (route, token) => {
    try {
        if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axios.delete(url + route)
    } catch (error) {
        this.error(error)
    }
}

/**
 * If there is any error
 * @param {*} err 
 * @param {*} callBack 
 */
export const errorRequest = (err) => {
    if (err.response?.data?.statusCode === 401) {
        localStorage.clear()
        sessionStorage.clear()
    } else if (err.response?.status === 500) {
        confirmError("Connection not established", "Something went wrong on the server. Please contact the support team for help.")
    }
}