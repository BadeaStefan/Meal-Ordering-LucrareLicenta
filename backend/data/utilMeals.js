import fs from 'node:fs/promises';
import { v4 as generateId } from 'uuid';
//import { readData } from './util';

export async function readMealData() {
    const data = await fs.readFile('data/available-meals.json', 'utf8');
    return JSON.parse(data);
}

export async function writeMealData(data) {
    await fs.writeFile('data/available-meals.json', JSON.stringify(data));
}

export async function addMeal(data) {
    const storedData = await readMealData();
    storedData.push({ ...data, id: generateId() });
    await writeMealData(storedData);
}

export async function replace(id, data) {
    const storedData = await readMealData();
    if (!storedData || storedData.length === 0) {
        throw new Error('Could not find any meals.');
    }

    const index = storedData.findIndex((ev) => ev.id === id);
    if (index < 0) {
        throw new Error('Could not find meal for id ' + id);
    }

    storedData[index] = { ...data, id };

    await writeMealData(storedData);
}

export async function remove(id) {
    const storedData = await readMealData();
    const updatedData = storedData.filter((meal) => meal.id !== id);
    await writeMealData(updatedData);
}