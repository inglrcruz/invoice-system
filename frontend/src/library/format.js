import { appName } from "./const"
import momentTz from 'moment-timezone'

/**
 * 
 * @param {*} str 
 * @param {*} targetLength 
 * @param {*} padString 
 * @returns 
 */
export const padStart = (str, targetLength = 7, padString = 0) => {
    return String(str).padStart(targetLength, padString)
}

/**
 * Currency text to currency format
 * @param {*} n 
 * @param {*} currency 
 * @returns 
 */
export const currency = (n, currency) => {
    return currency + "" + parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

/**
 * Converts the first letter of each word to uppercase
 * @param {*} str 
 * @returns 
 */
export const ucwords = (str) => {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) { return $1.toUpperCase() })
}

/**
 * Removes all characters other than a number
 * @param {*} str 
 * @returns 
 */
export const cleanNumber = (str) => {
    return String(str).replace(/[^0-9.]/g, '')
}

/**
 * Convert text to numeric format
 * @param {*} n 
 * @returns 
 */
export const numFormat = (n) => {
    return new Intl.NumberFormat("en-IN").format(n)
}

/**
 * Change title
 * @param {*} title 
 */
export const changeTitle = (title) => {
    document.title = `${appName} | ${title}`
}

/**
 * Returns the date formatted with the time zone
 * @param {*} date 
 * @param {*} format 
 * @param {*} timezone 
 * @returns 
 */
export const momentTimeZone = (date, format = "MM/DD/YYYY hh:mm A", timezone = "") => {
    return (timezone) ? momentTz(date).tz(timezone).format(format) : momentTz(date).format(format)
}

/**
 * Export array to CSV
 * @param {*} array 
 * @param {*} head 
 */
export const exportCSV = (array, head, exclude = [], name = momentTimeZone(new Date(), "YYYY_MM_DD_HH_mm")) => {
    const arr = Array.isArray(array) ? array : JSON.parse(array)
    const newArray = (exclude.length) ? arr.map(obj => Object.fromEntries(Object.entries(obj).filter(([key]) => !exclude.includes(key)))) : arr
    const csvContent = `${head}\r\n${newArray.map((item) => Object.values(item).join(',')).join('\r\n')}`
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent))
    element.setAttribute('download', `${name}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}