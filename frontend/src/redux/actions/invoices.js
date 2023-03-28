import { get, patch, post, remove, errorRequest } from '../../library/requests'
import { setActInv } from '../states/invoices'
import { setConfig } from '../states/config'
import { confirmError } from '../../components/confirm-alert'

/**
 * Add new invoice
 * @returns 
 */
const setInvoice = (form, callBack) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth, invoices } = getState()
        const res = await post("invoice", auth.token, form)
        const list = invoices.list
        dispatch(setActInv({ list: [...list, res.data] }))
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
 * Update invoice by invoice id
 * @returns 
 */
const setUpdInvoice = (invoiceId, form, callBack) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth, invoices } = getState()
        await patch(`invoice/${invoiceId}`, auth.token, form)
        const updatedInvoiceList = invoices.list.map((invoice) =>
            invoice.invId === invoiceId ? {
                ...invoice,
                items: form.items,
                status: form.status,
                subTotal: form.subTotal,
                note: form.note,
                total: form.total,
                itbis: form.itbis,
            } : invoice
        )
        dispatch(setActInv({ list: updatedInvoiceList }))
        callBack()
    } catch (err) {
        errorRequest(err)
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}


/**
 * Get list of invoices
 * @returns 
 */
const getInvoices = () => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth } = getState()
        const res = await get("invoices", auth.token)
        dispatch(setActInv({ list: res.data }))
    } catch (errorRequest) {
        errorRequest(errorRequest)
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

/**
 * Update invoice by invoice id
 * @returns 
 */
const setDltInvoice = (invId) => async (dispatch, getState) => {
    try {
        dispatch(setConfig({ loading: true }))
        const { auth, invoices } = getState()
        await remove(`invoice/${invId}`, auth.token)
        const list = invoices.list.filter((r) => r.invId !== invId)
        dispatch(setActInv({ list }))
    } catch (err) {
        errorRequest(err);
    } finally {
        dispatch(setConfig({ loading: false }))
    }
}

const exportConst = { setInvoice, setUpdInvoice, getInvoices, setDltInvoice }
export default exportConst