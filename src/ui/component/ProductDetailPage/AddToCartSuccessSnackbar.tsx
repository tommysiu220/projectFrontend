import {Dispatch, SetStateAction} from "react";
import { Snackbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

type Props = {
    snackbarOpen: boolean,
    setSnackbarOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddToCartSuccessSnackbar({snackbarOpen, setSnackbarOpen}: Props) {
    return (
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
        >

            <Typography sx={{border: "2px black solid", padding: 1, textAlign: "center", backgroundColor:"white"}}>
                Item has been added.
                <br/>
                <Link to="/shoppingcart"
                      style={{
                          color: "inherit",
                      }}>
                    View Cart
                </Link>
            </Typography>

        </Snackbar>


    )
}