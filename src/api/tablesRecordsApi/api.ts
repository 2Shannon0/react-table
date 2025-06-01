import { api } from '../axios';

export const fetchRecords = async (
    page: number,
    limit: number
): Promise<{ header: string[]; rows: Record<string, string>[], total: number }> => {
    const [headerRes, recordsRes] = await Promise.all([
        api.get('/header'),
        api.get(`/records?_page=${page}&_per_page=${limit}`),
    ]);

    const header: string[] = headerRes.data;
    const rows: Record<string, string>[] = recordsRes.data.data;
    const total = parseInt(recordsRes.data.items ?? '0', 10);
    return { header, rows, total };
};
