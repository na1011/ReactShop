import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import axios from 'axios';

interface FetchData<T> {
    fetchData: T | null; // 성공적인 응답 데이터 또는 null
    fetchError: string | null;
}

const useFetchData = <T>(url: string, defaultValue: T): FetchData<T> => {
    const [fetchData, setFetchData] = useState(defaultValue);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        const fetchApi = async (): Promise<void> => {
            try {
                const response = await axiosInstance.get<T>(url, {
                    cancelToken: cancelTokenSource.token
                });
                setFetchData(response.data);
            } catch (error: any) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    setFetchError(error.response ? error.response.data : '알 수 없는 오류입니다.');
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchApi();

        return (): void => {
            cancelTokenSource.cancel('요청 취소'); // 컴포넌트 언마운트 시 요청 취소
        };
    }, [url]);

    return { fetchData, fetchError };
};

export default useFetchData;
