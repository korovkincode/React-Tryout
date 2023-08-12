import React from "react";
import { useState } from "react";
import { useContext } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import { AuthContext } from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");

    const login = e => {
        e.preventDefault();
        const [username, password] = [e.target[0].value, e.target[1].value];
        if (username === "test" && password === "1234") setIsAuth(1);
        else {
            setErrorMsg("Неправильный логин или пароль");
            return;
        }
        localStorage.setItem("auth", "1");
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин" />
                <MyInput type="password" placeholder="Введите пароль" />
                <MyButton>Войти</MyButton>
            </form>
            <h4 style={{color: "red", paddingTop: "10px"}}>{errorMsg}</h4>
        </div>
    );
}

export default Login;