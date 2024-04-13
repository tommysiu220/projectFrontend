import {ProductDto} from "../../data/ProductDto.Type.ts";
import {Container} from "@mui/material";
import {useState} from "react";

type Props = {
    productDto: ProductDto;
}

const ProductDetailPageContainer = ({productDto}: Props) => {

    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setCount(value);
        }
    };

    return (
        <>
            <Container>
                <img width="150px" src={"./"}></img>
                <h1>{productDto.product_name}</h1>
                <h5>Description: {productDto.description}</h5>
                <h5>Price: ${productDto.price}</h5>
                <h5>Has Stock: {productDto.has_stock}</h5>

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
            </Container>
        </>
    );
};

export default ProductDetailPageContainer;