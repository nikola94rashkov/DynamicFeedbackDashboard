import type {ComponentProps} from "react";

export type SelectProps = {
    id: string
    options: string[]
} & ComponentProps<'select'>

export const Select = (props: SelectProps) => {
    const { options, id, ...rest } = props

    return (
        <select id={id} {...rest}>
            {options?.map((option:string) => <option value={option.toLowerCase()}>{option}</option>)}
        </select>
    )
}