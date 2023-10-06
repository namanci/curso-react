import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const ItemList = ({category}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        // Simulamos un retraso de un segundo y medio.
        setTimeout(() => {
            const productosJSON = require("../../products.json")
            const filterProducts = category ? productosJSON.productos.filter((item) => item.categoria === category) : productosJSON.productos
            setProducts(filterProducts)
            setLoading(false)
        }, 1500)
    }, [category])

    return (
        <div className="uk-container">
            {loading ? (
                <div data-uk-spinner></div>
            ) : (
                <div className="uk-grid uk-child-width-1-4@s" data-uk-grid data-uk-height-match="target: > div > .uk-card; row: false">
                    {products.map((item) => (
                        <div key={item.id}>
                            <div className="uk-card uk-card-default">
                                <div className="uk-card-media-top">
                                    <img src={item.imagen} alt={item.nombre} />
                                </div>
                                <div className="uk-card-body">
                                    <div className="uk-card-badge uk-label">{item.subcategoria}</div>
                                    <h3 className="uk-card-title">{item.nombre}</h3>
                                    <p>US$ {item.precio}</p>
                                </div>
                                <div className="uk-card-footer">
                                    <Link to={`/producto/${item.id}`} className="uk-button uk-button-text">Ver detalles...</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ItemList;