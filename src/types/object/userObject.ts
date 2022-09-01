export type UserObject = {
    id: number;
    email: string;
    name: string;
    imageUrl: string;
    roles: string[];
    lastLogin: Date;
    markingAccept?: Date;
    currency: 'KRW' | string;
    status: string;
};
