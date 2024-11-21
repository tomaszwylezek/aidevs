import { FetchDataService } from './services/fetch-data.service';
import { SendService } from './services/send.service';

export async function main() {
    const fetchDataService = new FetchDataService();
    const sendService = new SendService();

    try {
        // Get and process data
        console.log('Fetching and processing data...');
        const data = await fetchDataService.fetch();
        console.log('Processed data:', JSON.stringify(data, null, 2));

        // Send verification
        console.log('Sending verification...');
        const result = await sendService.send(data);
        console.log('Verification response:', result);

    } catch (error) {
        console.error('Error in main:', error);
        throw error;
    }
}

if (require.main === module) {
    main().catch((error) => {
        console.error('Application error:', error);
        process.exit(1);
    });
} 