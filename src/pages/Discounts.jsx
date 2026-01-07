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

  if (loading) return <p>Loading...</p>;
  if (err) return <p className="error">{err}</p>;

  return (
    <div className="page">
      <h2>Discounts</h2>
      <div className="grid">
        {offers.map((o) => (
          <div className="card" key={o.id}>
            <h3>{o.title}</h3>
            <p className="muted">{o.description}</p>
            <p>
              <span className="old">${o.old_price}</span> <b>${o.new_price}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
