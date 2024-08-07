import {Box, Divider, Grid, Typography} from "@mui/material";
import CheckoutItemRow from "./CheckoutItemRow.tsx";
import {TransactionDto} from "../../../data/transaction/TransactionDto.Type.ts";
import "./checkoutContainerStyle.css"
import * as StripeApi from "../../../api/StripeApi.ts"

interface CheckoutContainerProps {
  transactionDto: TransactionDto
}

export default function CheckoutContainer({transactionDto}: CheckoutContainerProps) {

  const finishPayment = async () => {
    const stripeUrl = await StripeApi.checkout(transactionDto.tid);
    window.location.href = stripeUrl;
  }

  return (
    <div className="checkout-page-container">
      <Box sx={{height: "15vh"}}/>
      <Box sx={{
        border: "2px solid black",
        borderRadius: 0,
        padding: "16px",
        minHeight: "70vh",
        boxSizing: "border-box",
        backgroundColor: "white",
        margin: "0 24px",
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

        <Grid item xs={12}>
          <Typography sx={{marginBottom: "8px"}} variant="h6">Item Summary</Typography>
          <div>
            <Grid container>
              <Grid item md={7} xs={7} sx={{display: "flex", justifyContent: "center"}}>
                <Typography variant="subtitle1">Product</Typography>
              </Grid>
              <Grid item md={2} xs={0} sx={{display: "flex", justifyContent: "center"}}>
                <div className="hide-title">Price</div>
              </Grid>
              <Grid item md={1} xs={0} sx={{display: "flex", justifyContent: "center"}}>
                <div className="hide-title">Quantity</div>
              </Grid>
              <Grid item md={2} xs={0} sx={{display: "flex", justifyContent: "center"}}>
                <div className="hide-title">Sub Total</div>
              </Grid>
              <Grid item md={0} xs={5} sx={{display: "flex", justifyContent: "center"}}>
                <div className="responsive-title">Details</div>
              </Grid>
            </Grid>

            <Divider sx={{border: 1}}/>

            <div style={{height: '52vh', overflowY: 'auto'}}>
              {
                transactionDto.items.map((item) => {
                  return (
                    <CheckoutItemRow transactionProductDto={item}/>)
                })
              }
            </div>
          </div>

          <div className="confirm-order-container">
            <div className="confirm-order-total">
              {
                transactionDto.total > 2500
                  ? `Total: HKD ${transactionDto.total.toLocaleString()}`
                  :
                  <div style={{textAlign:"center"}}>
                    Total: HKD ${(transactionDto.total + 100).toLocaleString()}
                    <br/>
                    <div style={{fontWeight: "lighter", fontSize: "12px"}}>
                      Shipping fee HKD 100 is included.
                    </div>
                  </div>
              }
            </div>

            <button
              className="confirm-order-button"
              onClick={finishPayment}
            >
              Confirm Your Order
            </button>

          </div>
        </Grid>
      </Box>
    </div>
  )
}