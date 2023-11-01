import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartView = ({title}) => {
    const { cart, removeFromCart, getTotalPrice } = useCart()

    const calculateSubtotal = (product) => product.precio * product.quantity

    return (
        <div className="uk-container uk-container-xsmall uk-margin-top">
            {cart.length === 0 ? (
                <>
                    <div className="uk-flex uk-flex-center uk-flex-middle" style={{ height: '64vh' }}>
                        <h1>El carrito está vacío</h1>
                    </div>
                    <div className="uk-text-center">
                        <Link to="/" className="uk-button uk-button-primary">Ir a comprar</Link>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <h1 className="uk-heading-bullet">{title}</h1>
                        {cart.map((product) => (
                            <div key={product.id} className="uk-card uk-card-default uk-card-small uk-margin">
                                <div className="uk-card-body">
                                    <div className="uk-card-badge uk-label">Cantidad: {product.quantity}</div>
                                    <p className="uk-text-meta uk-margin-remove-top"><strong>{product.subcategoria}</strong></p>
                                    <p className="uk-card-title">{product.nombre}</p>
                                    <p><strong>Precio unitario:</strong> US${product.precio}</p>
                                    <p><strong>Subtotal:</strong> US${calculateSubtotal(product).toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(product.id)} className="uk-button uk-button-danger">
                                        <span className="uk-icon"><svg width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"></polyline><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"></polyline><rect x="8" y="7" width="1" height="9"></rect><rect x="11" y="7" width="1" height="9"></rect><rect x="2" y="3" width="16" height="1"></rect></svg></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="uk-margin-top">
                        <h3>Total: US${getTotalPrice().toFixed(2)}</h3>
                        <div className="uk-flex uk-flex-around">
                            <button className="uk-button uk-button-primary">Pagar</button>
                            <Link to="/" className="uk-button uk-button-default">Seguir comprando</Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartView;