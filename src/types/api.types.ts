export interface ApiResponse {
    status: string;
    message?: string;
    error?: string;
}

export interface TokenUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
} 