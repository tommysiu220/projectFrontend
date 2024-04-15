import {ProductDto} from "../../data/ProductDto.Type.ts";
import {Box, Container, Typography} from "@mui/material";
import {useState} from "react";

type Props = {
    productDto: ProductDto;
}

const ProductDetailPageContainer = ({productDto}: Props) => {


    const [count, setCount] = useState(1);

    const increment = () => {
        setCount((prevState) => (prevState + 1));
    };

    const decrement = () => {
        if (count > 1) {
            setCount((prevState) => (prevState - 1));
        }
    };

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setCount(value);
        }
    };

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
                    <img height="650px" src={`/${productDto.image_url}`}></img>
                    <div>
                        <h2>{productDto.product_name}</h2>
                        {/*<Typography dangerouslySetInnerHTML={{__html: formattedDescription}} sx={{whiteSpace:"pre-line"}}/>*/}
                        <Typography sx={{whiteSpace:"pre-line"}}>
                            {productDto.description}
                        </Typography>
                        <h5>Price: ${productDto.price.toLocaleString()}</h5>

                        <Typography variant="body1" color={productDto.stock > 0 ? 'black' : 'red'}>
                            {productDto.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Typography>

                        <div>
                            <button onClick={decrement}>-</button>
                            <input
                                type="number"
                                value={count}
                                onChange={handleInputChange}
                                min={1} // Ensure the minimum value is 1

                            />
                            <button onClick={increment}>+</button>

                        </div>
                    </div>
                </Box>

            </Container>
        </>
    );
};

export default ProductDetailPageContainer;