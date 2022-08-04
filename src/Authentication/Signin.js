import React, { useRef } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import auth from '../firebase/firebase.init';


const SignIn = () => {

    //navigate to signup route
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigateSignUp = () => {
        navigate('/signup');
    }


    const [
        signInWithEmailAndPassword,
        user,
        // loading,
        // error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleSignin = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }

    // to send user from which page he came 
    let from = location?.state?.from.pathname || "/";
    if (user) {
        navigate(from, { replace: true });
    }

    return (

        <div class="hero min-h-screen">
            <div className="hero-overlay bg-opacity-20"></div>
            <div class="card  w-full max-w-sm shadow-2xl bg-base-100 bg-opacity-60">
                <form onSubmit={handleSignin}>
                    <div class="card-body">
                        <h1 className='text-3xl text-primary text-center font-medium'>Sign In here</h1>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input ref={emailRef} type="text" placeholder="Your email" class="input input-bordered" required />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input ref={passwordRef} type="password" placeholder="Your password" class="input input-bordered" required />
                            <label class="label">
                                <small className='text-xs'>Not signed in yet?<Link to="/signup" onClick={navigateSignUp} class="label-text-alt link link-hover"> Sign up here!</Link></small>
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button type="submit" class="btn btn-primary">Sign In</button>
                        </div>
                        <div class="flex flex-col w-full border-opacity-50">
                            <div class="divider">OR</div>
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-outline btn-primary">Continue with Google</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;