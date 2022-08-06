import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../firebase/firebase.init';

const PrivateRoute = ({children}) => {

    const [user] = useAuthState(auth);
    const location = useLocation()

    if(!user){
        <Navigate to="/login" state={{from: location}} replace></Navigate>
    }

    return children;
};

export default PrivateRoute;