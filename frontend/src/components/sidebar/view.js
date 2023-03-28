import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const view = (props) => {

    const { pathname, link, active, setActive } = props, path = pathname.split("/")

    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    {
                        link.map((row, key) => {
                            return (
                                (row.children?.length) ?
                                    <li className="nav-item" key={key} onClick={() => setActive(key)}>
                                        <Link className={(path.includes(row.path)) ? "nav-link" : "nav-link collapsed"} to="#">
                                            <i className={row.icon}></i>
                                            <span>{row.name}</span>
                                            <i className="fas fa-angle-down"></i>
                                        </Link>
                                        <ul id="components-nav" className={`nav-content collapse${((active === key || path.includes(row.parent)) ? " show" : "")}`}>
                                            {
                                                row.children.map((r, k) => {
                                                    return (
                                                        <li key={k}>
                                                            <Link to={r.path} className="active">
                                                                <i className="far fa-circle"></i><span>{r.name}</span>
                                                            </Link>
                                                        </li>)
                                                })
                                            }
                                        </ul>
                                    </li>
                                    :
                                    <li className="nav-item" key={key}>
                                        <Link className={(pathname === row.path) ? "nav-link" : "nav-link collapsed"} to={row.path}>
                                            <i className={row.icon}></i>
                                            <span>{row.name}</span>
                                        </Link>
                                    </li>
                            )
                        })
                    }
                </ul>
            </aside>
        </>
    )
}

export default view