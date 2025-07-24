import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import TodoProvider from "./context/TodoContext";
import Header from "./components/Header";
import Todo from "./pages/Todo/Todo";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Header />
                <div className="container my-3">
                    <TodoProvider>
                        <Routes>
                            <Route index element={<Todo />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </TodoProvider>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
