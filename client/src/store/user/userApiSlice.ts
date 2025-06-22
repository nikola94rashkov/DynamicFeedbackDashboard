import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {LoginResponse, User, UserCredentials, UserResponse} from '@/types/user.types'

export const userApiSlice = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/auth',
        credentials: 'include',
    }),
    endpoints: (build) => {
        return {
            createUser: build.mutation<UserResponse, User>({
                query: (user) => ({
                    url: `/register`,
                    method: 'POST',
                    body: {
                        ...user,
                    },
                }),
            }),
            login: build.mutation<LoginResponse, UserCredentials>({
                query: (user) => ({
                    url: '/login',
                    method: 'POST',
                    body: {
                        ...user,
                    },
                }),
            }),
            logout: build.mutation<void, void>({
                query: () => ({
                    url: '/logout',
                    method: 'POST',
                }),
            }),
        }
    },
})

export const { useCreateUserMutation, useLoginMutation, useLogoutMutation } =
    userApiSlice