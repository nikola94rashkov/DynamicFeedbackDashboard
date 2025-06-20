import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserCookie } from '@/types/user.types'
import type { AppDispatch } from '@/store/store'

const loadUserFromLocalStorage = (): UserCookie | null => {
    if (typeof window === 'undefined') return null

    const storedUser = localStorage.getItem('user')

    if (!storedUser) return null

    try {
        return JSON.parse(storedUser) as UserCookie
    } catch (error) {
        console.error('Failed to parse user data from localStorage', error)
        localStorage.removeItem('user')
        return null
    }
}

interface AuthState {
    user: UserCookie | null
    isLoading: boolean
}

const initialState: AuthState = {
    user: loadUserFromLocalStorage(),
    isLoading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserCookie>) => {
            const userData = action.payload
            localStorage.setItem('user', JSON.stringify(userData))
            state.user = userData
        },
        clearUser: (state) => {
            localStorage.removeItem('user')
            state.user = null
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    },
})

export const { setUser, clearUser, setLoading } = authSlice.actions

export const initializeAuth = () => (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    const user = loadUserFromLocalStorage()

    if (!user) return

    dispatch(authSlice.actions.setUser(user))
    dispatch(setLoading(false))
}

export default authSlice.reducer