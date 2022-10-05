import { Endpoint } from '../../../../types/endpoint';

// GET /dashboard/notion/page
export type getDashboardNotionPagesParameters = Record<string, never>;
export const getDashboardNotionPages: Endpoint<getDashboardNotionPagesParameters> = {
    path: () => '/dashboard/notion/page',
    method: 'get',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type getDashboardNotionPagesResponse = {
    recordMaps: any[];
};

// GET /dashboard/notion/page/:page
export type getDashboardNotionPageParameters = {
    page: string;
};
export const getDashboardNotionPage: Endpoint<getDashboardNotionPageParameters> = {
    path: (e) => `/dashboard/notion/page/${e.page}`,
    method: 'get',
    bodyParams: [],
    pathParams: ['page'],
    queryParams: [],
};
export type getDashboardNotionPageResponse = {
    recordMap: any;
};

// PATCH /dashboard/notion/page/:page
export type patchDashboardNotionPageParameters = {
    page: string;
    pageCode?: string;
    reCaching?: boolean;
};
export const patchDashboardNotionPage: Endpoint<patchDashboardNotionPageParameters> = {
    path: (e) => `/dashboard/notion/page/${e.page}`,
    method: 'patch',
    bodyParams: ['pageCode', 'reCaching'],
    pathParams: ['page'],
    queryParams: [],
};
export type patchDashboardNotionPageResponse = Record<string, never>;

// DELETE /dashboard/notion/page/:page
export type deleteDashboardNotionPageParameters = {
    page: string;
};
export const deleteDashboardNotionPage: Endpoint<deleteDashboardNotionPageParameters> = {
    path: (e) => `/dashboard/notion/page/${e.page}`,
    method: 'delete',
    bodyParams: [],
    pathParams: ['page'],
    queryParams: [],
};
export type deleteDashboardNotionPageResponse = Record<string, never>;
