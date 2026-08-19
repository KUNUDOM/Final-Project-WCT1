import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">🍽 Mahob Khmer</div>
          <p>ភោជនីយដ្ឋានម្ហូបខ្មែរដើម ធ្វើពីចិត្ត ជូនអតិថិជនគ្រប់រូប។</p>
        </div>

        <div>
          <h4>តំណភ្ជាប់</h4>
          <Link to="/">ទំព័រដើម</Link>
          <Link to="/services">មុខម្ហូប</Link>
          <Link to="/about">អំពីយើង</Link>
          <Link to="/contact">ទំនាក់ទំនង</Link>
        </div>

        <div>
          <h4>ទំនាក់ទំនង</h4>
          <p>ផ្លូវ 271, ភ្នំពេញ</p>
          <p>012 345 678</p>
          <p>hello@mahobkhmer.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Mahob Khmer. រក្សាសិទ្ធិគ្រប់យ៉ាង។
      </div>
    </footer>
  );
}
