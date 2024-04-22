import TopNavBar from "../../component/NavBar/TopNavBar.tsx";
import {Box, Container} from "@mui/material";
import CardGrid from "../../component/CardGrid.tsx";
import {ProductDto} from "../../../data/product/ProductDto.Type.ts";
import {useEffect, useState} from "react";
import * as ProductDtoApi from "../../../api/ProductApi.ts"
import LoadingPage from "../LoadingPage/LoadingPage.tsx";
import {useNavigate} from "react-router-dom";

export default function ProductListingPage() {
    const [getAllProductDto, setGetAllProductDto] = useState<ProductDto[] | undefined>(undefined);
    const navigate = useNavigate();

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

    useEffect(() => {
        setTimeout(fetchGetAllProductDto,1500);
    }, []);

    // const renderProductList = () => {
    //     if (getAllProductDto) {
    //         const productResultList = getAllProductDto.map((value) => {
    //             return {
    //                 name: value.dt).format("DD/MM/YYYY HH:mm:ss"),
    //                 temperature: value.main.temp,
    //                 humidity: value.main.humidity,
    //             }
    //         })
    //         return <WeatherChart chartDataList={chartDataList}/>
    //     }
    // }

    return (
        <Box>

            {
                getAllProductDto
                    ? (
                        <div>
                            <TopNavBar/>
                            <Container sx={{marginTop:4}}>
                                <CardGrid getAllProductDtoList={getAllProductDto}/>
                            </Container></div>
                    )
                    : <LoadingPage/>
            }

        </Box>
    )
}