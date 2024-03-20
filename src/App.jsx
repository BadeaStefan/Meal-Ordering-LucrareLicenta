import AuthenticationPage, { action as authAction } from "./pages/AuthenticationPage.jsx";
import MealsPage from "./pages/MealsPage.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WelcomePage from "./pages/WelcomePage.jsx";
import { checkAuthLoader } from './util/auth.js';


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
]);

function App() {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App;
