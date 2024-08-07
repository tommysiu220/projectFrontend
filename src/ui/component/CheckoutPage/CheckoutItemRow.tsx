import {Divider, Grid,} from "@mui/material";
import {TransactionProductDto} from "../../../data/transaction/TransactionDto.Type.ts";
import "./checkoutItemRoxStyle.css"

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
          <img className="checkout-product-img" src={transactionProductDto.product.image_url}/>
        </Grid>
        <Grid item xs={5}
              sx={{display: "flex", alignItems: "center", boxSizing: "border-box"}}>
          <div className="checkout-product">
            {transactionProductDto.product.product_name}
          </div>
        </Grid>
        <Grid item md={2} xs={0}
              sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div className="hide-detail">
            HKD {transactionProductDto.product.price.toLocaleString()}
          </div>
        </Grid>
        <Grid item md={1} xs={0}
              sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div className="hide-detail">
            {transactionProductDto.quantity}
          </div>
        </Grid>
        <Grid item md={2} xs={0}
              sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div className="hide-detail">
            HKD {transactionProductDto.subTotal.toLocaleString()}
          </div>
        </Grid>
        <Grid item md={2} xs={5}
              sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div className="responsive-detail">
            Price: HKD {transactionProductDto.product.price.toLocaleString()}<br/>
            <br/>
            Quantity: {transactionProductDto.quantity}<br/>
            <br/>
            Subtotal: HKD {transactionProductDto.subTotal.toLocaleString()}
          </div>
        </Grid>

      </Grid>

      <Divider sx={{border: 1}}/>

    </>
  )
}