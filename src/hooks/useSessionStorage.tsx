import {useState, useEffect} from 'react';

function getValueFromStorage<T>(key: string, initialValue: T) {
    console.log(`Getting value from storage: ${key}`);
    const storedValue = sessionStorage.getItem(key);
    if (storedValue === null) {
        // if there is nothing in storage, simply return initial value
        // the useEffect in the hook will take care of keeping sessionStorage in sync on changes
        return initialValue;
    }
    return JSON.parse(storedValue) as T;
}

export default function useSessionStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState(() => {
        return getValueFromStorage(key, initialValue);
    });

    // When value changes from when setValue is called externally, update storage
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    // I knew what the return type error was, needed tuple types, but didn't know solution
    // Got solution from here: https://fettblog.eu/typescript-react-typeing-custom-hooks/
    return [value, setValue] as const;
}