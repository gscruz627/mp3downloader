import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import authReducer from "../store"
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider } from "react-redux"
import storage from 'redux-persist/lib/storage'
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist"
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = { key: "root", storage, version: 1 }
const presistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore( {
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  )
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
