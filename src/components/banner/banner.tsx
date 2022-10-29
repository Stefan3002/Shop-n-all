import './banner.css'
import * as React from "react";

interface bannerProps {
    img: string,
    text: string,
    pos: string
}

const Banner: React.FC<bannerProps> = ({pos, img, text}) => {
    return (
        <div className='banner-container' style={{backgroundImage: `url(${img})`, backgroundPosition: pos}}>
            <p>{text}</p>
        </div>
    )
}
export default Banner