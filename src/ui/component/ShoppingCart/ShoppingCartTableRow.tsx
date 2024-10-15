import {CartItemDto} from "../../../data/cartitem/CartItemDto.Type.ts";
import {Divider, Grid,} from "@mui/material";
import {QuantitySelector} from "../QuantitySelector/QuantitySelector.tsx";
import * as CartItemApi from "../../../api/CartItemApi.ts";
import {Dispatch, SetStateAction, useState} from "react";
import PatchCartItemSnackbar from "./PatchCartItemSnackbar.tsx";
import DeleteCartItemSnackbar from "./DeleteCartItemSnackbar.tsx";
import {useNavigate} from "react-router-dom";
import './shoppingCartTableRowStyle.css'
type Props = {
  dto: CartItemDto;
  cartItemDtoList: CartItemDto[];
  setCartItemDtoList: Dispatch<SetStateAction<CartItemDto[] | undefined>>;
}
export default function ShoppingCartTableRow({dto, cartItemDtoList, setCartItemDtoList}: Props) {

  const [isPatching, setIsPatching] = useState<boolean>(false);
  const [successfulDelete, setSuccessfulDelete] = useState<boolean>(false);
  const [successfulPatch, setSuccessfulPatch] = useState<boolean>(false);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(dto.cart_quantity)

  const incrementOne = async (pid: number, cartQuantity: number) => {
    if (dto.stock >= (cartQuantity + 1)) {
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


  const handleDeleteCartItem = async (pid: number) => {
    try {
      setIsPatching(true);
      await CartItemApi.deleteCartItem(pid);
      const updateDtoList = cartItemDtoList.filter((item) => (
        item.pid !== pid
      ));
      setCartItemDtoList(updateDtoList)
      setIsPatching(false);
      setSuccessfulDelete(true);
    } catch (error) {
      navigate("/error");
    }
  }


  return (
    <>
      <Grid sx={{my: 1}} container>
        <Grid item xs={3}
              sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <img className="shopping-cart-product-img" src={dto.image_url}/>
        </Grid>
        <Grid item xs={4} sx={{display: "flex", alignItems: "center",}}>
          <div className="shopping-cart-product-name">
            {dto.name}
          </div>
        </Grid>
        <Grid item xs={2}
              sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div className="shopping-cart-product-price">
            HKD {dto.price.toLocaleString()}
          </div>
        </Grid>
        <Grid item xs={3}
              sx={{display: "flex", alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap"}}
              py={3}
        >
          <QuantitySelector initQuantity={dto.cart_quantity}
                            increment={() => incrementOne(dto.pid, quantity)}
                            decrement={() => decrementOne(dto.pid, quantity)}
                            isPatching={isPatching}
          />
          <button
            className="remove-button"
            onClick={() => {
              handleDeleteCartItem(dto.pid).then()
            }}
            disabled={isPatching}
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