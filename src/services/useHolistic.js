import useSWR from 'swr';
const apiEndpoint = import.meta.env.VITE_SERVER_URL;
const API_BASE_URL = `${apiEndpoint}/get_notifications`;

const fetcher = async (url, options) => {
    const res = await fetch(url, options);

    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("Recurso no encontrado");
        }
        throw new Error("Hubo un problema con el servidor, intenta de nuevo");
    }

    return res.json();
};

const useHolistic = () => {
    const { data, error, isValidating, isLoading, mutate } = useSWR(`${API_BASE_URL}`, fetcher, {
        errorRetryInterval: 10000,
    });

    return {
        data,
        isLoading,
        error,
        isValidating,
        refresh: mutate
    };
};

export { useHolistic };
