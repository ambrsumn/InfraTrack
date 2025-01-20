import React, { useState } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";

const ProcessingDialog = () => {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#31D3B3");


    return (
        <>
            <div className="sweet-loading">

                <p className="text-black text-base">Processing your request</p><br />

                <div className="flex flex-row pl-10">
                    <PacmanLoader
                        color={color}
                        loading={loading}
                        size={25}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </div>
        </>
    );
}

export default ProcessingDialog;