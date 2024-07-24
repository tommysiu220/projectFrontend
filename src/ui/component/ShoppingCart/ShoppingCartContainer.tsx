import {CartItemDto} from "../../../data/cartitem/CartItemDto.Type.ts";
import TopNavBar from "../NavBar/TopNavBar.tsx";
import {Box, Button, Container, Divider, Grid, Typography} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import ShoppingCartTableRow from "./ShoppingCartTableRow.tsx";
import "./shoppingCartContainerStyle.css"

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
    <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
      <div style={{height: "88px"}}/>
      <Typography variant="h5" style={{margin: "0 0 16px 40px",opacity:1}}>
          CART
        </Typography>
        <div style={{display: "flex", height: "80vh",}}>
          <Container sx={{width: "75vw", overflow: 'auto'}}>
            {
              cartItemDtoList.length === 0
                ? <Typography>Empty Cart</Typography>
                : <div  style={{backgroundColor:"white"}}>
                  <Grid container>

                  <Grid item xs={7} sx={{display: "flex", justifyContent: "center"}}>
                    <Typography variant="subtitle1">Product</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{display: "flex", justifyContent: "center"}}>
                    <Typography variant="subtitle1">Price</Typography>
                  </Grid>
                  <Grid item xs={3} sx={{display: "flex", justifyContent: "center"}}>
                    <Typography variant="subtitle1">Cart Quantity</Typography>
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

          </Container>
          <Container sx={{
            width: "25vw",
            backgroundColor: 'rgb(245,245,245)'
          }}>
            <Box sx={{height: "10%"}}></Box>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              height: "85%",

            }}>
              <div style={{height: "60%"}}>
                <Typography variant="h5">
                  SUMMARY
                </Typography>
                <Divider sx={{my: 2, border: "1px black solid"}}/>
                <Grid container my={1}>
                  <Grid item xs={6}>
                    <Typography>
                      Sub Total
                    </Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>
                      HKD {totalPrice.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container my={1}>
                  <Grid item xs={6}>
                    <Typography>
                      Discount
                    </Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>
                      - HKD 0
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <div style={{height: "20%"}}>
                <Divider sx={{my: 2, border: "1px black solid"}}/>
                <Grid container sx={{margin:0,padding:0}}>
                  <Grid item xs={6} >
                    <Typography >
                      Shipping Fee
                    </Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>
                      {
                        totalPrice > 2500
                        ? "FREE"
                        : "HKD 100"
                      }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid item xs={12}>
                    <Typography sx={{fontWeight:"lighter", fontSize:"14px", marginTop:"4px", color:"rgba(0,0,0,0.7)"}}>
                      {
                        totalPrice>2500
                          ? "Your order enjoys free shipping"
                          : "Enjoy free shipping for purchase more than HKD 2,500"
                      }
                    </Typography>
                  </Grid>
                </Grid>

              </div>
              <Divider sx={{my: 2, border: "1px black solid"}}/>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography>
                    {
                      totalPrice>2500
                        ? `HKD ${totalPrice.toLocaleString()}`
                        : `HKD ${(totalPrice+100).toLocaleString()}`
                    }
                  </Typography>
                </Grid>
              </Grid>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: 20,
                  padding: "2px",
                  marginTop: "16px",
                  borderRadius: "0",
                }}
                onClick={handleCheckOut}
              >
                CHECK OUT
              </Button>
            </Box>
          </Container>

        </div>
      </div>
    </div>

  )

}
export default ShoppingCartContainer;