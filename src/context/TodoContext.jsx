import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

//создание глобального контекста приложения
export const TodoContext = createContext();

function TodoProvider({ children }) {
    const { currentUser, token } = useContext(AuthContext);

    //массив задач, по умолчанию пустой массив
    //это глобальное состояние, которое будет использоваться другими компонентами
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const response = await fetch("http://localhost:8888/tasks", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data.tasks);
            }
        };
        getTasks();
    }, []);

    //добавление новой задачи
    const addTodo = (text) => {
        //к актуальным данным массива tasks добавляем новый объект
        setTasks([
            ...tasks,
            {
                id: `${todoIdPrefix}-task-${Date.now()}`,
                text,
                status: "new",
                user: null,
            },
        ]);
    };

    //изменение статуса задачи и закрепление пользователя(пользователь берет задачу в работу)
    const toggleTodo = (id) => {
        //находим задачу с Id, равным переданному и меняем в текущем объекте задачи статус на противоположный
        //массив с полученными задачами перезаписываем в состояние tasks
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          status: "in-progress",
                          user: currentUser.username,
                      }
                    : task
            )
        );
    };

    //завершение задачи
    const completeTodo = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, status: "done" } : task
            )
        );
    };

    //удаление задачи по id
    const deleteTodo = (id) => {
        //фильтруем в новый массив задачи, id которых не равен переданному
        //массив с полученными задачами перезаписываем в состояние tasks
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <TodoContext.Provider
            value={{ tasks, addTodo, toggleTodo, completeTodo, deleteTodo }}
        >
            {children}
        </TodoContext.Provider>
    );
}

export default TodoProvider;
