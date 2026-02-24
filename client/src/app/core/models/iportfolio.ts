export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

export interface IPortfolioTheme {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  fontFamily?: string;
}

export interface Iportfolio {
    _id?: string
    userId: string | any;
    title: string;
    tagline?: string;
    bio?: string;
    About: string;
    AboutImage?: string;
    sociallinks?: ISocialLinks;
    socialLinks?: ISocialLinks;
    theme?: IPortfolioTheme;
    isPublic?: boolean;
    cvUrl?: string;
    projects?: any[];
    skills?: any[];
    services?: any[];
    education?: any[];
    experience?: any[];
    certificates?: any[];
    testimonials?: any[];
    user?: any;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Alias for consistency with PascalCase naming convention
export type IPortfolio = Iportfolio;
