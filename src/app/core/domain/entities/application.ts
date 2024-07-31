import { JobAds } from './job-ads';
import { Seeker } from './seeker';

export interface Application {
    id: string;
    date: string;
    status: string;
    jobAds: JobAds;
    createdAt: string;
    seeker: Seeker;
}
