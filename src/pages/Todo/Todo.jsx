import { useContext } from "react";
import TodoForm from "./TodoForm";
import TaskManager from "./TaskManager";
import { AuthContext } from "../../context/AuthContext";

function Todo() {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            {currentUser.role === "admin" && <TodoForm />}
            <TaskManager />
        </>
    );
}

export default Todo;
