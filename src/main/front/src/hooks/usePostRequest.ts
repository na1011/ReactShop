import { useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import axios from 'axios';

interface PostRequest<T> {
    postData: T | null;
    postError: string | null;
    postIsLoading: boolean;
    resetState: () => void;
    postApi: (url: string, body?: any) => Promise<void>;
}

const usePostRequest = <T>(defaultValue: T | null): PostRequest<T> => {
    const [postData, setPostData] = useState<T | null>(defaultValue);
    const [postError, setPostError] = useState<string | null>(null);
    const [postIsLoading, setPostIsLoading] = useState<boolean>(false);

    const resetState = (): void => {
        setPostData(null);
        setPostError(null);
        setPostIsLoading(false);
    };

    const postApi = async (url: string, body?: any): Promise<void> => {
        setPostIsLoading(true);
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axiosInstance.post(url, body, {
                cancelToken: cancelTokenSource.token
            });
            setPostData(response.data);
        } catch (error: any) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                setPostError(error.message ? error.message : '알 수 없는 오류입니다.');
                console.error('Error fetching data:', error);
            }
        } finally {
            setPostIsLoading(false);
        }
    };

    return { postData, postError, postIsLoading, resetState, postApi };
};

export default usePostRequest;
