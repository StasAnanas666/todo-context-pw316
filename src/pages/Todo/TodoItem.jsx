import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

function TodoItem({ task }) {
    const { toggleTodo, deleteTodo } = useContext(TodoContext);

    return (
        <li className="list-group-item d-flex align-items-center justify-content-between">
            <span
                className={task.completed ? "text-decoration-line-through" : ""}
            >
                {task.text}
            </span>
            <div>
                <button
                    onClick={() => toggleTodo(task.id)}
                    className="btn btn-outline-primary"
                >
                    {task.completed ? "Отменить" : "Выполнить"}
                </button>
                <button
                    onClick={() => deleteTodo(task.id)}
                    className="btn btn-outline-danger ms-2"
                >
                    Удалить
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
