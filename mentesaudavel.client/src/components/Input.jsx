const Input = ({placeholder, type,  ...props }) => {
    return (
        <input placeholder={placeholder} {...props}
        type={type}
        className='input'>
        </input>
    )
}

export default Input;