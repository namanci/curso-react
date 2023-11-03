import React, { useState, } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { doc, collection, addDoc, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const Checkout = ({title}) => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')

    const { cart, getTotalPrice, clearCart } = useCart()

    const createOrder = async ({ name, lastName, phoneNumber, email }) => {
        const objOrder = {
            name,
            lastName,
            phoneNumber,
            email,
            items: cart,
            total: getTotalPrice(),
            date: new Date().toLocaleString(),
        }

        const batch = writeBatch(db)

        // Mediante una consulta buscamos los documentos por el campo 'id'.
        const productQuery = query(collection(db, 'productos.next'), where('id', 'in', cart.map((item) => item.id)))

        // Obtenemos los documentos correspondientes a los ítems del carrito.
        const productDocs = await getDocs(productQuery)

        // Comprobamos el stock antes de realizar la compra.
        productDocs.forEach((productDoc) => {
            const item = cart.find((item) => item.id === productDoc.data().id)

            if (item) {
                const stockAvailable = productDoc.data().stock

                if (item.quantity > stockAvailable) {
                    throw new Error(`Fuera de stock: ${item.nombre}`)
                }

                const productRef = doc(db, 'productos.next', productDoc.id)
                batch.update(productRef, {
                    stock: stockAvailable - item.quantity,
                })
            }
        })

        const ordersCollectionRef = collection(db, 'ordenes')
        const newOrderRef = await addDoc(ordersCollectionRef, objOrder)

        // Realizamos las escrituras en la base de datos para actualizar stock y guardar la orden de compra.
        await batch.commit()

        setLoading(true)
        setTimeout(() => {
            setOrderId(newOrderRef.id)
            clearCart()
            setLoading(false)
        }, 2000)
    }

    if (loading) {
        return (
            <div className="uk-flex uk-flex-center uk-flex-middle" style={{ height: '64vh' }}>
                <h1>Procesando compra...</h1>
            </div>
        )
    }

    if (orderId) {
        return (
            <>
                <div className="uk-flex uk-flex-center uk-flex-middle" style={{ height: '64vh' }}>
                    <div>
                        <h1>¡COMPRA EXITOSA!</h1>
                        <p>ID: {orderId}</p>
                    </div>
                </div>
                <div className="uk-text-center">
                    <Link to="/" className="uk-button uk-button-primary">Listo</Link>
                </div>
            </>
        )
    }

    return (
        <div className="uk-container uk-container-xsmall uk-margin-top">
            <h1 className="uk-heading-bullet">{title}</h1>
            <CheckoutForm onConfirm={createOrder} />
        </div>
    )
}

export default Checkout;