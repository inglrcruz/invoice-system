import React, { useEffect, useState } from 'react'
import View from './view'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import usersActions from '../../../redux/actions/users'
import { momentTimeZone, ucwords } from '../../../library/format'
import { confirmOption } from '../../../components/confirm-alert'
import { icons, isActiveStatus } from '../../../library/const'

const Users = ({ auth, users, setUser, setUpdUser, getUsers, setDltUser }) => {
    const initForm = { name: "", username: "", password: "", isActive: false },
        [form, setForm] = useState(initForm),
        [errors, setErrors] = useState({}),
        [search, setSearch] = useState(""),
        [modals, setModals] = useState({ users: false, view: false, title: "", icon: "" }),
        columnsCustomers = [
            {
                name: 'ID#', minWidth: '6%', maxWidth: '6%', selector: (row, key) => key + 1, sortable: true, cell: (row, key) => (
                    <span>{row.usrId}</span>
                )
            }, {
                name: 'Name', minWidth: '44%', maxWidth: '44%', selector: row => row.name, sortable: true, cell: (row, key) => (
                    <span>{ucwords(row.name)}</span>
                )
            }, {
                name: 'Username', minWidth: '13%', maxWidth: '13%', selector: row => row.username, sortable: true, cell: (row, key) => (
                    <span>{row.username}</span>
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
                        <Button variant="secondary" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="View user"
                            data-tooltip-place="left" type="button" onClick={() => handlesSelect(row, "view")}>
                            <i className={icons.file}></i>
                        </Button>&nbsp;&nbsp;
                        <Button variant="info" className="pointer table-btn-opt" size='sm' data-tooltip-id="tooltip" data-tooltip-content="Edit user"
                            data-tooltip-place="left" type="button" onClick={() => handlesSelect(row, "edit")}>
                            <i className={icons.edit}></i>
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" className="pointer table-btn-opt" disabled={auth.usrId === row.usrId} size='sm' data-tooltip-id="tooltip" data-tooltip-content="Delete user"
                            data-tooltip-place="left" type="button"
                            onClick={() => handleRemove(row)}>
                            <i className={icons.trash}></i>
                        </Button>
                    </div>
                )
            }
        ]

    // Get list of users
    useEffect(() => {
        getUsers()
    }, [getUsers])

    // Restart the form when closing the modal
    useEffect(() => {
        if (!modals.users) setForm(initForm)
    }, [modals.users])

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
    * Handles the user save action.
    */
    const handleSave = () => {
        if (handleValidated()) {
            const { uid, name, username, password, isActive } = form
            if (uid) {
                setUpdUser(uid, { name, username, isActive }, () => {
                    setModals({ ...modals, users: false })
                })
            } else {
                setUser({ name, username, password }, () => {
                    setModals({ ...modals, users: false })
                })
            }
        }
    }

    /**
     * Handle select the user to edit or view
     */
    const handlesSelect = (row, type) => {
        if (row.usrId) {
            setForm({
                ...form, uid: row.usrId,
                name: row.name,
                username: row.username,
                isActive: row.isActive,
                created: momentTimeZone(row.createdAt)
            })
            setModals({
                ...modals, users: true, view: (type === "view") ? true : false,
                title: (type === "view") ? "See User" : "Edit User",
                icon: (type === "view") ? icons.file : icons.edit
            })
        }
    }

    /**
    * Handle validate the form
    * @returns
    */
    const handleValidated = () => {
        setErrors({})
        const { name, username, password } = form
        if (!name) { setErrors({ name: true }); return false; }
        else if (!username) { setErrors({ username: true }); return false; }
        else if (!form?.uid && (!password || password.length < 6)) { setErrors({ password: true }); return false; }
        return true
    }

    /**
     * Handle remove user
     * @param {*} row 
     */
    const handleRemove = (row) => {
        confirmOption("Delete User", "Do you really want to delete this user?", (onClose) => {
            setDltUser(row.usrId)
            onClose()
        }, (onClose) => onClose(), icons.trash)
    }

    return (
        <View
            errors={errors} handleSave={handleSave} modals={modals} search={search}
            columnsCustomers={columnsCustomers} setModals={setModals}
            handleChange={handleChange} form={form} users={users} />
    )
}

const mapStateToProps = ({ users, auth }) => ({
    auth,
    users
})

const mapDispatchToProps = () => ({
    ...usersActions
})

export default connect(mapStateToProps, mapDispatchToProps())(Users)