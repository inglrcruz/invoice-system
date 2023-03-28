import React, { useEffect, useState } from 'react';
import View from './view';
import { useLocation } from "react-router-dom";
import { changeTitle } from '../../library/format';
import { icons } from '../../library/const';

const Sidebar = () => {

    const location = useLocation(),
        [active, setActive] = useState(null),
        link = [{
            icon: icons.invoiceDollar,
            name: "Invoices",
            path: "/invoices"
        }, {
            icon: icons.userTag,
            name: "Customers",
            path: "/customers"
        }, {
            icon: icons.usersCog,
            name: "Users",
            path: "/users"
        }], pathname = location.pathname

    // Change title
    useEffect(() => {
        const page = link.find(r => r.path === pathname)
        changeTitle((page) ? page.name : "")
    }, [])

    return (
        <View pathname={pathname} link={link} active={active} setActive={setActive} />
    )
}

export default Sidebar