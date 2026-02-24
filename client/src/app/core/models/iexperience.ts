export interface Iexperience {
    _id?: string;
    portfolioId?: string;
    title?: string;
    company: string;
    position: string;
    location?: string;
    startDate: Date | string;
    endDate?: Date | string;
    current?: boolean;
    description?: string;
    technologies?: string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Alias for consistency with PascalCase naming convention
export type IExperience = Iexperience;
