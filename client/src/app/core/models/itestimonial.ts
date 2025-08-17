export interface Itestimonial {
    _id?: string;
    portfolioId: string;
    content: string;
    author: string;
    authorImage?: string;
    position?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
