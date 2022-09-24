import './button.css'
const Button = (props) => {
    const {text, clickHandler, color, fontSize} = props
    return (
        <button className='button-container' onClick={clickHandler} style={{'color' : color, 'border' : `1px solid ${color}`, 'fontSize' : fontSize}}>
            {text}
        </button>
    )
}
export default Button