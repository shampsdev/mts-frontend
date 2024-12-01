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
