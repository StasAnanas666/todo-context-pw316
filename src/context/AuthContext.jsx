import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
    //текущий аутентифицированный пользователь
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    //состояние аутентификации(по умолчанию пользователь не аутентифицорован)
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const savedStatus = localStorage.getItem("status");
        return savedStatus ? JSON.parse(savedStatus) : false;
    });

    const navigate = useNavigate();

    //сохранение текущего пользователя при изменении
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    //сохранение статуса аутентификации при его изменении
    useEffect(() => {
        localStorage.setItem("status", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    //регистрация пользователя
    const register = async ({ username, email, password }) => {
        await fetch("http://localhost:8888/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });
    };

    //аутентификация
    const login = async ({ username, email, password }) => {
        const response = await fetch("http://localhost:8888/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });
        //если запрос успешно выполнен
        if (response.ok) {
            const data = await response.json();
            //сохраняем текущего пользователя
            setCurrentUser(data.user);
            //меняем состояние аутентификации
            setIsAuthenticated(true);
            localStorage.setItem("token", data.token);
            navigate("/");
        }
    };

    //выход из учетки
    const logout = () => {
        //обнуляем текущего пользователя
        setCurrentUser(null);
        //сбрасываем состояние аутентификации
        setIsAuthenticated(false);
        //сбрасываем токен
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{ currentUser, isAuthenticated, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
