// eslint-disable-next-line import/no-cycle
import Company from './Company';

interface Project {
    id?: number;
    name: string;
    slug: string;
    summary: string;
    description?: string;
    description_html?: string;
    url?: string;
    created_by?: string | null;
    updated_by?: string | null;
    created_at?: string;
    updated_at?: string;
    company?: Company;
}

export default Project;
