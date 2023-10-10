import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import productosJSON from '../../products.json';

const ItemDetail = () => {
    const { id } = useParams()
    const [item, setProduct] = useState(null)

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
                        <div class="uk-card-badge uk-label">{item.subcategoria}</div>
                        <h2 className="uk-card-title">{item.nombre}</h2>
                        <p>{item.descripcion}</p>
                        <p><b>Especificaciones:</b> {item.especificaciones_tecnicas}</p>
                        <p><b>Precio:</b> US${item.precio}</p>
                        <br></br>
                        <ItemCount initial={1} stock={25} onAdd={(quantity) => console.log('Cantidad ', quantity)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;