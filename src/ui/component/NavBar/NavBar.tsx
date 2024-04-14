import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import navbarBackground from './DOUBLESHOT.png'

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

            <AppBar position="static" sx={{ bgcolor: "black" }}>
                <Toolbar sx={{display: "flex", height:80}}>
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
                        {/*<Typography variant="h6" component="div">*/}
                        {/*    DoubleShot*/}
                        {/*</Typography>*/}
                        <img height="80px" src={navbarBackground}/>
                    </div>

                    <div style={{width: "25vw", display: "flex", justifyContent: 'right'}}>
                        <Button color="primary" sx={{height: 24, padding: 0}} disableRipple>
                            <Link style={{height: 24}} to="/login"><AccountCircleIcon/></Link>

                        </Button>
                    </div>

                </Toolbar>
            </AppBar>
        </>

    );
};

export default TopNavBar;