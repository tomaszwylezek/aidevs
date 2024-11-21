interface TestItem {
    question: string;
    answer: number;
    test?: {
        q: string;
        a: string;
    };
}

export interface CalibrationData {
    apikey: string;
    description: string;
    copyright: string;
    "test-data": TestItem[];
} 