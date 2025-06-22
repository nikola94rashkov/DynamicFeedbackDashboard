import type {ComponentProps} from "react";
import './TextField.scss'

export type TextFieldProps = {
    className?: string
    id?: string
    name?: string
} & ComponentProps<'textarea'>

export const TextField = (props: TextFieldProps) => {
    const { className = '', name, id, ...rest } = props

    return <textarea className={`textarea ${className}`} name={name} id={id} {...rest} ></textarea>
}