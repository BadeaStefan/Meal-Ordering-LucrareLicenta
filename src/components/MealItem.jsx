import { useContext, useState } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import { jwtDecode } from 'jwt-decode';
export default function MealItem({ meal }) {
    const cartCtx = useContext(CartContext);

    const token = localStorage.getItem('token');
    const userRole = jwtDecode(token).role;

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                {userRole === 'client' && <p className="meal-item-actions">
                    < Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>}
                {userRole === 'admin' && <p className="meal-item-actions">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </p>}
            </article>
        </li>
    );

}