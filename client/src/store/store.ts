import { configureStore } from '@reduxjs/toolkit'
import { feedbackApiSlice } from './feedback/feedbackApiSlice'
import { userApiSlice } from './user/userApiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import authSlice from '@/store/auth/authSlice.ts'

export const store = configureStore({
    reducer: {
        [feedbackApiSlice.reducerPath]: feedbackApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        authSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            feedbackApiSlice.middleware,
            userApiSlice.middleware,
        )
    },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch