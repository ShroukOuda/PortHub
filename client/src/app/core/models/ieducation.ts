export interface Ieducation {
    _id?: string;
    portfolioId?: string;
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: Date | string;
    endDate?: Date | string;
    description?: string;
    grade?: string;
    gpa?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Alias for consistency with PascalCase naming convention
export type IEducation = Ieducation;
