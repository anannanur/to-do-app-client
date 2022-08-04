import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

    // navigate to signin
    const navigate = useNavigate();
    const navigateToSignin = () => {
        navigate('/signin');
    }

    const handleSignup = event =>{
        event.preventDefault();
    }
    return (
        <div class="hero min-h-screen">
            <div className="hero-overlay bg-opacity-20"></div>
            <div class="card  w-full max-w-sm shadow-2xl bg-base-100 bg-opacity-60">
                <form onSubmit={handleSignup}>
                    <div class="card-body">
                        <h1 className='text-3xl text-primary text-center font-medium'>Sign Up here</h1>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your name" class="input input-bordered" required />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Your email" class="input input-bordered" required />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your password" class="input input-bordered" required />
                            <label class="label">
                                <small className='text-xs'>Already signed up?<Link to="/signin" onClick={navigateToSignin} class="label-text-alt link link-hover"> Click here!</Link></small>
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary">Sign Up</button>
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

export default SignUp;