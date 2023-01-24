import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Images = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{}, [isLoading]);
    if(isLoading)
        return <Spinner animation="grow" />;
    return (
        <div>
            {data.length && data.map(item => {
                return (<div>
                    <img src={item.src} />
                </div>)
            })}
        </div>
    )
}

export default Images;