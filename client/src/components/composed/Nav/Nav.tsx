import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import type {AppDispatch, RootState} from "@/store/store.ts";
import {clearUser} from "@/store/auth/authSlice.ts";
import { useLogoutMutation } from "@/store/user/userApiSlice";
import {Button, NavButton, type NavButtopProps} from "@/components/ui";

import {data} from "./data";
import './Nav.scss';

type NavLinkProps = {
    isItButtonElement?: boolean;
} & NavButtopProps

export const Nav = () => {
    const { user } = useSelector((state: RootState) => state.authSlice)
    const dispatch = useDispatch<AppDispatch>();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(clearUser())
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    }

    const navigationConfig = data(handleLogout)
    return <nav className="nav">
        <ul>
            {
                (user ? navigationConfig.auth : navigationConfig.unauth).map(({text, to, onClick, isItButtonElement}: NavLinkProps, index) => {

                    return <li key={index}>{ isItButtonElement ? <Button onClick={onClick}>{text}</Button> : <NavButton to={to} text={text} onClick={onClick} />}</li>
                })
            }
        </ul>
    </nav>
}