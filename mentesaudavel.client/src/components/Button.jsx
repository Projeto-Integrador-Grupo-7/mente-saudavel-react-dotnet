const Button = ({primary, secondary, children,  ...props }) => {
    const style = primary ? 'primary' : secondary ? 'secondary' : ''
    return (
        <button className={`btn ${style}`} {...props}>
            {children}
        </button>
    )
}

export default Button;