import { useRouteError } from 'react-router-dom';

const Error = () => {
    const { data, status, statusText } = { ...useRouteError() };
    return (
        <div>
            <h1>Error Page it Iz</h1>
            <h3>{data}</h3>
            <h3>{status}</h3>
            <h3>{statusText}</h3>
        </div>
    )
}

export default Error;