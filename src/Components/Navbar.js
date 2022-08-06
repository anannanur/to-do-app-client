import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase/firebase.init';

const Navbar = ({ children }) => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const handleSignout = () => {
        signOut(auth);
        navigate('/');
        toast.success("Signed out successfully",{
            position: "top-center",
            theme: "dark"
        });
    }

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* <!-- Navbar --> */}
                <div className='py-2 mt-0 bg-base-100 z-10'>
                    <div className="w-full navbar  sm:px-0 lg:px-5 ">
                        <Link to="/" className="flex-1 sm:px-0 sm:mx-0 lg:px-2 lg:mx-2 text-primary font-medium text-3xl">To-Do App</Link>
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>

                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                <li><NavLink to="/" className="rounded-lg mr-3">Home</NavLink></li>
                                {user && <>
                                    <li><NavLink to="/add-todos" className="rounded-lg mr-3">Add Todos</NavLink></li>
                                    <li><NavLink to="/your-todos" className="rounded-lg mr-3">Your Todos</NavLink></li>
                                </>}
                                {user ?
                                    <li><button onClick={handleSignout} className="btn btn-primary btn-outline rounded-lg">Sign Out</button></li>
                                    :
                                    <li><Link to="/signin" className="btn btn-primary btn-outline rounded-lg">Sign In</Link></li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <!-- Page content here --> */}
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
                    {/* <!-- Sidebar content here --> */}
                    <li><NavLink to="/" className="rounded-lg mb-2 ">Home</NavLink></li>
                    {user &&
                        <>
                            <li><NavLink to="/add-todos" className="rounded-lg mb-2 ">Add Todos</NavLink></li>
                            <li><NavLink to="/your-todos" className="rounded-lg mb-2 ">Your Todos</NavLink></li>
                        </>
                    }
                    {user ?
                        <li><button onClick={handleSignout} className="btn  mb-2 btn-primary btn-outline rounded-lg">Sign Out</button></li>
                        :
                        <li><Link to="/signin" className="btn  mb-2 btn-primary btn-outline rounded-lg">Sign In</Link></li>
                    }

                </ul>

            </div>
        </div>
    );
};

export default Navbar;