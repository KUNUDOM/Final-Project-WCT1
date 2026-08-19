import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError("អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ");
    }
    setLoading(false);
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h2>ចូលគណនី</h2>
        <p className="auth-sub">សូមស្វាគមន៍មកវិញ! បញ្ចូលព័ត៌មានរបស់អ្នក</p>

        {error && <div className="alert-error">{error}</div>}

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
          <div className="field">
            <label htmlFor="password">ពាក្យសម្ងាត់</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "កំពុងចូល..." : "ចូលគណនី"}
          </button>
        </form>

        <p className="auth-alt">
          <Link to="/forgot-password">ភ្លេចពាក្យសម្ងាត់?</Link>
        </p>
        <p className="auth-alt">
          មិនទាន់មានគណនី? <Link to="/register">ចុះឈ្មោះ</Link>
        </p>
      </div>
    </div>
  );
}
