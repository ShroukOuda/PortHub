export interface Iskill {
    _id?: string;
    portfolioId: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    icon?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
