import React, { useEffect } from "react";
import { useState } from "react";

export default function ProgressBar({ progress }) {
    const [filled, setFilled] = useState(0);
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        if(filled < 100 && isLoading) {
            setTimeout(() => setFilled(prev => prev+=5), 50)
        }
    }, [filled, loading])

    return(
        <body>
            <div className="progressbar">
                <div style={{
                    height: "100%",
                    width: `${filled}%`,
                    transition: "width 0.5s"
                }}>

                </div>

                <span className="precentage">
                    {filled} %
                </span>
            </div>

            <button className="btm text-white" onClick={() => (isLoading(true))}></button>
        </body>
    )
}