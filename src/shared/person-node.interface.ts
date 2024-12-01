export interface PersonNode extends Record<string, unknown> {
    id: string;
    name: string;
    status: string;
    image: string;
    jobtitle: string;
    children: string[];
    parents: string[];
}
