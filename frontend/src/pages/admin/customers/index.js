import React, { useEffect, useState } from 'react'
import View from './view'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import custActions from '../../../redux/actions/customers'
import invActions from '../../../redux/actions/invoices'
import { currency, momentTimeZone, padStart, ucwords } from '../../../library/format'
import { confirmOption } from '../../../components/confirm-alert'
import { icons, isActiveStatus, statusFormat } from '../../../library/const'

const Customers = ({ customers, setCustomer, setUpdCustomer, getCustomers, setDltCustomer, setDltInvoice }) => {

    const initForm = {
        cusId: "", name: "", phone: "", email: "", address1: "", zip: "",
        address2: "", city: "", state: "", isActive: true
    }, initModal = { customer: false, view: false, invoice: false, data: {}, title: "", icon: "" },
        [form, setForm] = useState(initForm),
        [errors, setErrors] = useState({}),
        [custList, setCustList] = useState([]),
        [search, setSearch] = useState(""),
        [modals, setModals] = useState(initModal),
        columnsCustomers = [
            {
                name: 'ID#', minWidth: '6%', maxWidth: '6%', selector: (row, key) => key + 1, sortable: true, cell: (row, key) => (
                    <span>{row.cusId}</span>
                )
            }, {
                name: 'Name', minWidth: '25%', maxWidth: '25%', selector: row => row.name, sortable: true, cell: (row, key) => (
                    <span>{ucwords(row.name)}</span>
                )
            }, {
                name: 'Phone', minWidth: '12%', maxWidth: '12%', selector: row => row.phone, sortable: true, cell: (row, key) => (
                    <span>{row.phone}</span>
                )
            }, {
                name: 'Email', minWidth: '20%', maxWidth: '20%', selector: row => row.email, sortable: true, cell: (row, key) => (
                    <span>{row.email}</span>
                )
            }, {
                name: 'Status', minWidth: '10%', maxWidth: '10%', selector: row => row.isActive, sortable: true, cell: row => (
                    <span className={isActiveStatus[Number(row.isActive)].color}>{isActiveStatus[Number(row.isActive)].text}</span>
                )
            }, {
                name: 'Created', minWidth: '15%', maxWidth: '15%', selector: row => row.createdAt, sortable: true, cell: row => (
                    <span>{momentTimeZone(row.createdAt)}</span>
                )
            }, {
                name: '', minWidth: '12%', maxWidth: '12%', cell: row => (
                    <div style={{ width: "100%", textAlign: 'end' }}>
                        <Button variant="secondary" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="View customer"
                            data-tooltip-place="left" type="button" onClick={() => handlesSelect(row, "view")}>
                            <i className={icons.file}></i>
                        </Button>&nbsp;&nbsp;
                        <Button variant="info" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="Edit customer"
                            data-tooltip-place="left" type="button" onClick={() => handlesSelect(row, "edit")}>
                            <i className={icons.edit}></i>
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="Delete customer"
                            data-tooltip-place="left" type="button"
                            onClick={() => handleRemove(row)}>
                            <i className={icons.trash}></i>
                        </Button>
                    </div>
                )
            }
        ], columnsInv = [
            {
                name: 'Date', minWidth: '20%', maxWidth: '20%', selector: row => row.createdAt, sortable: true, cell: (row, key) => (
                    <span>{momentTimeZone(row.createdAt, "MM/DD/YYYY")}</span>
                )
            }, {
                name: 'Number #', minWidth: '25%', maxWidth: '25%', selector: row => row.name, sortable: true, cell: (row, key) => (
                    <span>{padStart(row.invId, 7, 0)}</span>
                )
            }, {
                name: 'Status', minWidth: '20%', maxWidth: '20%', selector: row => row.phone, sortable: true, cell: (row, key) => (
                    <span className={statusFormat[row.status].color}>{statusFormat[row.status].text}</span>
                )
            }, {
                name: 'Total Amount', minWidth: '20%', maxWidth: '20%', selector: row => row.subTotal + row.itbis, sortable: true, cell: (row, key) => (
                    <span>{currency(row.subTotal + row.itbis, "$ ")}</span>
                )
            }, {
                name: '', minWidth: '15%', maxWidth: '15%', cell: row => (
                    <div style={{ width: "100%", textAlign: 'end' }}>
                        <Button variant="secondary" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="View customer"
                            data-tooltip-place="left" type="button" onClick={() => handleViewInvoice(row)}>
                            <i className={icons.file}></i>
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="Delete customer"
                            data-tooltip-place="left" type="button"
                            onClick={() => handleRemoveInvoice(row)}>
                            <i className={icons.trash}></i>
                        </Button>
                    </div>
                )
            }
        ]

    // Get list of customers
    useEffect(() => {
        getCustomers()
    }, [getCustomers])

    // Store customer list
    useEffect(() => {
        if (customers.list) setCustList(customers.list)
    }, [customers.list])

    // Restart the form state
    useEffect(() => {
        if (!modals.customer) {
            setForm(initForm)
            setModals(initModal)
        }
    }, [modals.customer])

    /**
     * Handle change input
     * @param evt
     */
    const handleChange = (evt, opt = "") => {
        if (opt) {
            setForm({ ...form, [opt]: evt })
        } else {
            const { name, value } = evt.target
            if (name === "search")
                setSearch(value)
            else
                setForm({ ...form, [name]: value })
        }
    }

    /**
    * Handle validate the form
    * @returns
    */
    const handleValidated = () => {
        setErrors({})
        const { name, phone, email, address1, address2, city, state, zip } = form
        if (!name) { setErrors({ name: true }); return false; }
        else if (!phone) { setErrors({ phone: true }); return false; }
        else if (!email) { setErrors({ email: true }); return false; }
        else if (!address1) { setErrors({ address1: true }); return false; }
        else if (!address2) { setErrors({ address2: true }); return false; }
        else if (!city) { setErrors({ city: true }); return false; }
        else if (!state) { setErrors({ state: true }); return false; }
        else if (!zip) { setErrors({ zip: true }); return false; }
        return true
    }

    /**
    * Handle save customer
    */
    const handleSave = () => {
        if (handleValidated()) {
            const { cusId, name, phone, email, address1, address2, city, state, zip, isActive } = form
            if (cusId) {
                setUpdCustomer(cusId, { name, phone, address1, zip, address2, city, state, isActive }, () => {
                    setModals({ ...modals, customer: false })
                })
            } else {
                setCustomer({ name, phone, email, address1, zip, address2, city, state }, () => {
                    setModals({ ...modals, customer: false })
                })
            }
        }
    }

    /**
     * Handle view or edit customer
     */
    const handlesSelect = (row, type) => {
        if (row.cusId) {
            setForm({
                ...form, cusId: row.cusId,
                name: row.name,
                phone: row.phone,
                email: row.email,
                address1: row.address1,
                address2: row.address2,
                city: row.city,
                state: row.state,
                zip: row.zip,
                isActive: row.isActive,
                created: momentTimeZone(row.createdAt)
            })
        }
        setModals({
            ...modals, customer: true, view: (type === "view") ? true : false,
            title: (type === "view") ? "View Customer" : `Edit Customer ID# ${row.cusId}`,
            icon: (type === "view") ? icons.file : icons.edit,
            data: (type === "view") ? row : {}
        })
    }

    /**
     * Handle view invoice
     * @param {*} row 
     */
    const handleViewInvoice = (row) => {
        setModals({ ...modals, view: false, invoice: true, data: { ...modals.data, inv: row } })
    }

    /**
     * Handle remove customer
     * @param {*} row 
     */
    const handleRemove = (row) => {
        confirmOption("Delete customer", "Do you really want to delete this customer?", (onClose) => {
            setDltCustomer(row.cusId)
            onClose()
        }, (onClose) => onClose(), icons.trash)
    }

    /**
     * Handle remove invoice
     * @param {*} row 
     */
    const handleRemoveInvoice = (row) => {
        confirmOption("Delete Invoice", "Do you really want to delete this invoice?", (onClose) => {
            setDltInvoice(row.invId)
            const list = []
            let key = null
            custList.forEach((r, k) => {
                if (r.cusId === modals.data.cusId) {
                    key = k
                    list.push({ ...r, invoices: modals.data.invoices.filter(r => r.invId !== row.invId) })
                } else {
                    list.push(r)
                }
            })
            setCustList(list)
            setModals({ ...modals, data: list[key] })
            onClose()
        }, (onClose) => onClose(), icons.trash)
    }

    return (
        <View
            errors={errors} handleSave={handleSave} modals={modals} search={search} columnsCustomers={columnsCustomers}
            setModals={setModals} handleChange={handleChange} form={form} columnsInv={columnsInv} custList={custList} />
    )
}

const mapStateToProps = ({ invoices, customers }) => ({
    invoices,
    customers
})

const mapDispatchToProps = () => ({
    ...custActions,
    ...invActions
})

export default connect(mapStateToProps, mapDispatchToProps())(Customers)