export interface Iskill {
    _id?: string;
    portfolioId?: string;
    name: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | number;
    category?: string;
    icon?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Alias for consistency with PascalCase naming convention
export type ISkill = Iskill;
