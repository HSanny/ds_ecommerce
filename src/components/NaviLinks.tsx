import React from "react"
import { useProductsContext } from "../utils/productsContext";
import { links } from "../utils/constants";
import { Link } from "react-router-dom";

const NaviLinks: React.FC<{ className: string; isSidebar?: boolean }> = ({
    className,
    isSidebar,
}) => {
    const { closeSidebar } = useProductsContext();

    return (
        <ul className={className}>
            {links.map(({
                id, text, url,
            }) => {
                return (
                    <li key={id} onClick={isSidebar ? closeSidebar : undefined}>
                        <Link to={url}>{text}</Link>
                    </li>
                )
            })}

            {/* Check out in Sidebar */}
            {isSidebar && (
                <li>
                    <Link to="/checkout" onClick={closeSidebar}>
                        Checkout
                    </Link>
                </li>
            )}
        </ul>
    )
}

export default NaviLinks