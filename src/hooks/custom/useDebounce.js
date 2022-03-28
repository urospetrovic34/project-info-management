import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    //UseEffect will only be recalled if the value changes
    //Hence the [value] prop down there
    //You could also add [delay] down there if necessary

    useEffect(() => {
        //Basically after a certain time delay
        //set the debounced value to a passed in value

        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        //Function below cleans stuff up
        //by preventing debounceValue from changing
        //if the value is changed within the specified period

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;
