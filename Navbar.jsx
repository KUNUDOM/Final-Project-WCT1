import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">🍽</span>
          <span className="brand-text">Mahob Khmer</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>
            ទំព័រដើម
          </NavLink>
          <NavLink to="/services" onClick={() => setOpen(false)}>
            មុខម្ហូប
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>
            អំពីយើង
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            ទំនាក់ទំនង
          </NavLink>

          {currentUser ? (
            <>
              <NavLink to="/admin" onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
              <button className="nav-cta ghost" onClick={handleLogout}>
                ចាកចេញ
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-cta" onClick={() => setOpen(false)}>
              ចូលគណនី
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
