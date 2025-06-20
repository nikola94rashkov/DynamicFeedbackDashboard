import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'

const Dashboard = lazy(() =>
    import('@/components/layouts/Dashboard').then((module) => ({
        default: module.Dashboard,
    })),
)
const Home = lazy(() =>
    import('@/components/layouts/Home').then((module) => ({
        default: module.Home,
    })),
)
const Register = lazy(() =>
    import('@/components/layouts/Register').then((module) => ({
        default: module.Register,
    })),
)
const Login = lazy(() =>
    import('@/components/layouts/Login').then((module) => ({
        default: module.Login,
    })),
)
const NotFound = lazy(() =>
    import('@/components/layouts/NotFound').then((module) => ({
        default: module.NotFound,
    })),
)

export const Router = () => {
    return (
        <Suspense fallback={<h2>loading...</h2>}>
            <Routes>
                <Route
                    path='/'
                    element={<Home />}
                />
                <Route
                    element={
                        <PrivateRoutes
                            shouldBeAuthenticated={false}
                            navigate='/'
                        />
                    }>
                    <Route
                        path='/login'
                        element={<Login />}
                    />
                    <Route
                        path='/register'
                        element={<Register />}
                    />
                </Route>
                <Route element={<PrivateRoutes />}>
                    <Route
                        path='/dashboard'
                        element={<Dashboard />}
                    />
                </Route>
                <Route
                    path='*'
                    element={<NotFound />}
                />
            </Routes>
        </Suspense>
    )
}