import { Company } from './company';
import { JobAds } from './job-ads';
import { User } from './user';

export interface Employer {
    id: string;
    accountName: string;
    accountNumber: string;
    company: Company;
    jobAds?: JobAds[];
    user: User;
}
