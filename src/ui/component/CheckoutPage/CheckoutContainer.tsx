import {Box, Button, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import CheckoutItemRow from "./CheckoutItemRow.tsx";
import {TransactionDto} from "../../../data/transaction/TransactionDto.Type.ts";
import{ChangeEvent, FormEvent, useState} from "react";
import "./CheckoutContainerStyle.css"
import * as StripeApi from "../../../api/StripeApi.ts"
//
// type Props={
//     transactionDto:TransactionDto;
// }

interface CheckoutContainerProps {
    transactionDto: TransactionDto
}

export default function CheckoutContainer({transactionDto}: CheckoutContainerProps) {
    // const navigate = useNavigate();

    const [creditCardNumber, setCreditCardNumber] = useState<string>('')
    const [expiration, setExpiration] = useState<string>('')
    const [cvv, setCvv] = useState<string>('')
    const [cardHolderName, setCardHolderName] = useState<string>('')

    const handleChangeCardHolderName = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setCardHolderName(value);
    };

    const handleChangeCardNumber = (e:ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedCardNumber = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
        setCreditCardNumber(formattedCardNumber);
    };

    const handleChangeExpiration = (e:ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedExpiration = (()=>{
            // Remove non-numeric characters
            const inExpiration = value.replace(/\D/g, '');
            // Format as MM/YYYY (add a slash after 2 digits)
            if (inExpiration.length <= 2) {
                return inExpiration;
            }
            return `${inExpiration.slice(0, 2)}/${inExpiration.slice(2, 6)}`;
        });
        setExpiration(formattedExpiration);
    };

    const handleChangeCvv = (e:ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // Limit input to 3 digits
        const formattedCvv = value.slice(0, 3);
        setCvv(formattedCvv);
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const finishPayment = async() => {
        const stripeUrl = await StripeApi.checkout(transactionDto.tid);
        window.location.href = stripeUrl;
        // await TransactionApi.payTransaction(transactionDto.tid);
        // await TransactionApi.finishTransaction(transactionDto.tid);
        // navigate("/thankyou")
    }



    return (
        <Container sx={{display: "flex", flexDirection: "column", boxSizing: "border-box"}}>
            <Box sx={{height: "15vh"}}/>
            <Box sx={{
                border: "2px solid black",
                borderRadius: 0,
                padding: "16px",
                height: "70vh",
                boxSizing: "border-box",
            }}>
                <Typography variant="h5" sx={{
                    textAlign: "center",
                    marginBottom: "8px"
                }}>
                    CONFIRM YOUR ORDER
                </Typography>
                <Divider sx={{
                    border: "1px solid black",
                    marginBottom: "8px"
                }}/>
                <Grid container sx={{
                    height: "94%",
                    boxSizing: "border-box"
                }}>
                    <Grid item xs={4} style={{
                        borderRight: "2px solid black",
                        boxSizing: "border-box"
                    }}>
                        <Typography variant="h6">Payment Detail</Typography>
                        <form onSubmit={handleSubmit}>
                            <>
                                <Box>
                                    <Typography variant="subtitle1" color="text.secondary">Card Number</Typography>
                                    <input
                                        className={"full-width-input"}
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        value={creditCardNumber}
                                        onChange={handleChangeCardNumber}
                                        maxLength={19}
                                        style={{fontSize:"16px"}}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" color="text.secondary">Card Holder Name</Typography>
                                    <input
                                        className={"full-width-input"}
                                        type="text"
                                        id="cardHolderName"
                                        name="cardHolderName"
                                        value={cardHolderName}
                                        onChange={handleChangeCardHolderName}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" color="text.secondary">Expiration (MM/YYYY)</Typography>
                                    <input
                                        className={"half-width-input"}
                                        type="text"
                                        id="validThrough"
                                        name="validThrough"
                                        value={expiration}
                                        onChange={handleChangeExpiration}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" color="text.secondary">CVV</Typography>
                                    <input
                                        className={"half-width-input"}
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        value={cvv}
                                        onChange={handleChangeCvv}
                                        maxLength={3}
                                    />
                                </Box>
                            </>
                        </form>
                    </Grid>
                    <Grid item xs={8} sx={{paddingLeft: '8px'}}>
                        <Typography sx={{marginBottom: "8px"}} variant="h6">Item Summary</Typography>
                        <div>
                            <Grid container>
                                <Grid item xs={6} sx={{display: "flex", justifyContent: "center"}}>
                                    <Typography variant="subtitle1">Product</Typography>
                                </Grid>
                                <Grid item xs={2} sx={{display: "flex", justifyContent: "center"}}>
                                    <Typography variant="subtitle1">Price</Typography>
                                </Grid>
                                <Grid item xs={2} sx={{display: "flex", justifyContent: "center"}}>
                                    <Typography variant="subtitle1">Quantity</Typography>
                                </Grid>
                                <Grid item xs={2} sx={{display: "flex", justifyContent: "center"}}>
                                    <Typography variant="subtitle1">Sub Total</Typography>
                                </Grid>
                            </Grid>

                            <div style={{height: '52vh', overflowY: 'auto'}}>
                                {
                                    transactionDto.items.map((item) => {
                                        return (
                                            <CheckoutItemRow transactionProductDto={item}/>)
                                    })
                                }
                            </div>
                        </div>
                        <Stack direction="row" justifyContent="space-between" sx={{marginTop: "8px"}}>
                            <Box>
                                <Typography>
                                    Total: {transactionDto.total.toLocaleString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Button sx={{
                                    borderRadius: 0,
                                    border: "2px solid black",
                                    color: "black"
                                }}
                                        onClick={finishPayment}
                                >
                                    Confirm Your Order
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}