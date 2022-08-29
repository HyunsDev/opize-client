type value = string | number | boolean;

export type Endpoint<T extends Record<string, value>> = {
    method: 'get' | 'post' | 'patch' | 'delete';
    path: (e: T) => string;
    pathParams: (keyof T)[];
    queryParams: (keyof T)[];
    bodyParams: (keyof T)[];
};
