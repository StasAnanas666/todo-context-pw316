import TodoItem from "./TodoItem";

function TodoList({ tasks }) {
    return (
        <ul className="list-group my-4">
            {tasks.map((task) => (
                <TodoItem key={task.id} task={task} />
            ))}
        </ul>
    );
}

export default TodoList;
