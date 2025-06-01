import { api } from '../axios';

export const fetchRecords = async (page: number, limit: number): Promise<string[][]> => {
    // await new Promise(resolve => setTimeout(resolve, 400));
    const { data } = await api.get(`/records?_page=${page}&_limit=${limit}`);
    return data;
};
