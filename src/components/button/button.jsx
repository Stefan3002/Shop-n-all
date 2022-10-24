import './button.css'
const Button = ({text, clickHandler, color, fontSize, dividers}) => {
    return (
        <button className='button-container' onClick={clickHandler} style={{'color' : color, 'border' : `1px solid ${color}`, 'fontSize' : fontSize}}>
            {dividers ? <div className='divider-top' /> : null}
            {text}
        </button>
    )
}
export default Button