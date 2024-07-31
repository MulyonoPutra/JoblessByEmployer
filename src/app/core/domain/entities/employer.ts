import { Company } from './company';
import { User } from './user';

export interface Employer {
    id: string;
    accountName: string;
    accountNumber: string;
    company: Company;
    jobAds?: any[];
    user: User;
}
