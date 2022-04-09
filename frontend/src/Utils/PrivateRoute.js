import { Routes,Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'

const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)
    if (user) {
        return children;
      } else {
        return <Navigate to="/login" />;
      }
    
      
}

export default PrivateRoute;