export type User = {
    firstName: string
    lastName: string
    password: string
    email: string
    role: number
    date: Date
}

export type UserDocument = Omit<User, 'role' | 'date' | 'password'> & {
    _id: string
}

export type UserResponse = {
    user: UserCookie
    message: string
}

export type UserCookie = Pick<User, 'role'> & {
    _id: string
}

export type UserCredentials = Pick<User, 'email' | 'password'>