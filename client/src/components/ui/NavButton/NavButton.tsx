import type {ComponentProps} from "react";
import {NavLink} from "react-router-dom";

export type NavButtopProps = {
    to?: string;
    text: string;
    onClick?: () => Promise<void>;
} & ComponentProps<'a'>

export const NavButton = (props: NavButtopProps)=> {
    const {
        to = '#',
        text,
        ...rest
    } = props;

    return <NavLink to={to}  className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : ""
    } {...rest}>{text}</NavLink>
}