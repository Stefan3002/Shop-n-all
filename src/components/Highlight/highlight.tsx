import './highlight.css'
import * as React from "react";

interface HighlightProps {
    text: string
}

const Highlight:React.FC<HighlightProps> = ({text}) => {
    return (
        <div className='highlight-container'>
            {text}
        </div>
    )
}
export default Highlight