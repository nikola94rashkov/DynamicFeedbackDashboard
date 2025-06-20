// import { Navigate, Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/store/store.ts'
//
// export const PrivateRoutes = ({
//                                   navigate = '/login',
//                                   shouldBeAuthenticated = true,
//                               }: {
//     navigate?: string
//     shouldBeAuthenticated?: boolean
// }) => {
//     const { user } = useSelector((state: RootState) => state.authSlice)
//     const shouldRenderOutlet = shouldBeAuthenticated ? !!user : !user
//
//     return shouldRenderOutlet ? <Outlet /> : <Navigate to={navigate} />
// }