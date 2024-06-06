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
      allProductListRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }


  useEffect(() => {
    setTimeout(fetchGetAllProductDto, 0);
  }, []);

  return (
    <Box>
      <TopNavBar/>
      {/*<NavBar2/>*/}
      <Box
        className="video-background-container"
      >
        <video
          className="video-background"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
        >
          <source src="https://fsse2401-project-tommy.s3.ap-southeast-1.amazonaws.com/productpage.mp4"/>
        </video>
        <div
          className="product-listing-description unselectable"
        >
          You miss the shot
          <div style={{height: "1rem"}}></div>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          you don't take
        </div>
        <div
          className="shop-now-button unselectable"
          onClick={handleShopNowClick}
        >
          SHOT NOW !
        </div>
      </Box>

      {
        getAllProductDto
          ? (
            <div className="all-product-list" ref={allProductListRef}>
              <div className="product-list-heading">
                ALL Product
              </div>
              <Container >
                <CardGrid getAllProductDtoList={getAllProductDto}/>
              </Container>
            </div>
          )
          : <LoadingPage/>
      }
    </Box>
  )
}