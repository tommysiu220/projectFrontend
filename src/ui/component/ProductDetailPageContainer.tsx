import {ProductDto} from "../../data/product/ProductDto.Type.ts";
import {Box, Container, TextField, Typography} from "@mui/material";
import {useState} from "react";

type Props = {
    productDto: ProductDto;
}

const ProductDetailPageContainer = ({productDto}: Props) => {

    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity((prevState) => (prevState + 1));
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity((prevState) => (prevState - 1));
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setQuantity(value);
        }
    };

    const minusButtonStyle = {
        height: "36px",
        width: "36px",
        borderRadius: 0,
        border: "black 2px solid",
        backgroundColor: "white",
        borderRight:0,
        outline: "none"
    }
    const plusButtonStyle = {
        height: "36px",
        width: "36px",
        borderRadius: 0,
        border: "black 2px solid",
        backgroundColor: "white",
        borderLeft:0,
        outline: "none"
    }

    const description = productDto.description;

    const formattedDescription = description.replace(/\\n/g, '<br>');

    return (

        <>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row', // or 'column' for vertical layout
                        // alignItems: 'center', // or 'flex-start', 'flex-end', 'baseline', 'stretch'
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

                        <div>
                            <button onClick={decrement}
                                    style={minusButtonStyle}>
                                -
                            </button>

                            {/*<TextField*/}
                            {/*    sx={{height: "24px"}}*/}
                            {/*    value={count}*/}
                            {/*    onChange={(e) => setCount(parseInt(e.target.value))}*/}
                            {/*/>*/}
                                <input style={{
                                    height: "36px",
                                    width: "48px",
                                    borderRadius: 0,
                                    border: "2px black solid",
                                    backgroundColor: "white",
                                    boxSizing: "border-box",
                                    borderLeft: 0,
                                    borderRight: 0,
                                    textAlign: "center",
                                    outline: "none"
                                }}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                            />

                            <button onClick={increment}
                                    style={plusButtonStyle}>
                                +
                            </button>

                        </div>
                    </div>
                </Box>

            </Container>
        </>
    );
};

export default ProductDetailPageContainer;