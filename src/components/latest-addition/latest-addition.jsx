import './latest-addition.css'
import LatestAdditionItem from "../latest-addition-item/latest-addition-item";
import {useEffect, useRef, useState} from "react";
const LatestAddition = ({categoryTitle, items}) => {
    let numberOfAdditions = useRef(6)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })

    }, [])

    useEffect(() => {
        console.log(windowWidth)
            if(windowWidth > 1500)
                numberOfAdditions.current = 15
            else
                numberOfAdditions.current = 5

    }, [windowWidth])
    return (
        <div className='latest-addition-container'>
            {

                items.map((item, idx) => {
                    if(idx > items.length - numberOfAdditions.current && idx < items.length - 1)
                        return <LatestAdditionItem key={`categoryItem${categoryTitle}${idx}`} categoryTitle={categoryTitle} item={item} animationDelay={idx}/>
                })
            }
        </div>
    )
}
export default LatestAddition