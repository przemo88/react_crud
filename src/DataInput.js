import { useState } from 'react';

export const DataInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
}