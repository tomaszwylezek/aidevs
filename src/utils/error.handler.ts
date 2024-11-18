import axios from 'axios';

export class AppError extends Error {
    constructor(message: string, public readonly code?: string) {
        super(message);
        this.name = 'AppError';
    }
}

export const handleAxiosError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        throw new AppError(`Request failed: ${error.response?.data?.error || error.message}`);
    }
    throw error;
}; 