import axios from 'axios';

import {
    getUser,
    getUserParameters,
    getUserResponse,
    patchUser,
    patchUserParameters,
    patchUserResponse,
} from './endpoints/user';

import {
    APIResponseError,
    isHTTPResponseError,
    isOpizeClientError,
    OpizeClientError,
    RequestTimeoutError,
    UnknownHTTPResponseError,
} from './error';
import { pick } from './utils';
import { version as PACKAGE_VERSION, name as PACKAGE_NAME } from '../../package.json';
import { Endpoint } from '../types/endpoint';

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

export default class Client {
    private auth?: string;
    private prefixUrl: string;
    private userAgent: string;
    private timeoutMs: number;

    public constructor(options?: ClientOptions) {
        this.auth = options?.auth;
        this.prefixUrl = options?.baseUrl ?? 'https://api.opize.me/v1';
        this.userAgent = `opize-client/${PACKAGE_VERSION}`;
        this.timeoutMs = options?.timeoutMs ?? 60_000;
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
        const headers: Record<string, string> = {
            ...this.authAsHeaders(auth),
            'user-agent': this.userAgent,
        };

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
            if (!isOpizeClientError(error)) throw error;
            if (!isHTTPResponseError(error)) throw error;
            throw error;
        }
    }

    public readonly user = {
        get: (args: WithAuth<getUserParameters>): Promise<getUserResponse> => {
            return this.request<getUserResponse>({
                path: getUser.path(args),
                method: getUser.method,
                query: pick(args, getUser.queryParams),
                body: pick(args, getUser.bodyParams),
                auth: args?.auth,
            });
        },
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
}
