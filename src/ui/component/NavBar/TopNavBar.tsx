import {useContext, useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, Box} from '@mui/material';
import {useNavigate} from "react-router-dom";
import navbarLogo from './../../img/Doubleshot-horizontal-backgroundless.png'
import shoppingCartIcon from './bag.png'
import logoutIcon from './logout.png'
import loginIcon from './people.png'
import homeIcon from './home.png'
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import "./TopNavStyle.css"


const TopNavBar = () => {

  const loginUser = useContext<UserData | null | undefined>(LoginUserContext);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();


  const logoutUser = () => {
    FirebaseAuthService.handleSignOut();
  }

  const renderLoginUser = () => {
    if (loginUser) {
      return (
        <Box sx={{display: "flex"}}>
          <div className="has-dropdown">
            <div className="nav-bar-user unselectable"
            >
              ID: {loginUser.email}
            </div>

            <img className="nav-bar-user-icon unselectable" src={loginIcon}/>
            <ul className="dropdown-menu">
              <li onClick={() => {
                navigate("/")
              }}
                  className='dropdown-menu-item unselectable'
              >
                <img src={homeIcon} className='nav-bar-item-img'/>
                <div className='nav-bar-item-description'>
                  Home
                </div>

              </li>
              <li onClick={() => {
                navigate("/shoppingcart")
              }}
                  className='dropdown-menu-item unselectable'
              >
                <img src={shoppingCartIcon} className='nav-bar-item-img'/>
                <div className={'nav-bar-item-description'}>
                  Cart
                </div>
              </li>
              <li onClick={logoutUser}
                  className='dropdown-menu-item unselectable'>
                <img src={logoutIcon} className='nav-bar-item-img'/>
                <div className={'nav-bar-item-description'}>
                  Logout
                </div>
              </li>
            </ul>
          </div>

        </Box>
      )
    } else if (loginUser === null) {
      return (
        <div onClick={() => {
          navigate("/login")
        }}
             className='dropdown-menu-item unselectable'
        >
          <img src={loginIcon} className='nav-bar-item-img'/>
          <div className='nav-bar-item-description'>
            Login
          </div>
        </div>
      )
    } else {
      return (
        <Typography>Loading...</Typography>
      )
    }
  }

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 0);
    setLastScrollTime(Date.now());
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    const hideNavbarTimer = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastScroll = currentTime - lastScrollTime;
      if (timeSinceLastScroll >= 3000 && !isHovered) {
        setIsVisible(false);
      }
    }, 0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(hideNavbarTimer);
    };
  }, [lastScrollTime, isHovered]);

  return (
    <>
      <AppBar
        className="main-nav-bar-container"
        position="static"
        sx={{
          backgroundColor: "rgba(0,0,0,0.8)",
          zIndex: "100",
          transition: "opacity 0.3s ease-in-out",
          opacity: isVisible || isHovered ? "1" : "0",
          position: "fixed",
          top: "0",
          // minHeight: "80px"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Toolbar
          style={{
            display: "flex",
            height: "100%",
            padding: 0,
            marginLeft: "20px",
            marginRight: "20px",
          }}
          className='top-nav-bar'
        >
          <div style={{width: "25vw", display: "flex", alignItems: 'center',}}>

          </div>
          <div style={{
            width: "50vw",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
          }}
          >
            <img
              height="40px"
              src={navbarLogo}
              className="nav-bar-logo"
              onClick={() => {
                navigate("/productlist")
              }}
            />
          </div>

          <div
            className='nav-bar-user-container'
          >
            {renderLoginUser()}
          </div>

        </Toolbar>
      </AppBar>
    </>

  );
};

export default TopNavBar;