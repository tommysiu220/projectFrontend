import {CartItemDto} from "../../data/cartitem/CartItemDto.Type";
import TopNavBar from "./NavBar/TopNavBar.tsx";
import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {QuantitySelector} from "./QuantitySelector.tsx";
import * as CartItemApi from "../../api/CartItemApi.ts"
import {useNavigate} from "react-router-dom";
import PatchCartItemSnackbar from "./PatchCartItemSnackbar.tsx";
import DeleteCartItemSnackbar from "./DeleteCartItemSnackbar.tsx";

type Props = {
    cartItemDtoList: CartItemDto[],
    setCartItemDtoList: Dispatch<SetStateAction<CartItemDto[] | undefined>>
}

const ShoppingCartContainer = ({cartItemDtoList, setCartItemDtoList}: Props) => {
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [isPatching, setIsPatching] = useState<boolean>(false);
    const [successfulDelete, setSuccessfulDelete] = useState<boolean>(false);
    const [successfulPatch, setSuccessfulPatch] = useState<boolean>(false);
    const [proceedToPay, setProceedToPay] = useState<boolean>(false);
    const navigate = useNavigate();


    const incrementOne = async (pid: number, cartQuantity: number) => {
        console.log(pid, cartQuantity)
        setIsPatching(true);
        const responseDto = await CartItemApi.patchCartItem(pid, cartQuantity + 1)
        const updateDtoList = cartItemDtoList.map((item) => {
            if (item.pid === responseDto.pid) {
                item.cart_quantity = responseDto.cart_quantity
            }
            return item
        })
        setCartItemDtoList(updateDtoList)
        setIsPatching(false);
        setSuccessfulPatch(true);
    };

    const decrementOne = async (pid: number, cartQuantity: number) => {
        if (cartQuantity > 1) {
            console.log(pid, cartQuantity)
            setIsPatching(true);
            const responseDto = await CartItemApi.patchCartItem(pid, cartQuantity - 1)
            const updateDtoList = cartItemDtoList.map((item) => {
                if (item.pid === responseDto.pid) {
                    item.cart_quantity = responseDto.cart_quantity
                }
                return item
            })
            setCartItemDtoList(updateDtoList)
            setIsPatching(false);
            setSuccessfulPatch(true);
        }
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputQuantity = parseInt(event.target.value);
        if (inputQuantity > 1) {
            setQuantity(inputQuantity);
        }
    };

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

    const handleDeleteCartItem = async (pid: number) => {
        try {
            setIsPatching(true);
            await CartItemApi.deleteCartItem(pid);
            const updateDtoList = cartItemDtoList.filter((item) => (
                item.pid !== pid
            ));
            setCartItemDtoList(updateDtoList)
            setSuccessfulDelete(true)
            setIsPatching(false);
        } catch (error) {
            // navigate to error page
            navigate("/error");
        }
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
                        {cartItemDtoList.map((dto) => (
                            <>
                                <Grid sx={{my: 1}} container>
                                    <Grid item xs={3}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        {/*<img height="160px" src={`/${dto.image_url}`}/>*/}
                                        <img height="160px" src={dto.image_url}/>
                                    </Grid>
                                    <Grid item xs={4} sx={{display: "flex", alignItems: "center",}}>
                                        <Typography>
                                            {dto.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <Typography>
                                            HKD {dto.price.toLocaleString()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <QuantitySelector initQuantity={dto.cart_quantity}
                                                          increment={() => incrementOne(dto.pid, dto.cart_quantity)}
                                                          decrement={() => decrementOne(dto.pid, dto.cart_quantity)}
                                                          isPatching={isPatching}
                                                          handleQuantityChange={handleQuantityChange}
                                            // handleInputBlur={()=>handleInputBlur(dto.pid,quantity)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}
                                          sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <button
                                            style={{
                                                border: "2px black solid",
                                                backgroundColor: "white",
                                                borderRadius: 0,
                                                textAlign: "center",
                                                color: "black",
                                                padding: 4,
                                                height: 36
                                            }}
                                            onClick={() => {
                                                handleDeleteCartItem(dto.pid).then()
                                            }}
                                        >
                                            REMOVE
                                        </button>
                                    </Grid>
                                </Grid>
                                <Divider sx={{border: 1}}/>
                            </>
                        ))}
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
                        {
                            proceedToPay
                                ?<div>pay</div>
                                :<></>
                        }
                        <div>
                            <Divider sx={{my: 2, border: "1px black solid"}}/>

                            <button style={{
                                width: "100%",
                                backgroundColor: "black",
                                color: "white",
                                border: 0,
                                fontSize: 20,
                                padding: 8,
                            }}
                                    onClick={() => setProceedToPay(true)}>
                                CHECK OUT
                            </button>
                        </div>
                    </Box>
                </Container>
                <PatchCartItemSnackbar snackbarOpen={successfulPatch} setSnackbarOpen={setSuccessfulPatch}/>
                <DeleteCartItemSnackbar snackbarOpen={successfulDelete} setSnackbarOpen={setSuccessfulDelete}/>
            </div>
        </div>
    )

}
export default ShoppingCartContainer;