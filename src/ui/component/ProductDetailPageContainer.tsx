import {ProductDto} from "../../data/product/ProductDto.Type.ts";
import {Box, Container, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import * as CartItemApi from "../../api/CartItemApi.ts"
import {useNavigate} from "react-router-dom";
import {QuantitySelector} from "./QuantitySelector.tsx";
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

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setQuantity(value);
        }
    };

    // const minusButtonStyle = {
    //     height: "36px",
    //     width: "36px",
    //     borderRadius: 0,
    //     border: "black 2px solid",
    //     backgroundColor: "white",
    //     borderRight: 0,
    //     outline: "none"
    // }
    // const plusButtonStyle = {
    //     height: "36px",
    //     width: "36px",
    //     borderRadius: 0,
    //     border: "black 2px solid",
    //     backgroundColor: "white",
    //     borderLeft: 0,
    //     outline: "none"
    // }
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
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row', // or 'column' for vertical layout
                        justifyContent: 'space-between', // or 'center', 'flex-start', 'flex-end', 'space-around', 'space-evenly'
                        height: 'auto', // for example, to make the container fill the viewport height
                    }}
                >
                    <div style={{marginTop: "16px"}}>
                        <img height="650px" src={`/${productDto.image_url}`}/>
                    </div>

                    <div style={{marginTop: "16px"}}>
                        <h2>{productDto.product_name}</h2>
                        {/*<Typography dangerouslySetInnerHTML={{__html: formattedDescription}} sx={{whiteSpace:"pre-line"}}/>*/}
                        <Typography sx={{whiteSpace: "pre-line"}}>
                            {productDto.description}
                        </Typography>
                        <h5>Price: ${productDto.price.toLocaleString()}</h5>

                        <Typography variant="body1" color={productDto.stock > 0 ? 'black' : 'red'}>
                            {productDto.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Typography>

                        {
                            productDto.stock > 0
                                ? <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <QuantitySelector initQuantity={quantity}
                                                      increment={increment}
                                                      decrement={decrement}
                                                      isPatching={false}
                                                      handleQuantityChange={handleQuantityChange}
                                    />
                                    <button style={{
                                        height: "36px",
                                        width: "112px",
                                        borderRadius: 0,
                                        border: "2px black solid",
                                        backgroundColor: "white",
                                        textAlign: "center",
                                        outline: "none"
                                    }}
                                            onClick={() => {
                                                handleAddToCart(productDto.pid, quantity)
                                            }}
                                            disabled={isAddingToCart}
                                    >
                                        ADD TO CART
                                    </button>
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