import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

//создание глобального контекста приложения
export const TodoContext = createContext();

function TodoProvider({ children }) {
    //массив задач, по умолчанию пустой массив
    const [tasks, setTasks] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const token = localStorage.getItem("token");

    //загрузка задач после аутентификации пользователя
    useEffect(() => {
        if (currentUser) {
            getTasks();
        }
    }, [currentUser]);

    //получение всех задач
    const getTasks = async () => {
        const response = await fetch("http://localhost:8888/tasks", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            setTasks(data);
        }
    };

    //добавление новой задачи
    const addTodo = async (title, deadline, priority) => {
        const response = await fetch("http://localhost:8888/tasks", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ title, deadline, priority }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            getTasks();
        }
    };

    //изменение статуса задачи и закрепление пользователя(пользователь берет задачу в работу)
    const toggleTodo = async (id) => {
        const response = await fetch(
            `http://localhost:8888/tasks/active/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            getTasks();
        }
    };

    //завершение задачи
    const completeTodo = async(id) => {
        const response = await fetch(
            `http://localhost:8888/tasks/complete/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            getTasks();
        }
    };

    //удаление задачи по id
    const deleteTodo = async(id) => {
        const response = await fetch(
            `http://localhost:8888/tasks/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            getTasks();
        }
    };

    return (
        <TodoContext.Provider
            value={{
                tasks,
                getTasks,
                addTodo,
                toggleTodo,
                completeTodo,
                deleteTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

export default TodoProvider;
