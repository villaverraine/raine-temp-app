import  { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const appContext = useContext(AppContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!appContext.state || !appContext) {
            navigate('/', { replace: true });
        } else {
            setAuthenticated(true);
        }
    }, [navigate, appContext]);

    if(!isAuthenticated){
        return null;
    }

    return children;
}

export default ProtectedRoute;