import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { register } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() && email.trim() && password.trim()) {
            register({ username, email, password });
            setUsername("");
            setEmail("");
            setPassword("");
            navigate("/login");//редирект на страницу входа
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите имя пользователя..."
                    className="form-control"
                />
            </div>
            <div className="form-group my-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите email..."
                    className="form-control"
                />
            </div>
            <div className="form-group my-3">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль..."
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-outline-success mt-3">
                Зарегистрироваться
            </button>
        </form>
    );
}

export default Register;
