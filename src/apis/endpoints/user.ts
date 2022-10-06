import { Endpoint } from '../../types/endpoint';
import { UserObject } from '../../types/object/userObject';

// GET /user
export type getUserParameters = {
    userId: number | 'me';
};
export const getUser: Endpoint<getUserParameters> = {
    method: 'get',
    path: (data) => `/user/${data.userId}`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type getUserResponse = UserObject;

// PATCH /user
export type patchUserParameters = {
    userId?: number | 'me';
    currency?: 'KRW';
    imageUrl?: string;
    name?: string;
    marketingAccept?: Date;
};
export const patchUser: Endpoint<patchUserParameters> = {
    method: 'patch',
    path: (data) => `/user/${data.userId}`,
    bodyParams: ['imageUrl', 'marketingAccept', 'name', 'currency'],
    pathParams: ['userId'],
    queryParams: [],
};
export type patchUserResponse = Record<string, never>;
