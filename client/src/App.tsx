import {Router} from "@/router/Router.tsx";
import {initializeAuth} from "@/store/auth/authSlice.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/store/store.ts";
import { Header, Footer } from "@/components/composed";
// import './styles/load.scss';

export const App = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(initializeAuth())
    }, [dispatch])

    return(
        <div className="wrapper">
            <div className="wrapper__inner">
                <Header />

                <main className='main'>
                    <Router/>
                </main>

                <Footer />
            </div>
        </div>
    )
}