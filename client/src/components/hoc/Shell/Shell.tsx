import type {ComponentProps, ReactNode} from "react";
import './Shell.scss';

type ShellProps = {
    children?: ReactNode
    className?: string
} & ComponentProps<'div'>

export const Shell = (props: ShellProps) => {
    const { children, className, ...rest} = props

    return (
        <div className={`shell ${className}`} {...rest}>
            {children}
        </div>
    )
}