export interface Icertificate {
    _id?: string;
    portfolioId: string;
    title: string;
    description: string;
    technologies?: string[];
    issuer: string;
    issueDate: Date | string;
    expirationDate?: Date | string;
    CertificateImage?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
