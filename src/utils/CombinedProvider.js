import React,{useEffect} from 'react';

const CombinedProvider = (props) => {
    const { components, children } = props;

    useEffect(() => {
        if (!localStorage.getItem("remember")) {
            localStorage.setItem("remember", "false");
        }
    }, []);

    return (
        <div>
            {components.reduceRight((acc, Provider) => {
                return <Provider>{acc}</Provider>;
            }, children)}
        </div>
    );
};

export default CombinedProvider