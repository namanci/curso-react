import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartWidget = () => {

    const { getTotalItems } = useCart()

    return (
        <div className="uk-iconnav">
            <Link className="uk-link-reset" to="/cart">
                <span href="" className="uk-icon"><svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" d="M7.5,7.5V4A2.48,2.48,0,0,1,10,1.5,2.54,2.54,0,0,1,12.5,4V7.5"></path><polygon fill="none" stroke="#000" points="16.5 7.5 3.5 7.5 2.5 18.5 17.5 18.5 16.5 7.5"></polygon></svg> ({getTotalItems()})</span>
            </Link>
        </div>
    )
}

export default CartWidget;