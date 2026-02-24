export interface IPortfolioTheme {
  _id?: string;
  portfolioId: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  fontFamily: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export const DEFAULT_THEME: Omit<IPortfolioTheme, '_id' | 'portfolioId' | 'createdAt' | 'updatedAt'> = {
  primaryColor: '#91729c',
  secondaryColor: '#432161',
  accentColor: '#b794c0',
  backgroundColor: '#1a1a2e',
  textColor: '#ffffff',
  cardBackground: '#2d2d44',
  fontFamily: 'Inter, sans-serif'
};

export const THEME_PRESETS = [
  {
    name: 'Purple Dream',
    primaryColor: '#91729c',
    secondaryColor: '#432161',
    accentColor: '#b794c0',
    backgroundColor: '#1a1a2e',
    textColor: '#ffffff',
    cardBackground: '#2d2d44',
    fontFamily: 'Inter, sans-serif'
  },
  {
    name: 'Ocean Blue',
    primaryColor: '#0077b6',
    secondaryColor: '#023e8a',
    accentColor: '#48cae4',
    backgroundColor: '#03045e',
    textColor: '#ffffff',
    cardBackground: '#0a1128',
    fontFamily: 'Poppins, sans-serif'
  },
  {
    name: 'Forest Green',
    primaryColor: '#2d6a4f',
    secondaryColor: '#1b4332',
    accentColor: '#52b788',
    backgroundColor: '#081c15',
    textColor: '#ffffff',
    cardBackground: '#1b4332',
    fontFamily: 'Roboto, sans-serif'
  },
  {
    name: 'Sunset Orange',
    primaryColor: '#e76f51',
    secondaryColor: '#f4a261',
    accentColor: '#e9c46a',
    backgroundColor: '#264653',
    textColor: '#ffffff',
    cardBackground: '#2a4d5e',
    fontFamily: 'Montserrat, sans-serif'
  },
  {
    name: 'Minimal Light',
    primaryColor: '#333333',
    secondaryColor: '#666666',
    accentColor: '#0066cc',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    cardBackground: '#f5f5f5',
    fontFamily: 'Open Sans, sans-serif'
  },
  {
    name: 'Rose Gold',
    primaryColor: '#b76e79',
    secondaryColor: '#8b4557',
    accentColor: '#d4a5a5',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    cardBackground: '#2d2d2d',
    fontFamily: 'Playfair Display, serif'
  }
];
