export interface Iproject {
    _id?: string;
    portfolioId: string;
    title: string;
    description: string;
    technologies?: string[];
    image?: string;
    demoUrl?: string;
    githubUrl?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
