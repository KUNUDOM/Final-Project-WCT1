import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await resetPassword(email);
      setMessage("តំណភ្ជាប់សម្រាប់កំណត់ពាក្យសម្ងាត់ថ្មីត្រូវបានផ្ញើទៅអ៊ីមែលរបស់អ្នក");
    } catch (err) {
      setError("មិនអាចផ្ញើអ៊ីមែលបានទេ សូមពិនិត្យអាសយដ្ឋានអ៊ីមែលឡើងវិញ");
    }
    setLoading(false);
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h2>កំណត់ពាក្យសម្ងាត់ថ្មី</h2>
        <p className="auth-sub">
          បញ្ចូលអ៊ីមែលរបស់អ្នក យើងនឹងផ្ញើតំណភ្ជាប់ដើម្បីកំណត់ពាក្យសម្ងាត់ថ្មី
        </p>

        {error && <div className="alert-error">{error}</div>}
        {message && <div className="alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">អ៊ីមែល</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "កំពុងផ្ញើ..." : "ផ្ញើតំណភ្ជាប់"}
          </button>
        </form>

        <p className="auth-alt">
          <Link to="/login">← ត្រឡប់ទៅចូលគណនី</Link>
        </p>
      </div>
    </div>
  );
}
