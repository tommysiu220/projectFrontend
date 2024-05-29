import {ProductDto} from "../../../data/product/ProductDto.Type.ts";
import {Box, Button, Container, Typography} from "@mui/material";
import {useState} from "react";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import {useNavigate} from "react-router-dom";
import {QuantitySelector} from "../QuantitySelector.tsx";
import AddToCartSuccessSnackbar from "./AddToCartSuccessSnackbar.tsx";

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

    // const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const value = parseInt(event.target.value);
    //     if (!isNaN(value)) {
    //         setQuantity(value);
    //     }
    // };

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

    return (

        <>
            <Container sx={{height: "90vh", display: "flex", justifyContent: "center", alignItems: "center",}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 'auto',
                        backgroundColor: "white",
                        borderRadius: "20px",
                    }}
                    className={"container"}
                >
                    <div style={{marginTop: "16px"}}>
                        <img height="650px" src={productDto.image_url}/>
                    </div>

                    <div style={{marginTop: "16px", color: "black", position: "relative"}}>
                        <h2>{productDto.product_name}</h2>
                        {/*<Typography dangerouslySetInnerHTML={{__html: formattedDescription}} sx={{whiteSpace:"pre-line"}}/>*/}
                        <Typography sx={{whiteSpace: "pre-line"}}>
                            {productDto.description}
                        </Typography>
                        {/*<br/>*/}
                        {/*<br/>*/}
                        {/*<Typography variant="body1">*/}
                        {/*    Price: ${productDto.price.toLocaleString()}*/}
                        {/*</Typography>*/}
                        {/*<Typography variant="body1" color={productDto.stock > 0 ? 'black' : 'red'}>*/}
                        {/*    {productDto.stock > 0 ? 'In Stock' : 'Out of Stock'}*/}
                        {/*</Typography>*/}
                        <div style={{
                            position: "absolute",
                            bottom: "15%",
                            width: "100%",
                        }}>
                            <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    position: "relative",
                            }}>
                            <Typography variant="body1">
                                Price: ${productDto.price.toLocaleString()}
                            </Typography>
                            <Typography variant="body1" color={productDto.stock > 0 ? 'black' : 'red'}>
                                {productDto.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </Typography>
                            </div>
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
                                        <QuantitySelector initQuantity={quantity}
                                                          increment={increment}
                                                          decrement={decrement}
                                                          isPatching={false}
                                            // handleQuantityChange={handleQuantityChange}
                                        />
                                        <Button style={{
                                            height: "36px",
                                            width: "112px",
                                            borderRadius: 0,
                                            border: "2px black solid",
                                            backgroundColor: "white",
                                            textAlign: "center",
                                            outline: "none",
                                            color: "black",
                                        }}
                                                onClick={() => {
                                                    handleAddToCart(productDto.pid, quantity)
                                                }}
                                                disabled={isAddingToCart}
                                        >
                                            ADD TO CART
                                        </Button>
                                    </div>
                                </div>
                                : <></>
                        }

                    </div>
                </Box>
                <AddToCartSuccessSnackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen}/>
            </Container>
        </>
    );
};

export default ProductDetailPageContainer;