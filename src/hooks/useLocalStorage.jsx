import React, { useState, useEffect } from "react";

/**
 * Custom hook to help use localStorage for storing information,
 * mainly the activeUser.
 * 
 * Updates localStorage whenever the item is changed.
 */
function useLocalStorage(key, firstValue = null) {
    const initialValue = localStorage.getItem(key) || firstValue;
    const [item, setItem] = useState(initialValue);

    useEffect(function setKeyInLocalStorage() {
        console.debug("hooks useLocalStorage useEffect", "item=", item);

        if (item === null) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;