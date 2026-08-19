import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ");
    }
    if (password.length < 6) {
      return setError("ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ");
    }

    setLoading(true);
    try {
      await register(email, password);
      navigate("/admin");
    } catch (err) {
      setError("មិនអាចបង្កើតគណនីបានទេ សូមព្យាយាមម្តងទៀត");
    }
    setLoading(false);
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h2>ចុះឈ្មោះ</h2>
        <p className="auth-sub">បង្កើតគណនីថ្មីដើម្បីគ្រប់គ្រងគេហទំព័រ</p>

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
              placeholder="យ៉ាងតិច ៦ តួអក្សរ"
            />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">បញ្ជាក់ពាក្យសម្ងាត់</label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "កំពុងបង្កើត..." : "ចុះឈ្មោះ"}
          </button>
        </form>

        <p className="auth-alt">
          មានគណនីរួចហើយ? <Link to="/login">ចូលគណនី</Link>
        </p>
      </div>
    </div>
  );
}
