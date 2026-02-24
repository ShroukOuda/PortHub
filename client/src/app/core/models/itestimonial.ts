export interface Itestimonial {
    _id?: string;
    portfolioId?: string;
    content: string;
    author?: string;
    clientName?: string;
    authorImage?: string;
    clientImage?: string;
    position?: string;
    clientPosition?: string;
    company?: string;
    clientCompany?: string;
    rating?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Alias for consistency with PascalCase naming convention
export type ITestimonial = Itestimonial;
