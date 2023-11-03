import React, { useState } from "react";

const CheckoutForm = ({ onConfirm }) => {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        phoneNumber: "",
        email: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onConfirm(formData)
    }

    return (
        <div className="uk-card uk-card-default uk-card-body">
            <h2>Ingrese sus datos</h2>
            <form onSubmit={handleSubmit}>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="name">
                        Nombre:
                    </label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="lastName">
                        Apellido:
                    </label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="phoneNumber">
                        Teléfono:
                    </label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="email">
                        Correo Electrónico:
                    </label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button className="uk-button uk-button-primary" type="submit">Finalizar compra</button>
            </form>
        </div>
    )
}

export default CheckoutForm;