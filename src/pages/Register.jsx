import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const auth = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      await auth.register(username, password);
      nav("/cart");
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      <form className="card form" onSubmit={submit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username (min 3 chars)" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6 chars)" type="password" required />
        <button className="btn" type="submit">Create account</button>
        {err && <p className="error">{err}</p>}
        <p className="muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
