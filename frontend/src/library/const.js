const
    appName = process.env.REACT_APP_NAME,
    footer = `© Copyright ${new Date().getFullYear()} ${appName} All rights reserved. Version ${process.env.REACT_APP_VERSION}`,
    paginationOptions = { rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de' },
    rate = 0.18,
    statusFormat = {
        open: { text: "Open", color: "advertising-blue" },
        paid: { text: "Paid", color: "dark-green" },
        cancelled: { text: "Cancelled", color: "vivid-red" },
        sent: { text: "Sent", color: "adonis-rose-yellow" },
    },
    isActiveStatus = [{
        text: "Inactive",
        color: "vivid-red"
    }, {
        text: "Active",
        color: "dark-green"
    }],
    statusList = ["open", "paid", "cancelled", "sent"],
    icons = {
        file: 'far fa-file-alt',
        edit: 'fas fa-edit',
        trash: 'far fa-trash-alt',
        user: 'fas fa-user',
        userPlus: 'fas fa-user-plus',
        plus: 'fas fa-plus',
        save: 'fas fa-save',
        times: 'fas fa-times',
        search: 'fas fa-search',
        userTag: 'fas fa-user-tag',
        usersCog: 'fas fa-users-cog',
        userCog: 'fas fa-user-cog',
        unlock: 'fas fa-unlock-alt',
        invoiceDollar: 'fas fa-file-invoice-dollar',
        arrowAltLeft: 'fas fa-long-arrow-alt-left'
    }

module.exports = { appName, footer, paginationOptions, icons, rate, statusFormat, statusList, isActiveStatus }