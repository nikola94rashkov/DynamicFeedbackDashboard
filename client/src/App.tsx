import {Router} from "@/router/Router.tsx";
import {initializeAuth} from "@/store/auth/authSlice.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/store/store.ts";
import { Header, Footer } from "@/components/composed";
import {Section} from "@/components/hoc";

export const App = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(initializeAuth())
    }, [dispatch])

    return(
        <div className="wrapper">
            <Header />

            <main className='main'>
              <Section>
                  <Router/>
              </Section>
            </main>

            <Footer />
        </div>
    )
}