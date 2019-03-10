import React, { useState, useEffect } from 'react';

const validateEmptyValue = (arr) => {
    const total = arr.length;
    let emptyValueCount = 0;
    for(let i = 0; i < total; i++) {
        const item = arr[i];
        if(!item) {
            emptyValueCount++
        }
    }

    if(emptyValueCount === 0) {
        return true
    }

    return false
}

export const useCanSubmit = arr => {
    const [canSubmit, setCanSubmit] = useState(false)
    const validation = validateEmptyValue(arr)
    useEffect(() => {
        if (validation) {
            setCanSubmit(true)
            return () => setCanSubmit(false)
        }
    }, arr)

    return canSubmit
}