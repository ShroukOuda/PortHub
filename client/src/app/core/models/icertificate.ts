export interface Icertificate {
    _id?: string;
    portfolioId?: string;
    title: string;
    name?: string;
    description?: string;
    technologies?: string[];
    issuer: string;
    issueDate?: Date | string;
    expirationDate?: Date | string;
    expiryDate?: Date | string;
    CertificateImage?: string;
    credentialId?: string;
    credentialUrl?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Alias for consistency with PascalCase naming convention
export type ICertificate = Icertificate;
