import ProductListingPage from "../ui/page/ProductListingPage";
import {createBrowserRouter} from "react-router-dom";
import React from "react";
import ProductDetailPage from "../ui/page/ProductDetailPage";
import ShoppingCartPage from "../ui/page/ShoppingCartPage";
import CheckoutPage from "../ui/page/CheckoutPage";
import LoginPage from "../ui/page/LoginPage";
import ThankyouPage from "../ui/page/ThankYouPage";
import ErrorPage from "../ui/page/ErrorPage";



export const router = createBrowserRouter([
    {
        path: "/",
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
        path: "/thankyou",
        element: <ThankyouPage/>
    },
    {
        path: "/error",
        element: <ErrorPage/>
    },
])