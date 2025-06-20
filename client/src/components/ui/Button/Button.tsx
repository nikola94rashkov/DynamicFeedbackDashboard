import type {ComponentProps, ReactNode} from "react";
import './Button.scss'

type ButtonProps = {
    children: ReactNode
    className?: string
} & ComponentProps<'button'>

export const Button= (props: ButtonProps) => {
    const { className, children, ...rest } = props;
    return (
        <button className={`button ${className}`} {...rest}>{children}</button>
    )
}