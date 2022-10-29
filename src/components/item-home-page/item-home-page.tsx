import './item-home-page.css'
import * as React from "react";
// @ts-ignore
import likeSVG from '../../utils/imgs-landing-page/likeSVG.svg'
// @ts-ignore
import backSVG from '../../utils/imgs-landing-page/backSVG.svg'

const ItemHomePage: React.FC = () => {
    return (
        <div className='item-home-page-container'>
            <div className="hero">
                <h2>Shop-n-all <br/> Fashion</h2>
                <p>You can trust us <br/> with your style!</p>
            </div>
            <div className="aside1">
                <p>We only sell the best quality clothes you can find.</p>
                <img src={likeSVG} alt=""/>
            </div>
            <div className="aside2">
                <p>But even if you find something that you do not like? Just send it back and we'll give you your money back.</p>
                <img src={backSVG} alt=""/>
            </div>
        </div>
    )
}
// @ts-ignore
export default ItemHomePage