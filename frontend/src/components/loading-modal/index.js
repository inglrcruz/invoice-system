import React from 'react';
import { PacmanLoader } from "react-spinners";
import './style.css'

const LoadingModal = () => {

    return (
        <div id="loading-modal">
            <div className="modal-content">
                <PacmanLoader color="#fff" />
                <p>Wait a moment please...</p>
            </div>
        </div>
    )
}

export default LoadingModal