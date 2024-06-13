import { useContext, useEffect, useState } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function MealItem({ meal, del }) {

    

    const cartCtx = useContext(CartContext);

    const token = localStorage.getItem('token');
    const userRole = jwtDecode(token).role;

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }

        function handleDeleteMeal() {
            let id = meal.id;

            fetch('http://localhost:3000/' + id, {
                method: 'DELETE',
            }).then(res => res.json()).catch(err => console.log(err));

            
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
                    <Link className="link-mode">Edit</Link>
                    <Button className="link-mode" onClick={handleDeleteMeal}>Delete</Button>
                </p>}
            </article>
        </li>
    );

}