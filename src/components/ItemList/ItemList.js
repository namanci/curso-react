import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const ItemList = ({ category }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)

        const collectionRef = collection(db, 'productos.next') // Referencia a la colección de Firestore.

        const catQuery = category ? query(collectionRef, where('categoria', '==', category)) : collectionRef // Mediante una consulta, si recibimos una categoría filtramos los productos.

        getDocs(catQuery) // Obtenemos los documentos.
            .then((queryResponse) => {
                const productsArray = []
                queryResponse.forEach((doc) => {
                    productsArray.push({ id: doc.id, ...doc.data() }) // "Pushamos" los documentos a un Array de productos.
                })

                setProducts(productsArray)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error al obtener productos: ', error)
            })
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