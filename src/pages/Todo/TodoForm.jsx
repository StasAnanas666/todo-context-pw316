import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../../context/TodoContext";

function TodoForm() {
    //состояние будет привязано к полю ввода и будет меняться при изменении значения в поле ввода
    const [text, setText] = useState(""); //задача из поля ввода
    const inputRef = useRef(null);

    //обращаемся к контексту TodoContext, достаем из него метод добавления задачи
    const { addTodo } = useContext(TodoContext);

    useEffect(() => inputRef.current.focus(), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(text);
        setText(""); //очистка формы
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Введите задачу..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    ref={inputRef}
                />
                <button className="btn btn-outline-success ms-3" type="submit">
                    Добавить
                </button>
            </div>
        </form>
    );
}

export default TodoForm;
