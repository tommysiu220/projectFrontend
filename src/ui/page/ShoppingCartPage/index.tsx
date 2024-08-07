import * as CartItemApi from "../../../api/CartItemApi.ts"
import {useContext, useEffect, useState} from "react";
import {CartItemDto} from "../../../data/cartitem/CartItemDto.Type.ts";
import ShoppingCartContainer from "../../component/ShoppingCart/ShoppingCartContainer.tsx";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import LoadingPage from "../LoadingPage";

export default function ShoppingCartPage() {
  const [getCartItemDto, setGetCartItemDto] = useState<CartItemDto[] | undefined>(undefined);
  const loginUser = useContext<UserData | undefined | null>(LoginUserContext);
  const navigate = useNavigate();

  const fetchGetCartItemDto = async () => {
    try {
      const responseGetCartItemDto = await CartItemApi.getUserCart();
      setGetCartItemDto(responseGetCartItemDto);
    } catch (error) {
      // navigate to error page
      navigate('/error')
    }
  }

  useEffect(() => {
    if (loginUser) {
      fetchGetCartItemDto().then();
    } else if (loginUser === null) {
      navigate('/login')
    }
  }, [loginUser]);
  return (
    <>
      {
        getCartItemDto
          ? <ShoppingCartContainer cartItemDtoList={getCartItemDto} setCartItemDtoList={setGetCartItemDto}/>
          : <LoadingPage/>
      }
    </>
  )
}