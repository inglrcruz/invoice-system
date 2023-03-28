import React from "react"
import '../style.css'
import { Button } from "react-bootstrap"

const NotFound = (props) => {

    const { onClose, title, body } = props

    return (
        <div className="custom-ui">
            <h5><i className="fas fa-info-circle"></i>&nbsp;&nbsp;{title}</h5>
            <img src={require('../../../assets/img/no-results.png')} className="img-fluid no-results" alt="Not Results" />
            <p>{body}</p>
            <Button variant="success" onClick={onClose} className="mr">
                <i className="fas fa-check"></i>&nbsp;&nbsp;Accept
            </Button>
        </div>
    )
}

export default NotFound