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

  if (loading) return <p>Loading...</p>;
  if (err) return <p className="error">{err}</p>;
  if (!cart) return null;

  return (
    <div className="page">
      <h2>Your Cart</h2>
      <p className="muted">User: <b>{cart.username}</b></p>

      {cart.items.length === 0 ? (
        <p className="muted">Cart is empty.</p>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.items.map((it) => (
                <tr key={it.product_id}>
                  <td>{it.name}</td>
                  <td className="muted">{it.unit}</td>
                  <td>${it.unit_price}</td>
                  <td>
                    <input
                      className="qty"
                      type="number"
                      min="1"
                      value={it.quantity}
                      onChange={(e) => updateQty(it.product_id, Number(e.target.value))}
                    />
                  </td>
                  <td><b>${it.line_total}</b></td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(it.product_id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row" style={{ marginTop: 12 }}>
            <span className="muted">Updated: {cart.updated_at}</span>
            <span className="total">Total: ${cart.total}</span>
          </div>
        </div>
      )}
    </div>
  );
}
