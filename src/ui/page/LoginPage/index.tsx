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

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginFail, setIsLoginFail]= useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const loginUser = useContext<UserData|null|undefined>(LoginUserContext)

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
        if (loginResult){
            navigate(-1);
        } else {
            setIsLoginFail(true);
        }
    }

    useEffect(() => {
        if (loginUser){
            navigate("/")
        }
    }, [loginUser]);


    return (

            <div className={"loginPageContainer"}>
                <div style={{height: "16vh"}}></div>
                <Container maxWidth="xs" className={"container"}>
                    <Typography variant="h4" align="center" gutterBottom sx={{color:"black"}}>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <Grid>
                            {
                                isLoginFail&&
                                <Alert severity='error' sx={{}}>Wrong Email or Password</Alert>
                            }
                            <Grid item xs={12} sx={{margin: '24px'}}>
                                {/*<TextField*/}
                                {/*    fullWidth*/}
                                {/*    type="email"*/}
                                {/*    label="Email"*/}
                                {/*    variant="filled"*/}
                                {/*    InputProps={{*/}
                                {/*        style: {*/}
                                {/*            borderRadius: '5px',*/}
                                {/*            backgroundColor: 'rgb(115,115,115)',*/}
                                {/*            color: "white"*/}
                                {/*        }*/}
                                {/*    }}*/}
                                {/*    // borderColor="white"*/}

                                {/*    value={email}*/}
                                {/*    onChange={handleEmailChange}*/}
                                {/*/>*/}
                                <Input
                                  fullWidth
                                  type="email"
                                  value={email}
                                  placeholder="E-mail"
                                  onChange={handleEmailChange}
                                  startAdornment={
                                      <InputAdornment position="start">
                                          <AlternateEmailIcon />
                                      </InputAdornment>
                                  }
                                />
                            </Grid>
                            <Grid item xs={12} sx={{margin: '24px'}}>
                                {/*<TextField*/}
                                {/*    fullWidth*/}
                                {/*    label="Password"*/}
                                {/*    type="password"*/}
                                {/*    variant="filled"*/}
                                {/*    InputProps={{*/}
                                {/*        style: {*/}
                                {/*            borderRadius: '5px',*/}
                                {/*            backgroundColor: 'rgb(115,115,115)',*/}
                                {/*            color: "white"*/}
                                {/*        }*/}
                                {/*    }}*/}
                                {/*    value={password}*/}
                                {/*    onChange={handlePasswordChange}*/}
                                {/*/>*/}
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
                                              {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                      </InputAdornment>
                                  }
                                  value={password}
                                  placeholder="Password"
                                  onChange={handlePasswordChange}
                                  startAdornment={
                                      <InputAdornment position="start">
                                          <KeyIcon />
                                      </InputAdornment>
                                  }
                                />
                            </Grid>
                            <Grid item xs={12} sx={{margin: '16px'}}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    style={{backgroundColor: 'rgb(33,33,33)', color: 'white'}}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
    )
}