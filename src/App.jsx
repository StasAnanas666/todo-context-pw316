import TodoProvider from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
    return (
        <TodoProvider>
            <div className="container my-3">
                <TodoForm />
                <TodoList />
            </div>
        </TodoProvider>
    );
}

export default App;
