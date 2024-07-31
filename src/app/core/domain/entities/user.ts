export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    phone: string;
    role: string;
    employer: {
        id: string;
        accountName: string;
        accountNumber: string;
    };
}
