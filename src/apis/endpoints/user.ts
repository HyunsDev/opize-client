import { Endpoint } from '../../types/endpoint';
import { UserObject } from '../../types/object/userObject';

// GET /user
export type getUserParameters = Record<string, never>;
export const getUser: Endpoint<getUserParameters> = {
    method: 'get',
    path: () => '/user',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type getUserResponse = UserObject;

// PATCH /user
export type patchUserParameters = {
    imageUrl?: string;
    name?: string;
    marketingAccept?: Date;
};
export const patchUser: Endpoint<patchUserParameters> = {
    method: 'patch',
    path: () => '/user',
    bodyParams: ['imageUrl', 'marketingAccept', 'name'],
    pathParams: [],
    queryParams: [],
};
export type patchUserResponse = Record<string, never>;
