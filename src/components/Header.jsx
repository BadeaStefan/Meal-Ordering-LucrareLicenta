import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Header() {
    const token = localStorage.getItem('token');
    const userRole = jwtDecode(token).role;

    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/');
    }


    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A Restaurant"></img>
                <h1>Food Ordering App</h1>
            </div>
            <nav>
                {userRole === 'client' && < Button textOnly={true} onClick={handleShowCart}>Cart ({totalCartItems})</Button>}
                {userRole === 'admin' && <Link to="/mealinfo" className="link-mode">Add Meal</Link>}
                <Button onClick={handleLogout}>Logout</Button>
            </nav>
        </header>

    );
}