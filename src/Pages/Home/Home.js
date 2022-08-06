import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase/firebase.init';

const Home = () => {
    const [user] = useAuthState(auth);

    return (
        <div className="hero h-screen"
            style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
            }}>
            <div className="hero-overlay bg-base-100 bg-opacity-30"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md bg-opacity-50 p-12 rounded-lg bg-base-100">
                    <h1 className="mb-5 text-3xl font-medium text-primary">Welcome to my Todo!</h1>
                    <p className="mb-5 text-white">List your day to day tasks and complete those tasks with this todo app. Have a great day!!</p>
                    {user ? <Link to="/add-todos" className="btn btn-primary">Get Started</Link>
                        :
                        <Link to="/signup" className="btn btn-primary">Get Started</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;