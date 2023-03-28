import { createSlice } from '@reduxjs/toolkit'

export const invoicesState = {
    list: [],
    inv: {}
}

export const invoicesSlice = createSlice({
    name: "invoices",
    initialState: invoicesState,
    reducers: {
        setActInv: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const { setActInv } = invoicesSlice.actions