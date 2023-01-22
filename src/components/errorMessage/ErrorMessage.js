import error from './error.gif';

const ErrorMessage = () => {

    return (
        <img src={error} alt='error' style={{ display: 'block', width: "640px", height: "300px",objectFit: 'contain', margin: "0 auto"}}/>
    )
}

export default ErrorMessage;