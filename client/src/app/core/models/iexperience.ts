export interface Iexperience {
    _id?: string;
    portfolioId: string;
    title: string;
    company: string;
    startDate: Date | string;
    endDate?: Date | string;
    description: string;
    position: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
