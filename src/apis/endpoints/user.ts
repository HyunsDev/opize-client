import { Endpoint } from '../../types/endpoint';
import { ProjectObject } from '../../types/object';
import { UserObject } from '../../types/object/userObject';

// GET /user/:userId
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

// GET /user/:userId/oauth
export type getUserOAuthsParameters = {
    userId: number | 'me';
};
export const getUserOAuths: Endpoint<getUserOAuthsParameters> = {
    method: 'get',
    path: (data) => `/user/${data.userId}/oauth`,
    bodyParams: [],
    pathParams: ['userId'],
    queryParams: [],
};
export type getUserOAuthResponse = {
    oauths: {
        id: number;
        createdAt: Date;
        project: ProjectObject;
    }[];
};

// PATCH /user
export type patchUserParameters = {
    userId?: number | 'me';
    currency?: 'KRW';
    imageUrl?: string;
    name?: string;
    marketingAccept?: Date | null;
};
export const patchUser: Endpoint<patchUserParameters> = {
    method: 'patch',
    path: (data) => `/user/${data.userId}`,
    bodyParams: ['imageUrl', 'marketingAccept', 'name', 'currency'],
    pathParams: ['userId'],
    queryParams: [],
};
export type patchUserResponse = Record<string, never>;
