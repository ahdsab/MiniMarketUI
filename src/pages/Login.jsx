import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const auth = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      await auth.login(username, password);
      nav("/cart");
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <form className="card form" onSubmit={submit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
        <button className="btn" type="submit">Login</button>
        {err && <p className="error">{err}</p>}
        <p className="muted">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
