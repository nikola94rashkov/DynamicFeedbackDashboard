import type {ComponentProps} from "react";
import './Field.scss'

export type FieldProps = {
    className?: string
    type?: string
} & ComponentProps<'input'>

export const Field = (props: FieldProps) => {
    const { className, type= 'text', ...rest } = props

    return <input className={`field ${className}`} type={type} {...rest}/>
}