import {ProductDto} from "../../../data/product/ProductDto.Type.ts";
import {Container, Divider, Skeleton, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import {useNavigate} from "react-router-dom";
import {QuantitySelector} from "../QuantitySelector/QuantitySelector.tsx";
import AddToCartSuccessSnackbar from "./AddToCartSuccessSnackbar.tsx";
import "./productDetailContainerStyle.css"
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Mousewheel, Navigation, Pagination} from "swiper/modules";
import YouMightAlsoLikeList from "../YouMightAlsoLikeList/YouMightAlsoLikeList.tsx";
import * as productApi from "../../../api/ProductApi.ts";

type Props = {
  productDto: ProductDto;
}

const ProductDetailPageContainer = ({productDto}: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const increment = () => {
    setQuantity((prevState) => (prevState + 1));
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevState) => (prevState - 1));
    }
  };

  const handleAddToCart = async (pid: number, quantity: number) => {
    try {
      setIsAddingToCart(true);
      await CartItemApi.putCartItem(pid, quantity);
      console.log("Successfully Added")
      setIsAddingToCart(false);
      setSnackbarOpen(true);
    } catch (error) {
      navigate("/error")
    }
  }

  const [itemList, setItemList] = useState<ProductDto[]>();
  const genItemList = async () => {
    const newRandomNumbers = [];
    const usedNumbers = new Set();

    while (usedNumbers.size < 4) {
      const randomNumber = Math.floor(Math.random() * 12) + 1;
      if (!usedNumbers.has(randomNumber) && randomNumber !== productDto.pid) {
        usedNumbers.add(randomNumber);
        newRandomNumbers.push(randomNumber);
      }
    }

    const result: ProductDto[] = [];
    const responseAllProduct = await productApi.getAllProduct();

    for (let i = 0; i < newRandomNumbers.length; i++) {
      for (let j = 0; j < responseAllProduct.length; j++) {
        if (responseAllProduct[j].pid===newRandomNumbers[i]){
          result.push(responseAllProduct[j]);
          break;
        }
      }
    }
    console.log(result)
    setItemList(result)
  };

  useEffect(() => {
    genItemList();
  }, []);

  return (

    <>
      <Container sx={{
        height: '100vh',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div className="detail-page-container" style={{display: "flex", flexDirection: "column"}}>
          <div className="detail-container">
            <div className="product-img-swiper-container">
              <Swiper
                className="product-img-swiper unselectable"
                loop={true}
                navigation={true}
                mousewheel={true}
                pagination={true}
                modules={[Navigation, Mousewheel, Pagination]}
                style={{
                  backgroundColor: "white",
                  width: "500px",
                  height: "550px",
                  margin: "0 20px 0 20px"}}>
                <SwiperSlide style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img className="product-img" src={productDto.image_url}/>
                </SwiperSlide>
                <SwiperSlide style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img className="product-img" src={productDto.image_url2}/>
                </SwiperSlide>
                <SwiperSlide style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img className="product-img" src={productDto.image_url3}/>
                </SwiperSlide>
              </Swiper>
            </div>
              <div className="product-img-swiper-container-850">
              <Swiper
                className="product-img-swiper-850 unselectable"
                loop={true}
                navigation={true}
                mousewheel={true}
                pagination={true}
                modules={[Navigation, Mousewheel, Pagination]}
                style={{
                  backgroundColor: "white",
                  height:"360px",
                  width:"320px",
                  }}>
                <SwiperSlide style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img className="product-img" src={productDto.image_url}/>
                </SwiperSlide>
                <SwiperSlide style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img className="product-img" src={productDto.image_url2}/>
                </SwiperSlide>
                <SwiperSlide style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img className="product-img" src={productDto.image_url3}/>
                </SwiperSlide>
              </Swiper>
            </div>


            <div
              className="product-info-container"
              style={{marginTop: "8px", color: "black", position: "relative"}}
            >
              <div
                className="product-name"
              >
                {productDto.product_name}
              </div>
              <br/>
              <div className="product-des" style={{whiteSpace: "pre-line"}}>
                {productDto.description}
              </div>
              <br/>
              <div className="product-des">
                Price: ${productDto.price.toLocaleString()}
              </div>

              <div className="product-des" color={productDto.stock > 0 ? 'black' : 'red'}>
                {productDto.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>

              {
                productDto.stock > 0
                  ?
                  <div style={{
                    position: "absolute",
                    bottom: "5%",
                    width: "100%",
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      position: "relative",
                    }}>
                      <QuantitySelector
                        initQuantity={quantity}
                        increment={increment}
                        decrement={decrement}
                        isPatching={false}
                      />
                      <button
                        className="add-to-cart-button"
                        onClick={() => {
                          handleAddToCart(productDto.pid, quantity)
                        }}
                        disabled={isAddingToCart}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                  : <></>
              }
            </div>
          </div>
          <div className="you-may-like-container">
          <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
            <Divider sx={{width: "98%", border: "1px solid rgba(0,0,0,0.3)"}}/>
          </div>
          <Typography className="unselectable" style={{margin: "12px 24px", color: "grey"}}>YOU MIGHT ALSO LIKE</Typography>
          {
            itemList
              ? <YouMightAlsoLikeList randomItemList={itemList}/>
              :
              <div style={{margin: "12px 24px", display: "flex", justifyContent: "space-between"}}>
                {
                  Array.from({length: 4}).map(() => (
                    <div className="skeleton-container">
                      <Skeleton variant="rounded" width={200} height={200} style={{marginBottom: "8px"}}/>
                      <Skeleton width="100%"/>
                      <Skeleton width="100%"/>
                      <Skeleton width="70%" style={{justifyContent: "right"}}/>
                    </div>
                  ))
                }
              </div>
          }
          </div>
        </div>

        <AddToCartSuccessSnackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen}/>
      </Container>
    </>
  );
};

export default ProductDetailPageContainer;