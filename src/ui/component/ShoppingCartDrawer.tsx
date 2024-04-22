import {Box, Drawer} from "@mui/material";
import {Dispatch, SetStateAction} from "react";

type Props = {
    drawerOpen: boolean;
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ShoppingCartDrawer({drawerOpen, setDrawerOpen}: Props) {

    const toggleDrawer = (newOpen: boolean) => () => {
        setDrawerOpen(newOpen)
    }

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
        >
            <Box sx={{width: 400}} role="presentation" onClick={toggleDrawer(false)}>
            </Box>
        </Drawer>
    )
}