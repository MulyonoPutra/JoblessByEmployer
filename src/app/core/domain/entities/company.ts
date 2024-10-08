import { Address } from './address';

export interface Company {
    id?: string;
    name: string;
    logo?: string;
    header?: string;
    website: string;
    industry: string;
    size: number;
    location: string;
    description: string;
    benefit: string;
    contactInfo: string;
    address?: Address;
}
