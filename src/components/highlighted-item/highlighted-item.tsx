import './highlighted-item.css'
import * as React from "react";
import {Link} from "react-router-dom";

interface highlightedItemProps {
    id: number
    name: string
    imageUrl: string
    price: number
}

const HighlightedItem: React.FC<highlightedItemProps> = ({id, name, imageUrl, price}) => {
    return (
        <>
            <Link to={`${id}`}>
                <div className='highlighted-item-container'>
                    <img src={imageUrl} alt=""/>
                    <div className="text">
                        <h1>{name.slice(0, 13)} {name.length > 13 ? '...' : null}</h1>
                        <p>{price} $</p>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default HighlightedItem