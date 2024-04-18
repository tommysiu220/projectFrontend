import React, {useContext} from 'react';
import {AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Typography, Stack, Box} from '@mui/material';
import {Link} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import navbarBackground from './DOUBLESHOT.png'
import navbarLogo from './blackballBackground.jpeg'
import shoppingCartIcon from './shopping-trolley.svg'
import logoutIcon from './logout.svg'
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faCartShopping} from "@fortawesome/free-solid-svg-icons";


const TopNavBar = () => {
    // const [anchorEl, setAnchorEl] = React.useState(null);
    //
    // const handleMenuOpen = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    //
    // const handleMenuClose = () => {
    //     setAnchorEl(null);
    // };
    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);

    const logoutUser = () => {
        FirebaseAuthService.handleSignOut();
    }

    const renderLoginUser = () => {
        if (loginUser) {
            return (
                <Box sx={{display: "flex"}}>
                    <Typography sx={{display: 'flex', alignItems: 'center',}}>{loginUser.email}</Typography>
                    <div style={{display: 'flex', alignItems: 'center', margin: 8, height:"32px"}}>
                        <Link to="/shoppingcart">
                            <img src={shoppingCartIcon} width="24px"/>
                        </Link>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center',}}>
                        <img src={logoutIcon} width="32px"/>
                    </div>

                    {/*<Button sx={{padding: 0, width: "50%"}} onClick={logoutUser}>*/}
                    {/*    <FontAwesomeIcon icon={faArrowRightFromBracket} style={{color: "#ffffff",}}/>*/}
                    {/*</Button>*/}
                </Box>
            )
        } else if (loginUser === null) {
            return (
                <Button color="primary" sx={{height: 24, padding: 0}}>
                    <Link style={{height: 24, color: "white"}} to="/login"
                          className="nav-link"><AccountCircleIcon/></Link>

                </Button>
            )
        } else {
            return (
                <Typography>Loading...</Typography>
            )
        }
    }

    return (
        <>
            <div style={{backgroundColor: "black", display: "flex", justifyContent: 'center'}}>
                {/*<img height="60px" src={navbarLogo}/>*/}
            </div>

            <AppBar position="static" sx={{bgcolor: "black"}}>
                <Toolbar sx={{display: "flex", height: 60}}>
                    <div style={{width: "25vw", display: "flex", alignItems: 'center'}}>
                        {/*    <IconButton*/}
                        {/*        color="inherit"*/}
                        {/*        aria-label="menu"*/}
                        {/*        onClick={handleMenuOpen}*/}
                        {/*    >*/}
                        {/*        <MoreHorizIcon/>*/}

                        {/*    </IconButton>*/}
                        {/*    <Menu*/}
                        {/*        id="menu"*/}
                        {/*        anchorEl={anchorEl}*/}
                        {/*        open={Boolean(anchorEl)}*/}
                        {/*        onClose={handleMenuClose}*/}
                        {/*    >*/}
                        {/*        <MenuItem onClick={handleMenuClose}>Checkout</MenuItem>*/}
                        {/*        <MenuItem onClick={handleMenuClose}>Product Detail</MenuItem>*/}
                        {/*        <MenuItem onClick={handleMenuClose}>Shopping Cart</MenuItem>*/}
                        {/*    </Menu>*/}

                    </div>
                    <div style={{width: "50vw", display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <Link to={"/"}>
                            <img height="60px" src={navbarLogo}/>
                            <img height="60px" src={navbarBackground}/>
                        </Link>
                    </div>

                    <div style={{
                        width: "25vw",
                        display: "flex",
                        justifyContent: 'right',
                        alignItems: "center",
                        height: 64
                    }}>
                        {renderLoginUser()}
                    </div>

                </Toolbar>
            </AppBar>
        </>

    );
};

export default TopNavBar;