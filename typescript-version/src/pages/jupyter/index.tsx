import React from 'react';

const Jupyter: React.FC = () => {
    return (
        <div>
            <iframe src={"https://georgesms.github.io/edupy/lab/index.html"} height={"100%"} width={"100%"}/>
        </div>
    );
}

export default Jupyter;