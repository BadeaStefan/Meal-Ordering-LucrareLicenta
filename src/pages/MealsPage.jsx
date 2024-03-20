import Cart from "../components/Cart.jsx";
import Checkout from "../components/Checkout.jsx";
import Header from "../components/Header.jsx";
import Meals from "../components/Meals.jsx";
import { CartContextProvider } from '../store/CartContext.jsx';
import { UserProgressContextProvider } from "../store/UserProgressContext.jsx";

export default function MealsPage() {
    return (
        <>
            <UserProgressContextProvider>
                <CartContextProvider>
                    <Header></Header>
                    <Meals></Meals>
                    <Cart></Cart>
                    <Checkout></Checkout>
                </CartContextProvider>
            </UserProgressContextProvider>
        </>
    );
}


