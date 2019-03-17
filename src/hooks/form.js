import React, { useState, useEffect, useRef } from 'react';

const validateEmptyValue = (arr) => {
    const total = arr.length;
    let emptyValueCount = 0;
    for (let i = 0; i < total; i++) {
        const item = arr[i];
        if (!item) {
            emptyValueCount++
        }
    }

    if (emptyValueCount === 0) {
        return true
    }

    return false
}

export const useCanSubmit = (arr, validateLength) => {
    const [canSubmit, setCanSubmit] = useState(false);

    let validate = false;
    validate = validateEmptyValue(arr);
    if (validateLength) {
        validate = validateLength();
    }
    useEffect(() => {
        if (validate) {
            setCanSubmit(true);
            return () => setCanSubmit(false);
        };
    }, arr)

    return canSubmit
}

export const useAutoAdjustHeight = (arr) => {
    const form = useRef(null);
    const [textareaHeight, setTextAreaHeight] = useState(0);
    const prevScrollHeight = useRef(0);
    const prevSelectionStart = useRef(0);
    const lineHeight = useRef(0);

    useEffect(() => {
        if (form.current) {
            let scrollHeight = form.current.scrollHeight;
            const selectionStart = form.current.selectionStart;

            if (lineHeight.current === 0 && prevScrollHeight.current !== 0) {
                lineHeight.current = scrollHeight - prevScrollHeight.current;
            }

            if (selectionStart < prevSelectionStart.current) {
                scrollHeight -= lineHeight.current;
            }
            if(selectionStart > prevSelectionStart.current && scrollHeight > prevScrollHeight.current) {
                scrollHeight += lineHeight.current;
            }

            setTextAreaHeight(scrollHeight);
            console.log(scrollHeight, lineHeight.current)

            prevScrollHeight.current = scrollHeight;
            prevSelectionStart.current = selectionStart;
        }
    }, arr);

    return [form, textareaHeight];
}