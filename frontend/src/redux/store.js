import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { authSlice } from './states/auth'
import { usersSlice } from './states/users'
import { configSlice } from './states/config'
import { customersSlice } from './states/customers'
import { invoicesSlice } from './states/invoices'

const persistConfig = {
  key: "insysRoot",
  version: 1,
  storage,
  // if you do not want to persist this part of the state
  blacklist: ['users', 'config', 'customers']
}

const reducer = combineReducers({
  auth: authSlice.reducer,
  // not persisting this reducer
  config: configSlice.reducer,
  users: usersSlice.reducer,
  customers: customersSlice.reducer,
  invoices: invoicesSlice.reducer,
})

// this ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store;