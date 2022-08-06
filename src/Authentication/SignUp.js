import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebase.init';
import Loader from './Loader';
import { toast } from 'react-toastify';

const SignUp = () => {

    const navigate = useNavigate();
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    // navigate to signin
    const navigateToSignin = () => {
        navigate('/signin');
    }

    //handling sign up button
    const handleSignup = event => {
        event.preventDefault();
        // const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        createUserWithEmailAndPassword(email, password);
        toast.success("Signed up successfully", {
            position: "top-center",
            theme: "dark"
        });
    }

    if (user || gUser) {
        navigate(from, { replace: true });
    }
    if (loading || gLoading) {
        return <Loader />;
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
        <div className="hero bg-accent min-h-fit">
            <div data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500" className="card w-full my-10 max-w-sm shadow-2xl bg-base-100 bg-opacity-60">
                <form onSubmit={handleSignup}>
                    <div className="card-body">
                        <h1 className='text-3xl text-primary text-center font-medium'>Sign Up here</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input ref={nameRef} type="text" placeholder="Your name" className="input input-bordered" required />
                        </div>
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
                                <small className='text-xs'>Already signed up?<Link to="/signin" onClick={navigateToSignin} className="label-text-alt link link-hover"> Click here!</Link></small>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
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

export default SignUp;