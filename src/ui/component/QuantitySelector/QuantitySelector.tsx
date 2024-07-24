import './quantitySelectorStyle.css'

type Props = {
    initQuantity: number;
    increment: () => void;
    decrement: () => void;
    isPatching: boolean;

}

export const QuantitySelector = ({initQuantity, isPatching,increment,decrement}: Props) => {

    return (
      <div style={{display:'flex'}} className="unselectable">
        <button
          className={`${isPatching ? 'disabled-minus-button' : 'minus-button'}`}
          onClick={decrement}
          disabled={isPatching}
        >
          -
        </button>

        <div className="quantity">
            {initQuantity}
        </div>

        <button
          className={`${isPatching ? 'disabled-plus-button' : 'plus-button'}`}
          onClick={increment}
          disabled={isPatching}
        >
          +
        </button>
      </div>
    )
}