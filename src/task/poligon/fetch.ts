import axios from 'axios';
import { getEnvVariables } from '../../env';

export const fetchData = async (): Promise<string[]> => {
  try {
    const env = getEnvVariables();
    const response = await axios.get<string>(env.poligon.dataUrl);
    return response.data.split('\n').filter(line => line.trim());
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};