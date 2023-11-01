import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = (product, quantity) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id) // Verificamos si el producto ya se encuentra en el carrito utilizando el método findIndex.

        if (existingProductIndex !== -1) {
            // Si el producto se encuentra en el carrito, sólo actualizamos la cantidad.
            const updatedCart = [...cart]
            updatedCart[existingProductIndex].quantity += quantity
            setCart(updatedCart)
        } else {
            setCart([...cart, { ...product, quantity }]) // Si el producto no se encuentra en el carrito, es agregado.
        }
    }

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId)
        setCart(updatedCart)
    }

    const clearCart = () => {
        setCart([])
    }

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0)
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.quantity * item.precio, 0)
    }

    const isInCart = (productId) => {
        return cart.some((item) => item.id === productId)
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice, isInCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}