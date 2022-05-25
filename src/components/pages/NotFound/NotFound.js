import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-[500px] flex justify-center items-center">
            <div>
                <h1 className="text-5xl text-center">404-Not Found</h1>
                <p className="text-3xl my-3">You are looking for a page that doesn't exist.</p>
                <button className="btn btn-primary block mx-auto" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        </div>
    );
};

export default NotFound;