import {Router} from "@/router/Router.tsx";
import {initializeAuth} from "@/store/auth/authSlice.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/store/store.ts";

export const App = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(initializeAuth())
    }, [dispatch])

    return(
        <div className="wrapper">
            <main className='main'>
               <Router/>
            </main>

            <footer className="footer">
                footer
            </footer>
        </div>
    )
}