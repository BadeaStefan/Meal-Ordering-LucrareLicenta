import MealItem from "./MealItem.jsx";
import useHttp from '../hooks/useHttp.js';
import { useEffect, useState } from 'react';

export default function Meals() {
    /*const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', {},[]);

    if (isLoading) {
        return <p>Fetching meals...</p>;
    }*/
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const resData = await fetch('http://localhost:3000/meals');

            const meals = await resData.json();
            setLoadedMeals(meals);
        }
        fetchMeals();
    }, []);
        

    return (
        <ul id="meals">{loadedMeals.map(meal => (
            <MealItem key={meal.id} meal={meal}></MealItem>))}
        </ul>
    );
}