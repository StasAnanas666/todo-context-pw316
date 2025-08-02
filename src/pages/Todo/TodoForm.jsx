import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../../context/TodoContext";

function TodoForm() {
    //состояние будет привязано к полю ввода и будет меняться при изменении значения в поле ввода
    const [title, setTitle] = useState(""); //задача из поля ввода
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("Low");
    const inputRef = useRef(null);

    //обращаемся к контексту TodoContext, достаем из него метод добавления задачи
    const { addTodo } = useContext(TodoContext);

    useEffect(() => inputRef.current.focus(), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(title, deadline, priority);
        setTitle(""); //очистка формы
        setDeadline("");
        setPriority("Low");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Введите задачу..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ref={inputRef}
                />
                <input
                    type="date"
                    className="form-control ms-3"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <select
                    className="form-select ms-3"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Низкий</option>
                    <option value="Medium">Средний</option>
                    <option value="High">Высокий</option>
                </select>
                <button className="btn btn-outline-success ms-3" type="submit">
                    Добавить
                </button>
            </div>
        </form>
    );
}

export default TodoForm;
