import {useContext, useState} from 'react';
import {AppBar, Toolbar, Button, Typography, Box} from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import navbarBackground from './../../img/DOUBLESHOT.png'
import navbarLogo from './../../img/blackballBackground.jpeg'
import shoppingCartIcon from './../../img/shopping-trolley.svg'
import logoutIcon from './../../img/logout.svg'
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import ShoppingCartDrawer from "../ShoppingCart/ShoppingCartDrawer.tsx";


const TopNavBar = () => {

    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);

    const logoutUser = () => {
        FirebaseAuthService.handleSignOut();
    }

    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

    const renderLoginUser = () => {
        if (loginUser) {
            return (
                <Box sx={{display: "flex"}}>
                    <Typography sx={{display: 'flex', alignItems: 'center',}}>
                        {loginUser.email}
                    </Typography>

                    <div onClick={() => {
                        // setDrawerOpen(true)
                        navigate("/shoppingcart")
                    }}
                         style={{display: 'flex', alignItems: 'center', margin: 8, height: "32px"}}>
                        <img src={shoppingCartIcon} width="24px"/>
                    </div>

                    <div style={{display: 'flex', alignItems: 'center',}}
                         onClick={logoutUser}
                    >
                        <img src={logoutIcon} width="32px"/>
                    </div>

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
            <AppBar position="static" sx={{bgcolor: "black"}}>
                <Toolbar sx={{display: "flex", height: 60}}>
                    <div style={{width: "25vw"}}>
                    </div>
                    <div style={{width: "50vw", display: "flex", justifyContent: 'center', alignItems: 'center'}}
                         onClick={() => {
                             navigate("/productlist")
                         }}>
                        {/*<Link to={"/"}>*/}
                        <img height="60px" src={navbarLogo}/>
                        <img height="60px" src={navbarBackground}/>
                        {/*</Link>*/}
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
            <ShoppingCartDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        </>

    );
};

export default TopNavBar;