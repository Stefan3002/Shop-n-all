import './parallax.css'
import * as React from "react";
// @ts-ignore
import plusSVG from '../../utils/imgs-landing-page/plusSVG.svg'

interface parallaxProps {
    data: {
        img: string,
        text: string,
        position: string
    }[]

}

const Parallax:React.FC<parallaxProps> = ({data}) => {

    const expandSection = (event) => {
        const category = event.target.dataset.name
    }

    return (
            <>
                {
                    data.map((d) => {
                        const {img, text, position} = d
                        return <div className='parallax' style={{backgroundImage: `url(${img})`, backgroundPosition: position}} >
                            <div className="content-container">
                                <p>{text}</p>
                                <img data-name={text} onClick={expandSection} src={plusSVG} alt=""/>
                            </div>
                        </div>
                    })
                }
            </>


    )
}
export default Parallax