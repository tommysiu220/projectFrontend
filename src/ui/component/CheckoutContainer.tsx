import {Box, Button, Container, Paper, Stack, Typography} from "@mui/material";
import CheckoutItemRow from "./CheckoutItemRow.tsx";
import {TransactionDto} from "../../data/transaction/TransactionDto.Type.ts";

type Props={
    transactionDto:TransactionDto;
}

export default function CheckoutContainer({transactionDto}:Props) {


    return (
        <Container>
            <Paper>
                <Typography variant="h5">
                    Checkout
                </Typography>
                <CheckoutItemRow>

                </CheckoutItemRow>
                <Stack direction="row" justifyContent="space-between">
                    <Box >
                        <Typography>
                            Total: $1000
                        </Typography>
                    </Box>
                    <Box>
                        <Button>
                            Pay
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    )
}