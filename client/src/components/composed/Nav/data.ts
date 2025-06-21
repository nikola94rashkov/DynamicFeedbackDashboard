export const data = (handleLogout: () => Promise<void>) => {
    return {
        auth: [
            {
                text: 'Home',
                to: '/',
            },
            {
                text: 'Dashboard',
                to: '/dashboard',
            },
            {
                text: 'Logout',
                isItButtonElement: true,
                onClick: handleLogout,
            },
        ],
        unauth: [
            {
                text: 'Home',
                to: '/',
            },
            {
                text: 'Login',
                to: '/login',
            },
            {
                text: 'Register',
                to: '/register',
            },
        ],
    }
}