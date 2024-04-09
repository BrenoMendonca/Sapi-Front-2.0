import { Navigate, Outlet } from 'react-router-dom';

let authToken = false;

export const PrivateRoutes = () => {
    
      const sessionData = localStorage.getItem('session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        authToken = session.token
        
      
      }
    return (
        authToken ? <Outlet/> : <Navigate to="/"/>
    )
  };
