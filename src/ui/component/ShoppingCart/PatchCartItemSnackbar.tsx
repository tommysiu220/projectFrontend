import {Dispatch, SetStateAction} from "react";
import {Snackbar, Typography} from "@mui/material";

type Props = {
    snackbarOpen: boolean,
    setSnackbarOpen: Dispatch<SetStateAction<boolean>>
}

export default function PatchCartItemSnackbar({snackbarOpen, setSnackbarOpen}: Props) {
    return (
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
        >
            <Typography sx={{border:"2px black solid", padding: 1, backgroundColor:"white",}}>
                Item has been updated!
            </Typography>
        </Snackbar>
    )
}