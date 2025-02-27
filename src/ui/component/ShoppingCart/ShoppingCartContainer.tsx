import {CartItemDto} from "../../../data/cartitem/CartItemDto.Type.ts";
import TopNavBar from "../NavBar/TopNavBar.tsx";
import {Box, Divider, Grid, Typography} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import ShoppingCartTableRow from "./ShoppingCartTableRow.tsx";
import "./shoppingCartContainerStyle.css"
import EmptyCart from "./EmptyCart.tsx";

type Props = {
  cartItemDtoList: CartItemDto[];
  setCartItemDtoList: Dispatch<SetStateAction<CartItemDto[] | undefined>>
}

const ShoppingCartContainer = ({cartItemDtoList, setCartItemDtoList}: Props) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const navigate = useNavigate();

  let total = 0;
  const calTotal = (cartItemDtoList: CartItemDto[]) => {
    for (const item of cartItemDtoList) {
      total += item.price * item.cart_quantity;
    }
    return total
  }

  const handleCheckOut = async () => {
    const responseDto = await TransactionApi.createNewTransaction();
    navigate(`/checkout/${responseDto.tid}`);
  }

  useEffect(() => {
    setTotalPrice(calTotal(cartItemDtoList))
  }, [cartItemDtoList]);

  return (

    <div className="shopping-cart-page-container">
      <TopNavBar/>
      <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{height: "10vh"}}/>
        <Typography variant="h5" style={{margin: "0 0 16px 40px", opacity: 1}}>
          CART
        </Typography>
        <div
          className="shopping-cart-container"
          style={{
            display: "flex",
            justifyItems:"center",
          }}>
          <div className="cart-item">
            {
              cartItemDtoList.length === 0
                ? <EmptyCart/>
                : <div style={{backgroundColor: "white"}}>
                  <Grid container>

                    <Grid item xs={7} sx={{display: "flex", justifyContent: "center"}}>
                      <div className="cart-title">Product</div>
                    </Grid>
                    <Grid item xs={2} sx={{display: "flex", justifyContent: "center"}}>
                      <div className="cart-title">Price</div>
                    </Grid>
                    <Grid item xs={3} sx={{display: "flex", justifyContent: "center"}}>
                      <div className="cart-title">Cart Quantity</div>
                    </Grid>
                  </Grid>
                  <Divider sx={{border: 1}}/>
                  {
                    cartItemDtoList.map((dto) => (
                      <ShoppingCartTableRow dto={dto} cartItemDtoList={cartItemDtoList}
                                            setCartItemDtoList={setCartItemDtoList}/>
                    ))}
                </div>
            }
          </div>


          <div className="summary-container">

            <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent:"space-between",
              height:"80%",
            }}>

              <div style={{height: "60%"}}>
                <Typography variant="h5">
                  SUMMARY
                </Typography>
                <Divider sx={{my: 2, border: "1px black solid"}}/>
                <Grid container my={1}>
                  <Grid item md={6} xs={12}>
                    <Typography>
                      Sub Total
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12} textAlign="right">
                    <Typography >
                      HKD {totalPrice.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container my={1}>
                  <Grid item md={6} xs={12}>
                    <Typography>
                      Discount
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12} textAlign="right">
                    <Typography>
                      - HKD 0
                    </Typography>
                  </Grid>
                </Grid>
              </div>

              <div style={{height: "20%"}}>
                <Divider sx={{my: 2, border: "1px black solid"}}/>
                <Grid container sx={{margin: 0, padding: 0}}>
                  <Grid item xs={6}>
                    <Typography>
                      Shipping Fee
                    </Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>
                      {
                        (totalPrice > 2500 ) || (totalPrice===0)
                          ? "FREE"
                          : "HKD 100"
                      }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{fontWeight: "lighter", fontSize: "14px", marginTop: "4px", color: "rgba(0,0,0,0.7)"}}>
                      {
                        totalPrice > 2500
                          ? "Your order enjoys free shipping"
                          : "Enjoy free shipping for purchase more than HKD 2,500"
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </div>

              <Divider sx={{my: 2, border: "1px black solid"}}/>

              <Grid container>
                <Grid item md={6} xs={12}>
                  <Typography>
                    Total
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12} textAlign="right">
                  <Typography>
                    {
                      totalPrice > 2500
                        ? `HKD ${totalPrice.toLocaleString()}`
                        : `HKD ${(totalPrice + 100).toLocaleString()}`
                    }
                  </Typography>
                </Grid>
              </Grid>

              <button
                className="shopping-cart-checkout-button"
                onClick={handleCheckOut}
              >
                CHECK OUT
              </button>
            </Box>
          </div>
        </div>
      </div>
    </div>

  )

}
export default ShoppingCartContainer;