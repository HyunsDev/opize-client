import { Endpoint } from '../../types/endpoint';
import { ProjectObject } from '../../types/object';

// GET /project
export type getProjectsParameters = Record<string, never>;
export const getProjects: Endpoint<getProjectsParameters> = {
    path: () => '/project',
    method: 'get',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type getProjectsResponse = {
    projects: ProjectObject[];
};

// GET /project/:projectCode
export type getProjectParameters = {
    projectCode: string;
};
export const getProject: Endpoint<getProjectParameters> = {
    path: (e) => `/project/${e.projectCode}`,
    method: 'get',
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type getProjectResponse = ProjectObject;

// POST /project
export type postProjectParameters = {
    code: string;
    name: string;
    url: string;
    iconUrl: string;
    bannerUrl: string;
    ruleUrl: string;
    status: string;
    userId: number;
    desc?: string;
};
export const postProject: Endpoint<postProjectParameters> = {
    path: () => `/project`,
    method: 'post',
    bodyParams: ['code', 'bannerUrl', 'name', 'desc', 'iconUrl', 'ruleUrl', 'status', 'url', 'userId'],
    pathParams: [],
    queryParams: [],
};
export type postProjectResponse = Record<string, never>;

// PATCH /project/:projectCode
export type patchProjectParameters = {
    projectCode: string;
    url?: string;
    iconUrl?: string;
    bannerUrl?: string;
    ruleUrl?: string;
    desc?: string;
    status?: string;
    name?: string;
};
export const patchProject: Endpoint<patchProjectParameters> = {
    path: (e) => `/project/${e.projectCode}`,
    method: 'patch',
    bodyParams: ['name', 'bannerUrl', 'desc', 'iconUrl', 'ruleUrl', 'status', 'url'],
    pathParams: ['projectCode'],
    queryParams: [],
};
export type patchProjectResponse = Record<string, never>;

// DELETE /project/:projectCode
export type deleteProjectParameters = {
    projectCode: string;
};
export const deleteProject: Endpoint<deleteProjectParameters> = {
    path: (e) => `/project/${e.projectCode}`,
    method: 'delete',
    bodyParams: [],
    pathParams: ['projectCode'],
    queryParams: [],
};
export type deleteProjectResponse = Record<string, never>;
