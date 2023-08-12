import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";

function App () {
    const [isAuth, setIsAuth] = useState(0);
    
    useEffect(() => {
        if (localStorage.getItem("auth")) setIsAuth(1);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <Navbar
                    items={[{name: "О сайте", link: "/about"}, {name: "Посты", link: "/posts"}]}
                />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;