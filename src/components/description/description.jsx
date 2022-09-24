import './description.css'
const Description = ({text}) => {
    return (
        <div className='description-container'>
            <h2>Description.</h2>
            <p className='description-body'>{text}</p>
        </div>
    )
}
export default Description