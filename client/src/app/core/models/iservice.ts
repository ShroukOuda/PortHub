export interface Iservice {
    _id?: string;
    portfolioId?: string;
    name?: string;
    title: string;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Alias for consistency with PascalCase naming convention
export type IService = Iservice;
