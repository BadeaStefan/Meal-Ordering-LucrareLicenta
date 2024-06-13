import AuthenticationPage, { action as authAction } from "./pages/AuthenticationPage.jsx";
import MealsPage from "./pages/MealsPage.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WelcomePage from "./pages/WelcomePage.jsx";
import { checkAuthLoader } from './util/auth.js';
import MealInfoPage from "./pages/MealInfoPage.jsx";
import { action as mealAction } from './components/MealForm.jsx';
import EditMealPage from './pages/EditMealPage.jsx'
import { action as editAction } from './components/MealEditForm.jsx';



const router = createBrowserRouter([

    {
        path: '/',
        element: <WelcomePage></WelcomePage>,
    },
    {
        path: '/meals',
        element: <MealsPage></MealsPage>,
        loader: checkAuthLoader,
    },
    {
        path: '/auth',
        element: <AuthenticationPage></AuthenticationPage>,
        action: authAction,
    },
    {
        path: '/mealinfo',
        element: <MealInfoPage></MealInfoPage>,
        action: mealAction,
    },
    {
        path: '/edit/:id',
        element: <EditMealPage></EditMealPage>,
        action: editAction,
    }

]);

function App() {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App;
