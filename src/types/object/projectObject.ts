export type ProjectObject = {
    id: number;
    name: string;
    code: string;
    url: string;
    bannerUrl: string;
    iconUrl: string;
    desc: string;
    ruleUrl: string;
    status: 'SHOW' | 'HIDDEN';
    redirectUrls?: string[];
    isOAuthAble: boolean;
};
