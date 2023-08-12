import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = ({items}) => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(0);
        localStorage.removeItem("auth");
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                {items.map((item) => 
                    <Link to={item.link}>{item.name}</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar;