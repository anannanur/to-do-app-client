import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div data-aos="fade-down"
            data-aos-delay="800"
            data-aos-duration="1200"
            className="hero min-h-screen bg-accent">
            <div className="hero-content text-center text-neutral-content">
                <p className="max-w-md">
                    <span className="mb-5 text-9xl text-white font-bold">4</span>
                    <span className="mb-5 text-9xl text-white font-bold">0</span>
                    <span className="mb-5 text-9xl text-white font-bold">4</span>
                </p>

            </div>
            <Link to='/' className='btn btn-primary mt-52'>Back to home</Link>
        </div>
    );
};

export default NotFound;