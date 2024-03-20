import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resData = await respone.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Ceva a mers prost.');
    }

    return resData;
}
export default function useHttp(url, config, initialData) {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const sendRequest = useCallback(
        async function sendRequest() {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, config);
            setData(resData);
        } catch (error) {
            setError(error.message || 'Ceva nu a mers bine');
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method)||!config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error
    }
}