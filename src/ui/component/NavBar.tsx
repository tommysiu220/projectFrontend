import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopNavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuOpen}
                >
                    <MenuIcon />
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Online Fruit Store
                </Typography>
                <Button color="primary" sx={{height: 24,padding:0 }} disableRipple>
                    <Link style={{height:24}} to="/login"><AccountCircleIcon /></Link>

                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default TopNavBar;