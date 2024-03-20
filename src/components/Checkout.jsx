import { useContext, useEffect, useState } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from '../util/formatting.js';
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout() {
    const [submitted, setSubmitted] = useState(false);

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) =>
        totalPrice + item.quantity * item.price, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
        setSubmitted(false);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        }).then((res) => {
            if (res.status === 201) {
                setSubmitted(true);
            }
        });
    }

    if (submitted) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
                <h2>Succes!</h2>
                <p>Your order was submitted succesfully</p>
                <p className="modal-action">
                    <Button onClick={handleClose}>Okay</Button>
                </p>
            </Modal>
        )
    }
    
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name"></Input>
                <Input label="Email Address" type="email" id="email"></Input>
                <Input label="Street" type="text" id="street"></Input>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"></Input>
                    <Input label="City" type="text" id="city"></Input>
                </div>
                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}