import { createContext, useEffect, useState } from "react";

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

    const [token, setToken] = useState(() => {
        const accessToken = localStorage.getItem("token");
        return accessToken ? JSON.parse(accessToken) : false;
    });

    //сохранение текущего пользователя при изменении
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    //сохранение статуса аутентификации при его изменении
    useEffect(() => {
        localStorage.setItem("status", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);
    //сохранение токена при его изменении
    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(token));
    }, [token]);

    //регистрация пользователя
    const register = async ({ username, email, password }) => {
        await fetch("http://localhost:8888/register", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
        });
    };

    //аутентификация
    const login = async ({ username, email, password }) => {
        const response = await fetch("http://localhost:8888/login", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
        });
        //если запрос успешно выполнен
        if (response.ok) {
            const data = await response.json();
            //сохраняем текущего пользователя
            setCurrentUser(data.user);
            //меняем состояние аутентификации
            setIsAuthenticated(true);
            setToken(data.token);
        }
    };

    //выход из учетки
    const logout = () => {
        //обнуляем текущего пользователя
        setCurrentUser(null);
        //сбрасываем состояние аутентификации
        setIsAuthenticated(false);
        //сбрасываем токен
        setToken(null);
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
