export default function Home() {
  return (
    <div className="page">
      <h1>Fresh products, every day</h1>
      <p className="muted">
        Browse products, view discounts, and add items to your personal cart.
      </p>
      <div className="cardsRow">
        <div className="card">
          <h3>Products</h3>
          <p className="muted">Explore groceries by category and price.</p>
        </div>
        <div className="card">
          <h3>Discounts</h3>
          <p className="muted">Weekly offers and special bundles.</p>
        </div>
        <div className="card">
          <h3>Your Cart</h3>
          <p className="muted">Cart is per-user (login required).</p>
        </div>
      </div>
    </div>
  );
}
