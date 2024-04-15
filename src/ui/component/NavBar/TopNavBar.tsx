import React from 'react';
import {AppBar, Toolbar, IconButton,Button, Menu, MenuItem} from '@mui/material';
import {Link} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import navbarBackground from './DOUBLESHOT.png'
import navbarLogo from './blackballBackground.jpeg'

const TopNavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div style={{backgroundColor: "black", display: "flex", justifyContent: 'center'}}>
                {/*<img height="60px" src={navbarLogo}/>*/}
            </div>

            <AppBar position="static" sx={{bgcolor: "black"}}>
                <Toolbar sx={{display: "flex", height: 60}}>
                    <div style={{width: "25vw", display: "flex", alignItems: 'center'}}>
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MoreHorizIcon/>

                        </IconButton>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>Checkout</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Product Detail</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Shopping Cart</MenuItem>
                        </Menu>

                    </div>
                    <div style={{width: "50vw", display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <img height="60px" src={navbarLogo}/>
                        <img height="60px" src={navbarBackground}/>
                    </div>

                    <div style={{width: "25vw", display: "flex", justifyContent: 'right'}}>
                        <Button color="primary" sx={{height: 24, padding: 0}}>
                            <Link style={{height: 24, color:"white"}} to="/login" className="nav-link"><AccountCircleIcon/></Link>

                        </Button>
                    </div>

                </Toolbar>
            </AppBar>
        </>

    );
};

export default TopNavBar;