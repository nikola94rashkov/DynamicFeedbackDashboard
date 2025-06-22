import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { Toaster } from 'sonner';
import {Router} from "@/router/Router.tsx";
import {initializeAuth} from "@/store/auth/authSlice.ts";
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

                <Toaster
                    position='bottom-right'
                    richColors
                    closeButton
                />
            </main>

            <Footer />
        </div>
    )
}