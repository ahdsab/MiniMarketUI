import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setErr("");
      setLoading(true);
      setCart(await api.getCart());
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const updateQty = async (productId, qty) => {
    try {
      await api.updateCartItem(productId, qty);
      await load();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (productId) => {
    try {
      await api.removeCartItem(productId);
      await load();
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <div className="loading">Loading cart...</div>;
  if (err) return <p className="error">{err}</p>;
  if (!cart) return null;

  return (
    <div className="page">
      <h2>Your Shopping Cart</h2>

      {cart.items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p className="muted" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Your cart is empty</p>
          <p className="muted">Start adding products to see them here!</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.items.map((it) => (
                <tr key={it.product_id}>
                  <td><strong>{it.name}</strong></td>
                  <td>${it.price}</td>
                  <td>
                    <input
                      className="qty"
                      type="number"
                      min="0"
                      value={it.quantity}
                      onChange={(e) => updateQty(it.product_id, Number(e.target.value))}
                    />
                  </td>
                  <td><strong style={{ color: 'var(--primary)' }}>${it.line_total}</strong></td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(it.product_id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '2px solid var(--border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginLeft: 'auto' }}>
              <span className="muted" style={{ fontSize: '0.9rem' }}>Grand Total</span>
              <span className="total">${cart.total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
