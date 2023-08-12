import { useState } from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(0);
    const [error, setError] = useState("");
    
    async function fetching (...args) {
        try {
            setIsLoading(1);
            await callback(...args);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(0);
        }
    }

    return [fetching, isLoading, error];
}