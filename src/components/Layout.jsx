import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../App.css";

export default function Layout() {
  const auth = useAuth();

  return (
    <div className="appShell">
      <header className="header">
        <div className="container header-inner">
          <div className="logo">Mini Market</div>

          <nav className="nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/discounts">Discounts</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/cart">Cart</NavLink>
          </nav>

          <div className="authBox">
            {auth.isAuthed ? (
              <>
                <span className="muted">Hi, <b>{auth.username}</b></span>
                <button className="btn btn-sm" onClick={auth.logout}>Logout</button>
              </>
            ) : (
              <>
                <NavLink className="btn btn-link" to="/login">Login</NavLink>
                <NavLink className="btn btn-sm" to="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container main">
        {!auth.ready ? <p>Loading...</p> : <Outlet />}
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2025 Mini Market</span>
          <span className="muted">API: http://localhost:8000</span>
        </div>
      </footer>
    </div>
  );
}
