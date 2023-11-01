import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import { useCart } from "../../context/CartContext";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";

const ItemDetail = () => {
    const { id } = useParams()
    const { addToCart } = useCart()
    const { isInCart } = useCart()
    const [item, setProduct] = useState(null)
    const [quantityAdded, setQuantityAdded] = useState(0)

    const handleAdded = (quantity) => {
        setQuantityAdded(quantity)
        addToCart(item, quantity)
    }

    useEffect(() => {

        const collectionRef = collection(db, 'productos.next') // Referencia a la colección de Firestore.

        const idQuery = query(collectionRef, where('id', '==', parseInt(id, 10))) // Mediante una consulta buscamos el documento que contenga el campo id correspondiente.

        getDocs(idQuery)
            .then((queryResponse) => {
                queryResponse.forEach((doc) => {
                    const productData = doc.data()
                    setProduct(productData)
                })
            })
            .catch((error) => {
                console.error('Error al obtener el producto: ', error)
            })

    }, [id])

    if (!item) {
        return <div className="uk-container"><div className="uk-margin-top" data-uk-spinner></div></div>
    }

    return (
        <div className="uk-container uk-margin-top">
            <div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" data-uk-grid>
                <div className="uk-card-media-left uk-cover-container">
                    <img src={item.imagen} alt={item.nombre} className="uk-cover" />
                </div>
                <div>
                    <div className="uk-card-body">
                        <div className="uk-card-badge uk-label">Disponibles: {item.stock}</div>
                        <h2 className="uk-card-title">{item.nombre}</h2>
                        <p>{item.descripcion}</p>
                        <p><b>Especificaciones:</b> {item.especificaciones}</p>
                        <p><b>Precio:</b> US${item.precio}</p>
                        <br></br>
                        {
                            quantityAdded > 0 || isInCart(item.id) ? (
                                <div className="uk-flex uk-flex-center">
                                    <div>
                                        <p><strong>Tienes este producto en tu carrito.</strong></p>
                                        <Link to="/cart" className="uk-align-center uk-button uk-button-default uk-button-large">Ver carrito</Link>
                                    </div>
                                </div>
                            ) : (
                                <ItemCount initial={1} stock={item.stock} onAdd={handleAdded} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;