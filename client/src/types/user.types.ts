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

export type UserResponseError = {
    data: {
        message: string;
    }
    status: number;
};

export type LoginResponse = {
    user?: UserCookie;
    data?: UserResponse;
    error?: UserResponseError;
}

export type UserCookie = Pick<User, 'role'> & {
    _id: string
    email: string
}

export type UserCredentials = Pick<User, 'email' | 'password'>