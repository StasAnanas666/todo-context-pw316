import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/TodoContext";

function TodoList() {
    const {tasks} = useContext(TodoContext);

    return (
        <ul className="list-group my-4">
            {tasks.map((task) => (
                <TodoItem
                    key={task.id}
                    task={task}
                />
            ))}
        </ul>
    );
}

export default TodoList;
