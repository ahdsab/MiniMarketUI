import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <h1>Fresh products, every day</h1>
      <p className="muted" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
        Browse products, view discounts, and add items to your personal cart.
      </p>
      <div className="cardsRow">
        <div className="card">
          <h3>🛒 Products</h3>
          <p className="muted">Explore groceries by category and price. Find everything you need for your daily shopping.</p>
          <Link to="/products" style={{ marginTop: '16px', display: 'inline-block' }}>
            <button className="btn btn-sm">Browse Products</button>
          </Link>
        </div>
        <div className="card">
          <h3>🎉 Discounts</h3>
          <p className="muted">Weekly offers and special bundles. Don't miss out on great savings!</p>
          <Link to="/discounts" style={{ marginTop: '16px', display: 'inline-block' }}>
            <button className="btn btn-sm">View Deals</button>
          </Link>
        </div>
        <div className="card">
          <h3>🛍️ Your Cart</h3>
          <p className="muted">Your personal shopping cart. Login required to save and manage your items.</p>
          <Link to="/cart" style={{ marginTop: '16px', display: 'inline-block' }}>
            <button className="btn btn-sm">View Cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
