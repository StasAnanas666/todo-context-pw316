import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../../context/TodoContext";
import { AuthContext } from "../../context/AuthContext";
import TodoList from "./TodoList";

function TaskManager() {
    const { currentUser } = useContext(AuthContext);
    const { tasks } = useContext(TodoContext);
    //новые задачи
    const newTasks = tasks.filter((t) => t.status === "new");

    //задачи в работе
    //для админа отображаются все задачи
    //для юзера только его задачи
    const inProgressTasks =
        currentUser.role === "admin"
            ? tasks.filter((t) => t.status === "in-progress")
            : tasks.filter(
                  (t) =>
                      t.status === "in-progress" && t.userid === currentUser.id
              );

    //выполненные задачи
    const completedTasks =
        currentUser.role === "admin"
            ? tasks.filter((t) => t.status === "done")
            : tasks.filter(
                  (t) => t.status === "done" && t.userid === currentUser.id
              );

    return (
        <>
            <div className="accordion my-4" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button text-white bg-info"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne"
                        >
                            Новые задачи
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse show"
                    >
                        <div className="accordion-body">
                            <TodoList tasks={newTasks} />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed text-bg-success"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseTwo"
                        >
                            В работе
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse show"
                    >
                        <div className="accordion-body">
                            <TodoList tasks={inProgressTasks} />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed text-bg-danger"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseThree"
                        >
                            Выполненные
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse show"
                    >
                        <div className="accordion-body">
                            <TodoList tasks={completedTasks} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskManager;
