import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../auth/AuthContext";

export default function Products() {
  const auth = useAuth();
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);
        setProducts(await api.getProducts());
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const add = async (id) => {
    if (!auth.isAuthed) {
      alert("Please login to use your cart.");
      return;
    }
    try {
      await api.addCartItem(id, 1);
      alert("Added to cart ✅");
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (err) return <p className="error">{err}</p>;

  return (
    <div className="page">
      <h2>Products</h2>
      <p className="muted">Browse our selection and login to add items to your personal cart.</p>

      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p className="muted">{p.description}</p>
            <div className="row" style={{ marginTop: '16px' }}>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>${p.price}</span>
              </div>
              <button className="btn btn-sm" onClick={() => add(p.id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
