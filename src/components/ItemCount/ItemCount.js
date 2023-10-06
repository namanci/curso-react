import { useState } from "react";

const ItemCount = ({stock, initial, onAdd}) => {
    const [quantity, setQuantity] = useState(initial)
    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity+1)
        }
    }
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity-1)
        }
    }

    return (
        <div>
            <div className="uk-flex uk-flex-around uk-flex-center">
                <button className="uk-button uk-button-primary uk-button-small" onClick={increment}>+</button>
                <div className="uk-margin-small">{quantity}</div>
                <button className="uk-button uk-button-danger uk-button-small" onClick={decrement}>-</button>
            </div>
            <br></br>
            <div className="uk-flex uk-flex-center">
                <button className="uk-button uk-button-default uk-button-large" onClick={() => onAdd(quantity)} disabled={!stock}>Agregar al Carrito</button>
            </div>
        </div>
    )
}

export default ItemCount;