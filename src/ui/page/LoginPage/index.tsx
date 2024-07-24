import {Alert, Button, Container, Grid, Input, InputAdornment, Typography} from "@mui/material";
import './loginStyle.css'
import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import signInWithGoogle from "./icons8-google.svg";
import signInWithFacebook from "./icons8-facebook.svg";
import signInWithGithub from "./icons8-github.svg";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginFail, setIsLoginFail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const loginUser = useContext<UserData | null | undefined>(LoginUserContext)

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
    if (loginResult) {
      navigate(-1);
    } else {
      setIsLoginFail(true);
    }
  }

  const googleLogin = async () => {
    const loginResult = await FirebaseAuthService.handleSignInWithGoogle();
    if (loginResult) {
      navigate(-1);
    } else {
      setIsLoginFail(true);
    }
  }

  const facebookLogin = async () => {
    const loginResult = await FirebaseAuthService.handleSignInWithFacebook();
    if (loginResult) {
      navigate(-1);
    } else {
      setIsLoginFail(true);
    }
  }

  const githubLogin = async () => {
    const loginResult = await FirebaseAuthService.handleSignInWithGithub();
    if (loginResult) {
      navigate(-1);
    } else {
      setIsLoginFail(true);
    }
  }


  useEffect(() => {
    if (loginUser) {
      navigate(-1)
    }
  }, [loginUser]);


  return (

    <div className="login-page-container">
      <div
        style={{
          height: "20vh"
        }}>
      </div>
      <Container maxWidth="xs" className="form-container">
        <Typography variant="h4" align="center" sx={{color: "black"}}>
          LOGIN
        </Typography>
        <form style={{margin: 0}} onSubmit={handleLogin}>
          <Grid>
            {
              isLoginFail &&
                <Alert severity='error' sx={{}}>Wrong Email or Password</Alert>
            }
            <Grid item xs={12} sx={{margin: '8px 24px 24px 24px'}}>

              <Input
                fullWidth
                type="email"
                value={email}
                placeholder="E-mail"
                onChange={handleEmailChange}
                startAdornment={
                  <InputAdornment position="start">
                    <AlternateEmailIcon/>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12} sx={{margin: '8px 24px 24px 24px'}}>
              <Input
                fullWidth
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
                startAdornment={
                  <InputAdornment position="start">
                    <KeyIcon/>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12} sx={{margin: '32px 24px 16px 24px'}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{backgroundColor: 'rgb(0,0,0)', color: 'white', borderRadius: 0}}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>

        <hr style={{border: 'none', height: '2px', backgroundColor: 'rgba(0,0,0)',}}/>

        <div style={{display: "flex", color: "black", justifyContent: "center", fontSize: "16px", marginTop: "8px"}}>
          Login with other ways
        </div>
        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <img style={{width: "40px", margin: "4px"}} src={signInWithGoogle} onClick={googleLogin}/>
          <img style={{width: "40px", margin: "4px"}} src={signInWithFacebook} onClick={facebookLogin}/>
          <img style={{width: "40px", margin: "4px"}} src={signInWithGithub} onClick={githubLogin}/>
        </div>
      </Container>
    </div>
  )
}