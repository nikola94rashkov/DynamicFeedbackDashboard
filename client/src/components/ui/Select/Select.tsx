import type {ComponentProps} from "react";
import './Select.scss'

export type SelectProps = {
    className?: string
    id: string
    options: string[]
} & ComponentProps<'select'>

export const Select = (props: SelectProps) => {
    const { className = '', options, id, ...rest } = props

    return (
        <select className={`select ${className}`} id={id} {...rest}>
            {options?.map((option:string, index: number) => <option key={option+index} value={option.toLowerCase()}>{option}</option>)}
        </select>
    )
}