import TopNavBar from "../../component/NavBar/TopNavBar.tsx";
import {Box, Container} from "@mui/material";
import CardGrid from "../../component/CardGrid.tsx";
import {ProductDto} from "../../../data/product/ProductDto.Type.ts";
import {useEffect, useRef, useState} from "react";
import * as ProductDtoApi from "../../../api/ProductApi.ts"
import LoadingPage from "../LoadingPage/LoadingPage.tsx";
import {useNavigate} from "react-router-dom";
import "./productListingStyle.css";

export default function ProductListingPage() {
    const [getAllProductDto, setGetAllProductDto] = useState<ProductDto[] | undefined>(undefined);
    const navigate = useNavigate();
    const allProductListRef = useRef<HTMLDivElement>(null);

    const fetchGetAllProductDto = async () => {
        try {
            setGetAllProductDto(undefined);
            const responseGetAllProductDto = await ProductDtoApi.getAllProduct();
            setGetAllProductDto(responseGetAllProductDto);

        } catch (error) {
            // navigate to error page
            navigate("/error");
        }
    }

    const handleShopNowClick = () => {
        if (allProductListRef.current) {
            allProductListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }


    useEffect(() => {
        setTimeout(fetchGetAllProductDto, 0);
    }, []);

    return (
        <Box>
            <TopNavBar/>
            <Box sx={{
                display: "flex",
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>
                <video autoPlay={true} style={{height:"100%", width:"100vw", }} muted={true} loop={true}>
                    <source src="https://fsse2401-project-tommy.s3.ap-southeast-1.amazonaws.com/productpage.mp4"/>
                </video>
                <div
                  className="productListingDescription unselectable"
                >
                    You miss the shot
                    <div style={{height: "1rem"}}></div>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you don't take
                </div>
                <div
                  className="shopNowButton unselectable"
                  onClick={handleShopNowClick}
                >
                    SHOP NOW
                </div>
            </Box>

            {
                getAllProductDto
                  ? (
                    <div className="allProductList" ref={allProductListRef}>
                        <Container sx={{marginTop: 4}}>
                            <CardGrid getAllProductDtoList={getAllProductDto}/>
                            </Container></div>
                    )
                    : <LoadingPage/>
            }

        </Box>
    )
}