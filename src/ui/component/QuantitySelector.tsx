import {ChangeEvent} from "react";
import "../component/componentStyle.css"

type Props = {
    initQuantity: number;
    increment: (() => void) | ((pid: number, cartQuantity: number) => Promise<void>);
    decrement: (() => void) | ((pid: number, cartQuantity: number) => Promise<void>);
    isPatching: boolean;
    handleQuantityChange: (event: ChangeEvent<HTMLInputElement>) => void;
    // handleInputBlur: (pid: number, cartQuantity: number) => Promise<void>;
}

export const QuantitySelector = ({initQuantity, increment, decrement, handleQuantityChange, isPatching}: Props) => {
    // const [quantity, setQuantity] = useState(initQuantity);

    // const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = parseInt(event.target.value);
    //     if (!isNaN(value)) {
    //         setQuantity(value);
    //     }
    // };

    const minusButtonStyle = {
        height: "36px",
        width: "36px",
        borderRadius: 0,
        border: "black 2px solid",
        backgroundColor: "white",
        borderRight: 0,
        outline: "none"
    }
    const plusButtonStyle = {
        height: "36px",
        width: "36px",
        borderRadius: 0,
        border: "black 2px solid",
        backgroundColor: "white",
        borderLeft: 0,
        outline: "none"
    }

    return (
        <div>
            <button className={`${isPatching ? 'disabled-button' : ''}`}
                    onClick={decrement}
                    style={minusButtonStyle}
                    disabled={isPatching}
            >
                -
            </button>

            <input
                style={{
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
                value={initQuantity}

                onChange={handleQuantityChange}
                // onBlur={handleInputBlur}
            />

            <button className={`${isPatching ? 'disabled-button' : ''}`}
                    onClick={increment}
                    style={plusButtonStyle}
                    disabled={isPatching}
            >
                +
            </button>
        </div>
    )
}