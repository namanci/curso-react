import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import productosJSON from '../../products.json';
import { useCart } from "../../context/CartContext";

const ItemDetail = () => {
    const { id } = useParams()
    const { addToCart } = useCart()
    const [item, setProduct] = useState(null)
    const [quantityAdded, setQuantityAdded] = useState(0)
    
    const handleAdded = (quantity) => {
        setQuantityAdded(quantity)
        addToCart(item, quantity)
    }

    useEffect(() => {
        setTimeout(() => {
            const foundProduct = productosJSON.productos.find(
                (item) => item.id === parseInt(id, 10)
            )

            setProduct(foundProduct)
        }, 500)
    }, [id])

    if (!item) {
        return <div className="uk-container" data-uk-spinner><p>Cargando...</p></div>
    }

    return (
        <div className="uk-container uk-margin-top">
            <div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" data-uk-grid>
                <div className="uk-card-media-left uk-cover-container">
                    <img src={item.imagen} alt={item.nombre} className="uk-cover" />
                </div>
                <div>
                    <div className="uk-card-body">
                        <div className="uk-card-badge uk-label">{item.subcategoria}</div>
                        <h2 className="uk-card-title">{item.nombre}</h2>
                        <p>{item.descripcion}</p>
                        <p><b>Especificaciones:</b> {item.especificaciones_tecnicas}</p>
                        <p><b>Precio:</b> US${item.precio}</p>
                        <br></br>
                        {
                            quantityAdded > 0 ? (
                                <div className="uk-flex uk-flex-center">
                                    <Link to="/cart" className="uk-button uk-button-default uk-button-large">Finalizar compra</Link>
                                </div>
                            ) : (
                                <ItemCount initial={1} stock={25} onAdd={handleAdded}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;