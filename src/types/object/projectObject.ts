export type ProjectObject = {
    id: number;
    code: string;
    url: string;
    iconUrl: string;
    desc: string;
    ruleUrl: string;
    status: 'SHOW' | 'HIDDEN';
};
