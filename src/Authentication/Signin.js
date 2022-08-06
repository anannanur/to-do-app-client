import React, { useRef } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle, } from 'react-firebase-hooks/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import auth from '../firebase/firebase.init';
import Loader from './Loader';


const SignIn = () => {

    //navigate to signup route
    const navigate = useNavigate();
    const navigateSignUp = () => {
        navigate('/signup');
    }


    const location = useLocation();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle,
        gUser,
        gLoading,
        gError
    ] = useSignInWithGoogle(auth);

    //handling sign in button
    const handleSignin = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }

    let from = location?.state?.from.pathname || "/";

    if (loading || gLoading) {
        return <Loader/>;
    }
    if (user || gUser) {
        navigate(from, { replace: true });
    }

    // error handling 
    let errorMessage;
    if (error) {
        errorMessage = 
        <div>
            <small className='text-red-500 font-medium'>{error.message}</small>
        </div>       
    }
    if (gError) {
        errorMessage = 
        <div>
            <small className='text-red-500 font-medium'>{gError.message}</small>
        </div>
    }

    return (

        <div className="hero bg-accent min-h-fit" >
            <div data-aos-duration="1200" data-aos="zoom-in" className="card my-10 w-full max-w-sm shadow-2xl bg-base-100 bg-opacity-60">
                <form onSubmit={handleSignin}>
                    <div className="card-body">
                        <h1 className='text-3xl text-primary text-center font-medium'>Sign In here</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input ref={emailRef} type="text" placeholder="Your email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input ref={passwordRef} type="password" placeholder="Your password" className="input input-bordered" required />
                            <label className="label">
                                <small className='text-xs'>Not signed in yet?<Link to="/signup" onClick={navigateSignUp} className="label-text-alt link link-hover"> Sign up here!</Link></small>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </div>
                        <div className="flex flex-col w-full border-opacity-50">
                            <div className="divider">OR</div>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-primary">Continue with Google</button>
                        </div>
                        {errorMessage}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;