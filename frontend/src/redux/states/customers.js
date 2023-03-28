import { createSlice } from '@reduxjs/toolkit'

export const customersState = {
    list: [],
    cust: {}
}

export const customersSlice = createSlice({
    name: "customers",
    initialState: customersState,
    reducers: {
        setActCust: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const { setActCust } = customersSlice.actions