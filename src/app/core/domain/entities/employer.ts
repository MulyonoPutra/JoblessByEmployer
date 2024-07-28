import { User } from './user';

export interface Employer {
    id: string;
    accountName: any;
    accountNumber: any;
    company: any;
    jobAds: any[];
    user: User;
}
