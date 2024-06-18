import { Form, useNavigate, Link, json, redirect, useLocation } from 'react-router-dom';
import Button from './UI/Button';
import { jwtDecode } from 'jwt-decode';



export default function MealEditForm() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const meal = state;

    console.log(meal);

    const token = localStorage.getItem('token');
    const userRole = jwtDecode(token).role;

    if (userRole !== 'admin') {
        navigate('/auth');
    }


    return (
        <Form method='patch' className="form">
            <p>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    defaultValue={meal ? meal.name : ''}
                />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    //type="url"
                    name="image"
                    required
                    defaultValue={meal ? meal.image : ''}
                />
            </p>
            <p>
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="text"
                    name="price"
                    required
                    defaultValue={meal ? meal.price : ''}
                />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    required
                    defaultValue={meal ? meal.description : ''}
                />
            </p>
            <div className="modal-actions">
                <Link to="/meals" className="link-mode">Cancel</Link>
                <Button>Save</Button>
            </div>
        </Form>
    );
}

export async function action({ request, params }){
    const data = await request.formData();
    const mealId = params;

    const mealData = {
        name: data.get('name'),
        image: data.get('image'),
        price: data.get('price'),
        description: data.get('description'),
    }

    const response = await fetch('http://localhost:3000/' + mealId.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save meal' }, { status: 500 });
    }

    return redirect('/meals');
}