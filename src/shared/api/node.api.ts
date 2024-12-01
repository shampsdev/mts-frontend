import { API_URL } from '../constants';
import { PersonNode } from '../interfaces/person-node.interface';

export const getPersonNodeById = async (id: string): Promise<PersonNode> => {
  try {
    const response = await fetch(
      `${API_URL}/persons/nodes/${id}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching person data: ${response.statusText}`);
    }

    const person: PersonNode = await response.json();
    return person;
  } catch (error) {
    console.error('Error fetching person node:', error);
    throw error;
  }
};

export const getPersonNodePath = async (
  from: string,
  to: string
): Promise<PersonNode[]> => {
  try {
    const response = await fetch(
      `${API_URL}/persons/nodes/path?from=${from}&to=${to}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: PersonNode[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching person node path:', error);
    throw error;
  }
};
