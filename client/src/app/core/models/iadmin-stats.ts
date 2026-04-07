import { IUser } from '../models/iuser';
import { IPortfolio } from '../models/iportfolio';

export interface IAdminStats {
  totalUsers: number;
  totalPortfolios: number;
  totalProjects: number;
  totalSkills: number;
  totalViews: number;
  usersThisMonth: number;
  portfoliosThisMonth: number;
  publicPortfolioCount: number;
  privatePortfolioCount: number;
  recentUsers: IUser[];
  recentPortfolios: IPortfolio[];
  topPortfolios: any[];
  userGrowthData: { month: string; count: number }[];
  portfolioGrowthData: { month: string; count: number }[];
  platformViewHistory: { date: string; count: number }[];
  totalCountries: number;
  countryCounts: { country: string; count: number }[];
  genderCounts: { gender: string; count: number }[];
  jobTitleCounts: { jobTitle: string; count: number }[];
}