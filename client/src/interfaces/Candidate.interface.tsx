export interface Candidate {
    readonly login: string;
    readonly avatar_url?: string | null;
    readonly html_url?: string | null;
    readonly name?: string | null;
    readonly company?: string | null;
    readonly blog?: string | null;
    readonly location?: string | null;
    readonly email?: string | null;
    readonly hireable?: string | null;
    readonly bio?: string | null;
}