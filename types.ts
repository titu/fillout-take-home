export interface Question {
    id: string;
    name: string;
    type: string;
    value?: string;
    options?: { id: string; value: string; label: string }[];
}

export interface Data {
    id: string;
    name: string;
    questions: Question[];
    calculations: any[];
    urlParameters: any[];
    documents: any[];
}

export interface Filter {
    id: string;
	condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
	value: number | string;
}