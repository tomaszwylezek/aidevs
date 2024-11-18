import { getEnvVariables } from '../../env';
import { fetchData } from './fetch';
import { sendVerification } from './send';

async function main(): Promise<void> {
  try {
    // Get environment variables
    const env = getEnvVariables();
    
    if (!env.apiKey) {
      throw new Error('API key is not defined in environment variables');
    }
    
    // Fetch and process data
    const dataArray = await fetchData();
    
    // Prepare and send verification
    const payload = {
      task: 'POLIGON',
      apikey: env.apiKey,
      answer: dataArray
    };
    
    const result = await sendVerification(payload);
    console.log('Verification response:', result);
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

main(); 