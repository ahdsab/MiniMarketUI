import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  if (!auth.ready) return <p>Loading...</p>;
  if (!auth.isAuthed) return <Navigate to="/login" replace />;
  return children;
}
