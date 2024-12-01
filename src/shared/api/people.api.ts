import { API_URL } from '../constants';
import { Person } from '../interfaces/person.interface';

export const getPersonById = async (id: string): Promise<Person> => {
  try {
    const response = await fetch(
      `${API_URL}/persons/${id}`
    );

    const person: Person = await response.json();
    return person;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw error;
  }
};

export const getAllPeople = async (): Promise<Person[]> => {
  try {
    const response = await fetch(
      `${API_URL}/persons`
    );
    const person: Person[] = await response.json();
    return person;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw error;
  }
};


export const searchPeople = async (query: string): Promise<Person[]> => {
  try {
    const response = await fetch(
      `${API_URL}/persons/search?text=${encodeURIComponent(query)}`
    );
    const person: Person[] = await response.json();
    return person;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw error;
  }
};
