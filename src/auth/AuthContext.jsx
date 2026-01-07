import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, clearStoredAuth, getStoredToken, getStoredUsername, setStoredAuth } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken());
  const [username, setUsername] = useState(getStoredUsername());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Validate stored token (best-effort)
    (async () => {
      if (!token) {
        setReady(true);
        return;
      }
      try {
        const me = await api.me();
        setUsername(me.username);
      } catch {
        clearStoredAuth();
        setToken("");
        setUsername("");
      } finally {
        setReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({
    token,
    username,
    isAuthed: Boolean(token),
    ready,

    async register(usernameInput, password) {
      await api.register({ username: usernameInput, password });
      // auto-login after register
      const res = await api.login({ username: usernameInput, password });
      setStoredAuth(res.token, res.username);
      setToken(res.token);
      setUsername(res.username);
    },

    async login(usernameInput, password) {
      const res = await api.login({ username: usernameInput, password });
      setStoredAuth(res.token, res.username);
      setToken(res.token);
      setUsername(res.username);
    },

    async logout() {
      try {
        await api.logout();
      } finally {
        clearStoredAuth();
        setToken("");
        setUsername("");
      }
    },
  }), [token, username, ready]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
