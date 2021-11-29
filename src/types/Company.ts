interface Company {
    id?: number;
    name: string;
    slug: string;
    description?: string | null;
    url: string;
    description_html?: string | null;
    created_by?: string | null;
    updated_by?: string | null;
    created_at?: string;
    updated_at?: string;
    project_count?: number;
    subtitle?: string;
}

export default Company;
