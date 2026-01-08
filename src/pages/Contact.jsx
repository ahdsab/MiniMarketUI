import { useState } from "react";
import { api } from "../api/client";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setStatus("Sending...");
      const res = await api.sendContact({ name, email, message });
      setStatus(res.message || "Sent!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setStatus(e.message);
    }
  };

  return (
    <div className="page">
      <h2>Contact Us</h2>
      <p className="muted">Have a question or feedback? We'd love to hear from you!</p>
      <form onSubmit={submit} className="card form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" type="email" required />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" rows={5} required />
        <button className="btn" type="submit">Send Message</button>
        {status && (
          <p className={status.includes('Sent') || status.includes('Success') ? 'status success' : 'muted'}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
