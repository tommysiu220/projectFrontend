import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import NavBar2 from "../../component/NavBar2.tsx";

export default function LoginPage(){
    return(
        <>
            <h1>LoginPage</h1>
            <NavBar2/>
            <Container maxWidth="xs">
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                // value={email}
                                // onChange={handleEmailChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                // value={password}
                                // onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
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