import React, { useEffect, useState } from 'react'
import View from './view'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import invActions from '../../../redux/actions/invoices'
import custActions from '../../../redux/actions/customers'
import { cleanNumber, currency, momentTimeZone, numFormat, padStart } from '../../../library/format'
import { confirmOption } from '../../../components/confirm-alert'
import { icons, rate, statusFormat, statusList } from '../../../library/const'

const Invoices = ({ invoices, customers, setInvoice, setUpdInvoice, getInvoices, setDltInvoice, getCustomers }) => {

    const initForm = {
        customer: null, price: "", qty: "", description: "", note: "",
        subTotal: 0, total: 0, itbis: 0, itemKey: -1, status: null,
        itemsDelete: [], invId: null
    }, initModal = { invoice: false, view: false, data: {}, title: "", icon: "" },
        [form, setForm] = useState(initForm),
        [errors, setErrors] = useState({}),
        [options, setOptions] = useState({ customers: [], status: [] }),
        [items, setItems] = useState([]),
        [search, setSearch] = useState(""),
        [modals, setModals] = useState(initModal),
        columnsInvoices = [
            {
                name: 'Invoice Date', minWidth: '20%', maxWidth: '20%', selector: row => momentTimeZone(row.createdAt, "MM/DD/YYYY"), sortable: true, cell: (row, key) => (
                    <span>{momentTimeZone(row.createdAt, "MM/DD/YYYY")}</span>
                )
            }, {
                name: 'Invoice Number', minWidth: '20%', maxWidth: '20%', selector: row => padStart(row.invId), sortable: true, cell: (row, key) => (
                    <span>{padStart(row.invId)}</span>
                )
            }, {
                name: 'Customer Name', minWidth: '20%', maxWidth: '20%', selector: row => row.cusId?.name, sortable: true, cell: (row, key) => (
                    <span>{row.cusId?.name}</span>
                )
            }, {
                name: 'Status', minWidth: '15%', maxWidth: '15%', selector: row => row.status, sortable: true, cell: (row, key) => (
                    <span className={statusFormat[row?.status].color}>{statusFormat[row?.status].text}</span>
                )
            }, {
                name: 'Total Amount', minWidth: '13%', maxWidth: '13%', selector: row => row.total, sortable: true, cell: row => (
                    <span>{currency(row.total, "$ ")}</span>
                )
            }, {
                name: '', minWidth: '12%', maxWidth: '12%', cell: row => (
                    <div style={{ width: "100%", textAlign: 'end' }}>
                        <Button variant="secondary" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="View Invoice"
                            data-tooltip-place="left" type="button" onClick={() => handlesSelect(row, "view")}>
                            <i className={icons.file}></i>
                        </Button>&nbsp;&nbsp;
                        <Button variant="info" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="Edit Invoice"
                            data-tooltip-place="left" type="button" onClick={() => handlesSelect(row, "edit")}>
                            <i className={icons.edit}></i>
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="Delete Invoice"
                            data-tooltip-place="left" type="button"
                            onClick={() => handleRemove(row)}>
                            <i className={icons.trash}></i>
                        </Button>
                    </div>
                )
            }
        ], columnsItems = [
            {
                name: 'Item Description', minWidth: '35%', maxWidth: '35%', selector: row => row.description, sortable: true, cell: (row, key) => (
                    <span>{row.description}</span>
                )
            }, {
                name: 'QTY', minWidth: '15%', maxWidth: '15%', selector: row => row.qty, sortable: true, cell: (row, key) => (
                    <span>{numFormat(row.qty)}</span>
                )
            }, {
                name: 'Price', minWidth: '15%', maxWidth: '15%', selector: row => row.price, sortable: true, cell: (row, key) => (
                    <span>{currency(row.price, "$ ")}</span>
                )
            }, {
                name: 'Total', minWidth: '20%', maxWidth: '20%', selector: row => row.total, sortable: true, cell: (row, key) => (
                    <span>{currency(row.total, "$ ")}</span>
                )
            }, {
                name: '', minWidth: '15%', maxWidth: '15%', cell: (row, key) => (
                    <div style={{ width: "100%", textAlign: 'end' }}>
                        <Button variant="info" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="Edit item"
                            data-tooltip-place="left" type="button" onClick={() => handleItems("select", key)}>
                            <i className={icons.edit}></i>
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="Delete item"
                            data-tooltip-place="left" type="button"
                            onClick={() => handleItems("remove", key)}>
                            <i className={icons.trash}></i>
                        </Button>
                    </div>
                )
            }
        ]

    // Get list of customers
    useEffect(() => {
        getInvoices()
        getCustomers()
    }, [getInvoices, getCustomers])

    // Get list of customers
    useEffect(() => {
        if (customers.list) {
            const custs = []
            customers.list.forEach(r => {
                if (r.isActive) {
                    custs.push({
                        value: r.cusId, label: r.name, name: r.name, phone: r.phone, email: r.email,
                        address1: r.address1, address2: r.address2, city: r.city, state: r.state, zip: r.zip
                    })
                }
            })
            const status = statusList.map(r => ({ value: r.toLocaleLowerCase(), label: statusFormat[r].text }))
            setOptions({ customers: custs, status })
        }
    }, [customers.list])

    // Restart the form state
    useEffect(() => {
        if (!modals.invoice) {
            setForm(initForm)
            setItems([])
            setErrors([])
            setModals(initModal)
        }
    }, [modals.invoice])

    // Add the total of the items
    useEffect(() => {
        const subTotal = items.reduce((a, b) => a + (b.qty * b.price), 0), itbis = subTotal * rate
        setForm({ ...form, subTotal, itbis, total: subTotal + itbis })
    }, [items])

    /**
     * Updates the form state with the event value.
     * @param {Event} evt
     * @param {string} [opt=""]
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
    const handleValidated = (type = "") => {
        setErrors({})
        const { customer, description, qty, price } = form
        if (type === "item") {
            if (!description) { setErrors({ description: true }); return false; }
            else if (!qty) { setErrors({ qty: true }); return false; }
            else if (!price) { setErrors({ price: true }); return false; }
        } else {
            if (!customer) { setErrors({ customer: true }); return false; }
            else if (!items.length) { setErrors({ description: true }); return false; }
        }
        return true
    }

    /**
    * Handle save customer
    */
    const handleSave = () => {
        if (handleValidated()) {
            const { invId, subTotal, itbis, total, note, customer, itemsDelete, status } = form
            if (invId) {
                setUpdInvoice(invId, {
                    cusId: customer.value, subTotal, itbis, total, note,
                    items, status: status.value, itemsDelete
                }, () => {
                    setModals({ ...modals, invoice: false })
                })
            } else {
                setInvoice({ cusId: customer.value, subTotal, itbis, total, note, items }, () => {
                    setModals({ ...modals, invoice: false })
                })
            }
        }
    }

    /**
     * Handle view or edit customer
     */
    const handlesSelect = (row, type) => {
        if (row.invId) {
            const { cusId, name, phone, email, address1, address2, city, state, zip } = row.cusId
            setForm({
                ...form,
                invId: row.invId,
                note: row.note,
                status: { value: row.status, label: statusFormat[row.status].text },
                customer: { value: cusId, label: name, name, phone, email, address1, address2, city, state, zip },
                created: row.createdAt
            })
            setItems(row.items)
        }
        setModals({
            ...modals, invoice: true, view: (type === "view") ? true : false,
            title: (type === "view") ? "View Invoice" : `Edit Invoice ID# ${row.invId}`,
            icon: (type === "view") ? icons.file : icons.edit,
            data: (type === "view") ? row : {}
        })
    }

    /**
     * Handle remove invoice
     * @param {*} row 
     */
    const handleRemove = (row) => {
        confirmOption("Delete Invoice", "Do you really want to delete this invoice?", (onClose) => {
            setDltInvoice(row.invId)
            onClose()
        }, (onClose) => onClose(), icons.trash)
    }

    /**
     * Handle add, edit or delete item
     * @param {*} type 
     * @param {*} key 
     */
    const handleItems = (actionType, key = -1) => {
        const { description, qty, price, itemKey } = form;
        if (actionType === "add") {
            if (handleValidated("item")) {
                const newItem = {
                    description,
                    qty: cleanNumber(qty),
                    price: cleanNumber(price),
                    total: cleanNumber(price) * cleanNumber(qty)
                }
                const updatedItems = itemKey < 0 ? [...items, newItem] : [...items.slice(0, itemKey), { ...newItem }, ...items.slice(itemKey + 1)]
                setItems(updatedItems)
                setForm({ ...form, description: "", qty: "", price: "", itemKey: -1 })
            }
        } else if (actionType === "select") {
            const { description, qty, price } = items[key]
            setForm({ ...form, description, qty, price, itemKey: key })
        } else if (actionType === "remove") {
            confirmOption("Delete Item", "Do you really want to delete this item?", (onClose) => {
                if (items[key]?.itmId) setForm({ ...form, itemsDelete: [...form.itemsDelete, items[key].itmId] })
                const updatedItems = items.filter((r, k) => k !== key)
                setItems(updatedItems)
                onClose()
            }, (onClose) => onClose(), icons.trash)
        }
    }

    return (
        <View
            errors={errors} handleSave={handleSave} modals={modals} search={search} columnsInvoices={columnsInvoices}
            setModals={setModals} handleItems={handleItems} handleChange={handleChange} form={form} invoices={invoices}
            columnsItems={columnsItems} options={options} items={items} />
    )
}

const mapStateToProps = ({ invoices, customers }) => ({
    invoices,
    customers
})

const mapDispatchToProps = () => ({
    ...invActions,
    ...custActions
})

export default connect(mapStateToProps, mapDispatchToProps())(Invoices)