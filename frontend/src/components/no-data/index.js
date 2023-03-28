import React from 'react';
import './style.css'

const NoData = (props) => {

    const { text } = props

    return (
        <p id="no-data">
            <img className="avatar-img" src={require('../../assets/img/no-data.png')} alt="" />
            <span>{text ? text : "There are no records to show"}</span>
        </p>
    )
}

export default NoData