import './review-home-page.css'
import * as React from "react";

interface reviewProps {
    data: {
        id: number,
        img: string,
        name: string,
        content: string,
        color: string
    }
}

const ReviewHomePage: React.FC<reviewProps> = ({data}) => {
    const {img, content, name, color} = data
    return (
        <div className="review">
            <div className="review-header">
                <img src={img} alt=""/>
                <h2>{name}</h2>
            </div>
            <div className="review-content">
                <p>{content}</p>
            </div>
            <div className="color-bar"  style={{backgroundColor: color}}/>
        </div>
    )
}
export default ReviewHomePage