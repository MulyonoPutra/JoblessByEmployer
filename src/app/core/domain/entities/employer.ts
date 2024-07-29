import { Company } from './company';
import { User } from './user';

export interface Employer {
    id: string;
    accountName: any;
    accountNumber: any;
    company: Company;
    jobAds: any[];
    user: User;
}
