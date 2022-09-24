import './pop-up.css'
const colors = {
    'success': 'green',
    'fail': 'crimson'
}
const PopUp = ({text, color}) => {
    return (
        <div className='pop-up-container'>
            <span style={{backgroundColor: colors[color]}} className='pop-up'>
                {text}
                <i className="fa fa-3x fa-solid fa-circle-check"></i>
            </span>

        </div>
    )
}
export default PopUp