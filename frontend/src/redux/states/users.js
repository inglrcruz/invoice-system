import { createSlice } from '@reduxjs/toolkit'

export const usersState = {
    users: [],
    user: {}
}

export const usersSlice = createSlice({
    name: "users",
    initialState: usersState,
    reducers: {
        setActUsers: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const { setActUsers } = usersSlice.actions