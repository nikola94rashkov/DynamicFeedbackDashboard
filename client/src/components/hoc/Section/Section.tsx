import type {ComponentProps, ReactNode} from "react";
import {Shell} from "@/components/hoc";
import './Section.scss';

type SectionProps = {
    children?: ReactNode
    className?: string
} & ComponentProps<'section'>

export const Section = (props: SectionProps) => {
    const { children, className = '', ...rest} = props

    return (
        <section className={`section ${className}`} {...rest}>
           <Shell>
               {children}
           </Shell>
        </section>
    )
}