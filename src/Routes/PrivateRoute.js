import React, { useContext } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';



const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <InfinitySpin 
        width='200'
        color="#FAD207"
      />
    }

    if (user){
        return children;
    }

    return <Navigate to="/" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;