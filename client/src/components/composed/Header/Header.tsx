import { Nav } from "@/components/composed";
import { Shell } from "@/components/hoc";
import './Header.scss'

export const Header = () => {
    return (
        <header className="header">
            <Shell>
                <Nav/>
            </Shell>
        </header>
    )
}