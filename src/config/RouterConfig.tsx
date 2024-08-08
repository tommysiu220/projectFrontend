import ProductListingPage from "../ui/page/ProductListingPage";
import {createBrowserRouter} from "react-router-dom";
import ProductDetailPage from "../ui/page/ProductDetailPage";
import ShoppingCartPage from "../ui/page/ShoppingCartPage";
import CheckoutPage from "../ui/page/CheckoutPage";
import LoginPage from "../ui/page/LoginPage";
import ThankyouPage from "../ui/page/ThankyouPage";
import ErrorPage from "../ui/page/ErrorPage";
import LandingPage from "../ui/page/LandingPage";
import LoadingPage from "../ui/page/LoadingPage";
import Thanks from "../ui/page/Thanks";



export const router = createBrowserRouter([
    {
        path: "/productlist",
        element: <ProductListingPage/>,
        errorElement:<ErrorPage/>
    },
    {
        path: "/product/:pid",
        element: <ProductDetailPage/>
    },
    {
        path: "/shoppingcart",
        element: <ShoppingCartPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/checkout/:transactionId",
        element: <CheckoutPage/>
    },
    {
        path: "/thankyou/:transactionId",
        element: <ThankyouPage/>
    },
    {
        path: "/error",
        element: <ErrorPage/>
    },
    {
        path: "/",
        element: <LandingPage/>,
    },
    {
        path: "/loading",
        element: <LoadingPage/>,
    },
    {
        path: "/thanks",
        element: <Thanks/>,
    },
])