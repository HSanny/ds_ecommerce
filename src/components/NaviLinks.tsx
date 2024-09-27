import React from "react"
import { useProductsContext } from "../contexts/productsContext";
import { links } from "../utils/constants";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from '@mui/material';
import { useAuthContext } from "../contexts/authContext";

const NaviLinks: React.FC<{ className: string; isSidebar?: boolean }> = ({
    className,
    isSidebar,
}) => {
    const { closeSidebar } = useProductsContext();
    const { user } = useAuthContext()
    return (
        <Box component="ul" className={className} sx={{ display: 'flex', alignItems: 'center', gap: '20px', listStyleType: 'none', padding: 0, margin: 0 }}>
            {links.map(({
                id, text, url,
            }) => {
                return (
                    <Typography
                        key={id}
                        component="li"
                        sx={{
                            '&:hover': {
                                borderBottom: '2px solid black',
                            },
                        }}
                        onClick={isSidebar ? closeSidebar : undefined}
                    >
                        <Link
                            to={url}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                textTransform: 'capitalize',
                            }}
                        >
                            {text}
                        </Link>
                    </Typography>
                );
            })}

            {/* Check out in Sidebar */}
            {isSidebar && (
                <Typography component="li">
                    <Link to="/checkout" onClick={closeSidebar} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Checkout
                    </Link>
                </Typography>
            )}

            {/* Login Button */}
            {!isSidebar && (
                <Typography
                    component="li"
                    sx={{
                        '&:hover': {
                            borderBottom: '2px solid black',
                        },
                    }}
                >
                    <>
                        {user?.isLogin ? (
                            <Link
                                to="/cart"
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    textTransform: 'capitalize',
                                }}
                            >
                                Login
                            </Link>
                        ): (
                                <Link
                                    to="/authentication/login"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Login
                                </Link>
                    )}
                    </>
                </Typography>
            )}
        </Box>
    );
};

export default NaviLinks;