export interface Iproject {
    _id?: string;
    portfolioId?: string;
    title: string;
    description: string;
    technologies?: string[];
    images?: string[];
    image?: string;
    imageUrl?: string;
    demoUrl?: string;
    projectUrl?: string;
    githubUrl?: string;
    featured?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Alias for consistency with PascalCase naming convention
export type IProject = Iproject;
