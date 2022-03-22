import React from 'react';

const CombinedProvider = (props) => {
    const { components, children } = props;

    return (
        <div>
            {components.reduceRight((acc, Provider) => {
                return <Provider>{acc}</Provider>;
            }, children)}
        </div>
    );
};

export default CombinedProvider