import {Divider, Grid, Typography} from "@mui/material";
import {TransactionProductDto} from "../../../data/transaction/TransactionDto.Type.ts";

type Props = {
    transactionProductDto: TransactionProductDto;
}

export default function CheckoutItemRow({transactionProductDto}: Props) {
    return (
        <>
        <Grid sx={{my: 1, display: "flex", alignItems: "center", justifyContent: "center"}} container>
                <Grid item xs={2}
                      sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {/*<img height="160px" src={`/${dto.image_url}`}/>*/}
                    <img height="80vh" src={transactionProductDto.product.image_url}/>
                </Grid>
                <Grid item xs={4} sx={{display: "flex", alignItems: "center", boxSizing: "border-box"}}>
                    <Typography>
                        {transactionProductDto.product.product_name}
                    </Typography>
                </Grid>
                <Grid item xs={2}
                      sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography>
                        HKD {transactionProductDto.product.price.toLocaleString()}
                    </Typography>
                </Grid>
                <Grid item xs={2}
                      sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography>
                        {transactionProductDto.quantity}
                    </Typography>
                </Grid>
                <Grid item xs={2}
                      sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography>
                        HKD {transactionProductDto.subTotal.toLocaleString()}
                    </Typography>
                </Grid>
        </Grid>

        <Divider sx={{border: 1}}/>

</>
)
}