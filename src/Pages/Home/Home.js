import React from 'react';
import "./Home.css";
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="hero min-h-screen"
        style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
          }}>
            <div className="hero-overlay bg-opacity-10"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md bg-opacity-50 p-12 rounded-lg bg-base-100 text-white">
                    <h1 className="mb-5 text-5xl font-bold">Hello There..</h1>
                    <p className="mb-5">Welcome Ananna. Complete your task with this todo app. Have a great day!!</p>
                    <Link to="/signup" className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;