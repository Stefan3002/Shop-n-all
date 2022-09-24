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
        if(windowWidth > 3200)
            numberOfAdditions.current = 15
        else
            if(windowWidth > 2500)
                numberOfAdditions.current = 9
        else
            if(windowWidth > 2000)
                numberOfAdditions.current = 8
        else
            if(windowWidth > 1500)
                numberOfAdditions.current = 6
            else
            if(windowWidth > 1000)
                numberOfAdditions.current = 4
            else
                numberOfAdditions.current = 2

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