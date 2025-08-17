export interface Iservice {
    _id?: string;
    portfolioId: string;
    name: string;
    description: string;
    icon?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
