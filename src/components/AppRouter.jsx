import React from "react";
import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import Error from "../pages/Error";
import { publicRoutes, privateRoutes } from "../router";

const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    
    return (
        <Routes>
            {isAuth
                ? privateRoutes.map(route => 
                    <Route key={route.path} path={route.path} element={<route.component />} />    
                  )
                : publicRoutes.map(route => 
                    <Route key={route.path} path={route.path} element={<route.component />} />    
                  )
            }
            {isAuth
                ? <Route path="/login" element={<Navigate to="/posts" replace />} />
                : <Route path="/posts" element={<Navigate to="/login" replace />} />
            }
            <Route path="/*" element={<Error />} />
        </Routes>
    )
}

export default AppRouter;