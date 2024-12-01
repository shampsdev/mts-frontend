import { API_URL } from '../constants';

export const getAllDepartments = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      `${API_URL}/persons/departments`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch departments');
    }

    const departments: string[] = await response.json();
    return departments;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const getAllDivisions = async (): Promise<string[]> => {
    try {
      const response = await fetch(
        `${API_URL}/persons/divisions`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch divisions');
      }
  
      const divisions: string[] = await response.json();
      return divisions;
    } catch (error) {
      console.error('Error fetching divisions:', error);
      throw error;
    }
  };
  