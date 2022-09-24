import axios, { AxiosError } from 'axios';

import {
    getUser,
    getUserParameters,
    getUserResponse,
    patchUser,
    patchUserParameters,
    patchUserResponse,
} from './endpoints/user';

import {
    getProject,
    getProjectParameters,
    getProjectResponse,
    deleteProject,
    deleteProjectParameters,
    deleteProjectResponse,
    getProjects,
    getProjectsParameters,
    getProjectsResponse,
    patchProject,
    patchProjectParameters,
    patchProjectResponse,
    postProject,
    postProjectParameters,
    postProjectResponse,
} from './endpoints/project';

import {
    APIResponseError,
    buildRequestError,
    isHTTPResponseError,
    isOpizeClientError,
    RequestTimeoutError,
    UnknownHTTPResponseError,
} from './error';
import { pick } from './utils';

export { APIResponseError, isHTTPResponseError, isOpizeClientError, RequestTimeoutError, UnknownHTTPResponseError };

export interface ClientOptions {
    auth?: string;
    timeoutMs?: number;
    baseUrl?: string;
    apiVersion?: string;
}

type Method = 'get' | 'post' | 'patch' | 'delete';
type QueryParams = Record<string, string | number | boolean | Date> | URLSearchParams;
type WithAuth<T> = T & { auth?: string };

export interface RequestParameters {
    path: string;
    method: Method;
    query?: QueryParams;
    body?: Record<string, unknown>;
    auth?: string;
}

export class Client {
    private auth?: string;
    private prefixUrl: string;
    private userAgent: string;
    private timeoutMs: number;

    public constructor(options?: ClientOptions) {
        this.auth = options?.auth;
        this.prefixUrl = options?.baseUrl ?? 'https://api.opize.me/v1';
        this.userAgent = `opize-client`;
        this.timeoutMs = options?.timeoutMs ?? 60_000;
    }

    public updateAuth(auth?: string) {
        this.auth = auth;
    }

    private authAsHeaders(auth?: string): Record<string, string> {
        const headers: Record<string, string> = {};
        const authHeaderValue = auth ?? this.auth;
        if (authHeaderValue !== undefined) {
            headers['authorization'] = `Bearer ${authHeaderValue}`;
        }
        return headers;
    }

    public async request<ResponseBody>({ path, method, query, body, auth }: RequestParameters): Promise<ResponseBody> {
        const url = `${this.prefixUrl}${path}`;
        const headers: Record<string, string> = this.authAsHeaders(auth);

        try {
            const response = await RequestTimeoutError.rejectAfterTimeout(
                axios(url, {
                    method: method.toUpperCase(),
                    headers,
                    data: body,
                    params: query,
                }),
                this.timeoutMs
            );

            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                throw buildRequestError(error.response);
            }
            if (!isOpizeClientError(error)) throw error;
            if (isHTTPResponseError(error)) throw error;
            throw error;
        }
    }

    public readonly user = {
        /**
         * 유저 정보 조회
         */
        get: (args: WithAuth<getUserParameters> = {}): Promise<getUserResponse> => {
            return this.request<getUserResponse>({
                path: getUser.path(args),
                method: getUser.method,
                query: pick(args, getUser.queryParams),
                body: pick(args, getUser.bodyParams),
                auth: args?.auth,
            });
        },
        /**
         * 유저 정보 수정
         */
        patch: (args: WithAuth<patchUserParameters>): Promise<patchUserResponse> => {
            return this.request<patchUserResponse>({
                path: patchUser.path(args),
                method: patchUser.method,
                query: pick(args, patchUser.queryParams),
                body: pick(args, patchUser.bodyParams),
                auth: args?.auth,
            });
        },
    };

    public readonly project = {
        get: (args: WithAuth<getProjectParameters>): Promise<getProjectResponse> => {
            return this.request<getProjectResponse>({
                path: getProject.path(args),
                method: getProject.method,
                query: pick(args, getProject.queryParams),
                body: pick(args, getProject.bodyParams),
                auth: args?.auth,
            });
        },
        list: (args: WithAuth<getProjectsParameters> = {}): Promise<getProjectsResponse> => {
            return this.request<getProjectsResponse>({
                path: getProjects.path(args),
                method: getProjects.method,
                query: pick(args, getProjects.queryParams),
                body: pick(args, getProjects.bodyParams),
                auth: args?.auth,
            });
        },
        post: (args: WithAuth<postProjectParameters>): Promise<postProjectResponse> => {
            return this.request<postProjectResponse>({
                path: postProject.path(args),
                method: postProject.method,
                query: pick(args, postProject.queryParams),
                body: pick(args, postProject.bodyParams),
                auth: args?.auth,
            });
        },
        patch: (args: WithAuth<patchProjectParameters>): Promise<patchProjectResponse> => {
            return this.request<patchProjectResponse>({
                path: patchProject.path(args),
                method: patchProject.method,
                query: pick(args, patchProject.queryParams),
                body: pick(args, patchProject.bodyParams),
                auth: args?.auth,
            });
        },
        delete: (args: WithAuth<deleteProjectParameters>): Promise<deleteProjectResponse> => {
            return this.request<deleteProjectResponse>({
                path: deleteProject.path(args),
                method: deleteProject.method,
                query: pick(args, deleteProject.queryParams),
                body: pick(args, deleteProject.bodyParams),
                auth: args?.auth,
            });
        },
    };
}
