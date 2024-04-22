import * as CartItemApi from "../../../api/CartItemApi.ts"
import {useContext, useEffect, useState} from "react";
import {CartItemDto} from "../../../data/cartitem/CartItemDto.Type.ts";
import ShoppingCartContainer from "../../component/ShoppingCartContainer.tsx";
import LoadingPage from "../LoadingPage/LoadingPage.tsx";
// import {useNavigate} from "react-router-dom";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";

export default function ShoppingCartPage() {
    const [getCartItemDto, setGetCartItemDto] = useState<CartItemDto[] | undefined>(undefined);
    const loginUser = useContext<UserData | undefined | null>(LoginUserContext);
    // const navigate = useNavigate();

    const fetchGetCartItemDto = async () => {
        try {
            setGetCartItemDto(undefined);
            const responseGetCartItemDto = await CartItemApi.getUserCart();
            setGetCartItemDto(responseGetCartItemDto);
            console.log(responseGetCartItemDto)
        } catch (error) {
            // navigate to error page
        }
    }

    useEffect(() => {
        if (loginUser) {
            fetchGetCartItemDto().then();
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