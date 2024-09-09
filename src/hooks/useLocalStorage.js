import { useState, useEffect } from 'react';

function useLocalStorage(key) {
    const [value, setValue] = useState(localStorage.getItem(key) || '');

    useEffect(() => {
        const handleStorageChange = () => {
            setValue(localStorage.getItem(key) || '');
        };

        window.addEventListener('storage', handleStorageChange);

    }, [key]);

    return [value, (newValue) => {
        localStorage.setItem(key, newValue);
        setValue(newValue);  // Manually trigger update
    }];
}

export default useLocalStorage;
