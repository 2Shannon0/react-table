import { type AddRecordForm } from '../../components/FormModal/components/AddRecordForm';
import { api } from '../axios';

export const fetchRecords = async (
    page: number,
    limit: number
): Promise<{ header: string[]; rows: Record<string, string>[], total: number }> => {
    const [headerRes, recordsRes] = await Promise.all([
        api.get('/header'),
        api.get(`/records?_page=${page}&_per_page=${limit}`),
    ]);

    const header: string[] = headerRes.data.columns;
    const rows: Record<string, string>[] = recordsRes.data.data;
    const total = parseInt(recordsRes.data.items ?? '0', 10);
    return { header, rows, total };
};

export const addRecord = async (data: AddRecordForm): Promise<void> => {
    const customFields = (data.castomField ?? []).reduce((acc, field) => {
        if (field.name) {
            acc[field.name] = field.value;
        }
        return acc;
    }, {} as Record<string, string>);

    const { castomField, ...baseFields } = data;
    const recordToSave: Record<string, string> = {
        ...baseFields,
        ...customFields,
    };
    const { data: currentHeader } = await api.get('/header');

    const recordKeys = Object.keys(recordToSave);
    const newKeys = recordKeys.filter(key => !currentHeader.columns.includes(key) && recordToSave[key] !== undefined && recordToSave[key] !== null && recordToSave[key] !== '');

    if (newKeys.length > 0) {
        const updatedHeader = [...currentHeader.columns, ...newKeys];
        await api.put('/header', { columns: updatedHeader });
    }
    await api.post('/records', recordToSave);
};