import { get, patch, post, remove, errorRequest } from '../../library/requests'
import { setActCust } from '../states/customers'
import { setConfig } from '../states/config'
import { confirmError } from '../../components/confirm-alert'

/**
 * Add new customer
 * @returns 
 */
const setCustomer = (form, callBack) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth, customers } = getState()
        const res = await post("customer", auth.token, form)
        dispatch(setActCust({ list: [...customers.list, res.data] }))
        callBack()
    } catch (err) {
        if (err?.response?.status === 400) {
            confirmError('Email not available', `The email ${form.emai} is already taken.`)
        } else {
            errorRequest(err)
        }
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

/**
 * Update customer by customer id
 * @returns 
 */
const setUpdCustomer = (cus, form, callBack) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth, customers } = getState(), updatedCust = { ...form }
        updatedCust.isActive = Boolean(updatedCust.isActive)
        await patch(`customer/${cus}`, auth.token, updatedCust)
        const updatedUsers = customers.list.map(cust => cust.cusId === cus ? { ...cust, ...updatedCust } : cust)
        dispatch(setActCust({ list: updatedUsers }))
        callBack()
    } catch (err) {
        errorRequest(err, () => dispatch(setConfig({ loading: false })))
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

/**
 * Get list of customers
 * @returns 
 */
const getCustomers = () => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth } = getState()
        const res = await get("customers", auth.token)
        dispatch(setActCust({ list: res.data }))
    } catch (error) {
        errorRequest(error)
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

/**
 * Update customer by customer id
 * @returns 
 */
const setDltCustomer = (cus) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth, customers } = getState()
        await remove(`customer/${cus}`, auth.token)
        const list = customers.list.filter((r) => r.cusId !== cus)
        dispatch(setActCust({ list }))
    } catch (error) {
        if (error?.response?.status === 400) {
            confirmError('Error deleting client', error?.response?.data.message)
        }
        errorRequest(error);
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

const exportConst = { setCustomer, setUpdCustomer, getCustomers, setDltCustomer }
export default exportConst