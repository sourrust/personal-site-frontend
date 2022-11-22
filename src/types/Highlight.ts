interface Highlight {
    id?: number;
    name: string;
    slug: string;
    description: string;
    created_by?: string | null;
    updated_by?: string | null;
    created_at?: string;
    updated_at?: string;
}

export default Highlight;
