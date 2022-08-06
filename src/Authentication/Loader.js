import React from 'react';

const Loader = () => {
    return (
        <div className='h-full bg-accent flex justify-center items-center'>
            <progress class="progress w-56 bg-lime-500"></progress>
        </div>
    );
};

export default Loader;