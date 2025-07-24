import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    //зарегистрированные пользователи
    const [users, setUsers] = useState(() => {
        //получаем список пользователей из LocalStorage
        const registeredUsers = localStorage.getItem("users");
        //если данные есть, перезаписываем в состояние полученный массив пользователей, иначе пустой массив
        return registeredUsers ? JSON.parse(registeredUsers) : [];
    });

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

    //сохранение списка пользователей при его изменении
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    //сохранение текущего пользователя при изменении
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    //сохранение статуса аутентификации при его изменении
    useEffect(() => {
        localStorage.setItem("status", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    //регистрация пользователя
    const register = ({ username, email, password }) => {
        let role;
        //если зарегистрированных пользователей нет, то первый будет админом, иначе юзер
        users.length === 0 ? role = "admin" : role = "user";
        setUsers([
            ...users,
            { id: Date.now(), username, email, password, role },
        ]);
    };

    //аутентификация
    const login = ({ email, password }) => {
        //ищем пользователя по email и паролю
        const user = users.find(
            (u) => u.email === email && u.password === password
        );
        //если пользователь найден
        if (user) {
            //сохраняем как текущего
            setCurrentUser(user);
            //меняем состояние аутентификации
            setIsAuthenticated(true);
        }
    };

    //выход из учетки
    const logout = () => {
        //обнуляем текущего пользователя
        setCurrentUser(null);
        //сбрасываем состояние аутентификации
        setIsAuthenticated(false);
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
