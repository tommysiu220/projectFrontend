import {CartItemDto} from "../../../data/cartitem/CartItemDto.Type.ts";
import {Divider, Grid, Typography} from "@mui/material";
import {QuantitySelector} from "../QuantitySelector.tsx";
import * as CartItemApi from "../../../api/CartItemApi.ts";
import { Dispatch, SetStateAction, useState} from "react";
import PatchCartItemSnackbar from "./PatchCartItemSnackbar.tsx";
import DeleteCartItemSnackbar from "./DeleteCartItemSnackbar.tsx";
import {useNavigate} from "react-router-dom";

type Props={
    dto: CartItemDto;
    cartItemDtoList:CartItemDto[];
    setCartItemDtoList:Dispatch<SetStateAction<CartItemDto[] | undefined>>;
}
export default function ShoppingCartTableRow({dto,cartItemDtoList,setCartItemDtoList}:Props){

    const [isPatching, setIsPatching] = useState<boolean>(false);
    const [successfulDelete, setSuccessfulDelete] = useState<boolean>(false);
    const [successfulPatch, setSuccessfulPatch] = useState<boolean>(false);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState<number>(dto.cart_quantity)

    const incrementOne = async (pid: number, cartQuantity: number) => {
        if (dto.stock >= (cartQuantity+1)) {
            console.log(dto.name, dto.stock, cartQuantity)
            setIsPatching(true);
            const responseDto = await CartItemApi.patchCartItem(pid, cartQuantity + 1)
            const updateDtoList = cartItemDtoList.map((item) => {
                if (item.pid === responseDto.pid) {
                    item.cart_quantity = responseDto.cart_quantity
                }
                return item
            })
            setCartItemDtoList(updateDtoList)
            setQuantity(responseDto.cart_quantity)
            setIsPatching(false);
            setSuccessfulPatch(true);
        }
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
            setQuantity(responseDto.cart_quantity)
            setIsPatching(false);
            setSuccessfulPatch(true);
        }
    };

    // const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const inputQuantity = parseInt(event.target.value);
    //     if (inputQuantity > 1) {
    //         setQuantity(inputQuantity);
    //     }
    // };

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


    return(
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
                                  increment={() => incrementOne(dto.pid,quantity)}
                                  decrement={() => decrementOne(dto.pid,quantity)}
                                  isPatching={isPatching}
                                  // handleQuantityChange={handleQuantityChange}
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
        <PatchCartItemSnackbar snackbarOpen={successfulPatch} setSnackbarOpen={setSuccessfulPatch}/>
        <DeleteCartItemSnackbar snackbarOpen={successfulDelete} setSnackbarOpen={setSuccessfulDelete}/>
    </>
    )
}