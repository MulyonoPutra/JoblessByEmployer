import { Employer } from './employer';

export interface JobAds {
    id: string;
    title: string;
    description: string;
    requirements: string;
    salary: string;
    createdAt: string;
    location: string;
    workType: string;
    payType: string;
    status: string;
    employer: Employer;
}
