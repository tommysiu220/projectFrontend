import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import NavBar2 from "../../component/NavBar/NavBar2.tsx";
import './style.css'

export default function LoginPage() {
    return (
        <>
            <div style={{height: "16vh"}}></div>
            <Container maxWidth="xs" className={"container"}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form>
                    <Grid>
                        <Grid item xs={12} sx={{margin: '16px'}}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                // value={email}
                                // onChange={handleEmailChange}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{margin: '16px'}}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                // value={password}
                                // onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{margin: '16px'}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    )
}