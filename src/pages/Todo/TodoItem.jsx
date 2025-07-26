import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import { AuthContext } from "../../context/AuthContext";

function TodoItem({ task }) {
    const { toggleTodo, completeTodo, deleteTodo } = useContext(TodoContext);
    const { currentUser } = useContext(AuthContext);

    return (
        <li className="list-group-item d-flex align-items-center justify-content-between">
            <span
                className={
                    task.status === "done" ? "text-decoration-line-through" : ""
                }
            >
                {task.text}
            </span>
            <div>
                {currentUser.role === "admin" ? (
                    <>
                        <span>
                            Ответственный: {task.user ? task.user : "Нет"}
                        </span>
                        <button
                            onClick={() => deleteTodo(task.id)}
                            className="btn btn-outline-danger ms-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                width={16}
                                height={16}
                                fill="red"
                            >
                                <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                            </svg>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => toggleTodo(task.id)}
                            className={
                                task.status === "new"
                                    ? "btn btn-outline-primary"
                                    : "d-none"
                            }
                        >
                            Взять
                        </button>
                        <button
                            onClick={() => completeTodo(task.id)}
                            className={
                                task.status === "in-progress"
                                    ? "btn btn-outline-danger ms-3"
                                    : "d-none"
                            }
                        >
                            Выполнить
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}

export default TodoItem;
