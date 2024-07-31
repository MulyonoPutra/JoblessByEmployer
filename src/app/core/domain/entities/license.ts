import { Seeker } from './seeker';

export interface License {
    id: string;
    name: string;
    organization: string;
    description: string;
    seeker?: Seeker;
}
