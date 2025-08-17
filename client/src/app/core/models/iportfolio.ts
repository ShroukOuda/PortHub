export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface Iportfolio {
    _id?: string;
    userId: string;
    title: string;
    About: string;
    AboutImage?: string;
    sociallinks?: ISocialLinks;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
