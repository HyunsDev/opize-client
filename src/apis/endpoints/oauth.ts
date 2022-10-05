import { Endpoint } from '../../types/endpoint';

// POST /oauth/verify/:projectCode
export type postOAuthVerifyParameters = {
    projectCode: string;
    redirectUrl: string;
};
export const postOAuthVerify: Endpoint<postOAuthVerifyParameters> = {
    path: (e) => `/oauth/verify/${e.projectCode}`,
    method: 'post',
    bodyParams: ['redirectUrl'],
    pathParams: ['projectCode'],
    queryParams: [],
};
export type postOAuthVerifyResponse = {
    token: string;
};

// POST /oauth
export type postOAuthParameters = {
    generateToken: string;
    serverSecretToken: string;
    redirectUrl: string;
};
export const postOAuth: Endpoint<postOAuthParameters> = {
    path: () => `/oauth`,
    method: 'post',
    bodyParams: ['generateToken', 'serverSecretToken', 'redirectUrl'],
    pathParams: [],
    queryParams: [],
};
export type postOAuthResponse = {
    token: string;
};
