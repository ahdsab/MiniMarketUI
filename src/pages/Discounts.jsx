import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Discounts() {
  const [offers, setOffers] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);
        setOffers(await api.getOffers());
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="loading">Loading discounts...</div>;
  if (err) return <p className="error">{err}</p>;

  return (
    <div className="page">
      <h2>Special Discounts</h2>
      <p className="muted">Don't miss out on these amazing deals!</p>
      <div className="grid">
        {offers.length === 0 ? (
          <div className="card">
            <p className="muted">No discounts available at the moment. Check back soon!</p>
          </div>
        ) : (
          offers.map((o) => (
            <div className="card" key={o.id}>
              <h3>{o.title}</h3>
              <p className="muted">{o.description}</p>
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="old" style={{ fontSize: '1.1rem' }}>${o.old_price}</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>${o.new_price}</span>
                </div>
                {o.old_price && o.new_price && (
                  <span style={{ 
                    display: 'inline-block', 
                    marginTop: '8px',
                    padding: '4px 8px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary-dark)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}>
                    Save ${(o.old_price - o.new_price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
