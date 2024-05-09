import {CartItemDto} from "../../../data/cartitem/CartItemDto.Type.ts";
import TopNavBar from "../NavBar/TopNavBar.tsx";
import {Box, Button, Container, Divider, Grid, Typography} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import ShoppingCartTableRow from "./ShoppingCartTableRow.tsx";


type Props = {
    cartItemDtoList: CartItemDto[];
    setCartItemDtoList: Dispatch<SetStateAction<CartItemDto[] | undefined>>
}

const ShoppingCartContainer = ({cartItemDtoList, setCartItemDtoList}: Props) => {
    const [totalPrice, setTotalPrice] = useState<number>(0);

    // const [proceedToPay, setProceedToPay] = useState<boolean>(false);
    const navigate = useNavigate();


    // const handleInputBlur = async(pid: number, cartQuantity: number)=> {
    //
    //     const responseDto = await CartItemApi.patchCartItem(pid, cartQuantity)
    //     const updateDtoList = cartItemDtoList.map((item) => {
    //         if (item.pid === responseDto.pid) {
    //             item.cart_quantity = responseDto.cart_quantity
    //         }
    //         return item
    //     })
    //     setCartItemDtoList(updateDtoList)
    //
    // }

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
        <div>
            <TopNavBar/>
            {/*<Typography variant="h1">*/}
            {/*    Shopping Cart*/}
            {/*</Typography>*/}


            <div style={{display: "flex", marginTop: 16}}>
                <Container sx={{width: "70vw"}}>
                    <div>
                        <Typography variant="h5" gutterBottom>
                            CART
                        </Typography>
                        {
                            cartItemDtoList.length === 0
                                ? <Typography>Empty Cart</Typography>
                                : <> <Grid container>

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
                                </>
                        }
                    </div>
                </Container>
                <Container sx={{width: "30vw", height: "92vh", backgroundColor: 'rgb(245,245,245)'}}>
                    <Box sx={{height: "12vh"}}></Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "32vh",
                        justifyContent: "space-between"
                    }}>
                        <div>
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
                        <div>

                            <Divider sx={{my: 2, border: "1px black solid"}}/>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography>
                                        Total
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} textAlign="right">
                                    <Typography>
                                        HKD {totalPrice.toLocaleString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        {/*{*/}
                        {/*    proceedToPay*/}
                        {/*        ?<div>pay</div>*/}
                        {/*        :<></>*/}
                        {/*}
*/}
                        <div>
                            <Divider sx={{my: 2, border: "1px black solid"}}/>

                            <Button style={{
                                width: "100%",
                                backgroundColor: "black",
                                color: "white",
                                border: 0,
                                fontSize: 20,
                                padding: 8,
                            }}
                                // onClick={() => setProceedToPay(true)}
                                    onClick={
                                        handleCheckOut
                                    }
                            >
                                CHECK OUT
                            </Button>
                        </div>
                    </Box>
                </Container>

            </div>
        </div>
    )

}
export default ShoppingCartContainer;