export interface Iuser {
    _id?: string;
    firstName: string;
    lastName?: string;
    username: string;
    email: string;
    phone: string;
    password?: string; 
    profilePicture?: string;
    bio?: string;
    gender?: 'male' | 'female' | 'other';
    dateOfBirth: Date | string;
    country: string;
    city: string;
    address: string;
    role?: 'user' | 'admin';
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
