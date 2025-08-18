export interface IuserRegister {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    profilePicture?: string | null;
    bio: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: string;
    country: string;
    city: string;
    address: string;
    jobTitle: string;
    role: 'user' | 'admin';
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
