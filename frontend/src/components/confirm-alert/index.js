import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import Error from './views/error'
import Option from './views/option'
import NotFound from './views/not-found'

/**
 * Confirmation for errors
 * @param {*} title 
 * @param {*} body 
 */
export const confirmError = (title, body) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <Error onClose={onClose} title={title} body={body} />
            )
        }
    })
}

/**
 * Confirmation for when not found
 * @param {*} title 
 * @param {*} body 
 */
export const confirmNotFound = (title, body) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <NotFound onClose={onClose} title={title} body={body} />
            )
        }
    })
}

/**
 * Confirmation with options
 * @param {*} title 
 * @param {*} body 
 * @param {*} handleAction 
 * @param {*} handleCancel 
 * @param {*} icon 
 */
export const confirmOption = (title, body, handleAction, handleCancel, icon = "fas fa-info-circle") => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <Option onClose={onClose} title={title} body={body} icon={icon} handleAction={handleAction} handleCancel={handleCancel} />
            )
        }
    })
}