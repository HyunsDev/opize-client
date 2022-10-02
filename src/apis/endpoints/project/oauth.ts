import { Endpoint } from '../../../types/endpoint';

// POST /project/:projectCode/oauth
export type postProjectOAuthParameters = {
    projectCode: string;
};
export const postProjectOAuth: Endpoint<postProjectOAuthParameters> = {
    path: (e) => `/project/${e.projectCode}/oauth`,
    method: 'post',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type postProjectOAuthResponse = {
    token: string;
};
