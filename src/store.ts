import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { baseAPI } from './services'
export const store = configureStore({
    reducer: {
        [baseAPI.reducerPath]: baseAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([baseAPI.middleware])
})

setupListeners(store.dispatch)