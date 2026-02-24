export interface Iuser {
    _id?: string;
    id?: string;
    firstName: string;
    lastName?: string;
    username: string;
    email: string;
    phone: string;
    password?: string; 
    profilePicture?: string;
    profileImage?: string;
    bio?: string;
    gender?: 'male' | 'female' | 'other';
    dateOfBirth: Date | string;
    country: string;
    city: string;
    address: string;
    jobTitle?: string;
    role?: 'user' | 'admin';
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Alias for consistency with PascalCase naming convention
export type IUser = Iuser;
