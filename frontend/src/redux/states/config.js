import { createSlice } from '@reduxjs/toolkit'

export const configState = {
    loading: false
}

export const configSlice = createSlice({
    name: "config",
    initialState: configState,
    reducers: {
        setConfig: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const { setConfig } = configSlice.actions