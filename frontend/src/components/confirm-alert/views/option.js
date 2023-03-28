import React from "react"
import '../style.css'
import { Button } from "react-bootstrap"

const Option = (props) => {

    const { onClose, title, body, handleAction, handleCancel, icon } = props

    return (
        <div className="custom-ui">
            <h5><i className={icon}></i>&nbsp;&nbsp;{title}</h5>
            <p>{body}</p>
            <Button variant="success" onClick={() => handleAction(onClose)} className="mr">
                <i className="fas fa-check"></i>&nbsp;&nbsp;Accept
            </Button>
            <Button variant="secondary" onClick={() => handleCancel(onClose)} className="mr">
                <i className="fas fa-times"></i>&nbsp;&nbsp;Cancel
            </Button>
        </div>
    )
}

export default Option