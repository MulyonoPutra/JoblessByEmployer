import { Education } from './education';
import { Experience } from './experience';
import { License } from './license';
import { Links } from './links';
import { Skill } from './skill';
import { User } from './user';

export interface Seeker {
    id: string;
    summary: string;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
    resume: string;
    coverLetter: string;
    links: Links[];
    desireSalary: string;
    startDate: Date;
    license: License[];
    user: User;
}
