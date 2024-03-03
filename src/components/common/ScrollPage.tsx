import React from "react";
import { useLocation } from "react-router-dom";

function ScrollPage() {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

    return null
}

export default ScrollPage