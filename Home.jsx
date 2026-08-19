import { Link } from "react-router-dom";
import "./Home.css";

const highlights = [
  {
    icon: "🍲",
    title: "ម្ហូបខ្មែរដើម",
    desc: "រូបមន្តតំណពូជគ្រួសារ ធ្វើពីគ្រឿងផ្សំស្រស់ជារៀងរាល់ថ្ងៃ",
  },
  {
    icon: "👨‍🍳",
    title: "ចុងភៅជំនាញ",
    desc: "ក្រុមចុងភៅមានបទពិសោធន៍ជាង១០ឆ្នាំក្នុងម្ហូបខ្មែរ",
  },
  {
    icon: "🚚",
    title: "ដឹកជញ្ជូនលឿន",
    desc: "កម្ម៉ង់តាមអនឡាញ ទទួលបានក្នុងរយៈពេល៣០នាទី",
  },
];

const featured = [
  { name: "អាម៉ុកត្រី", price: "$6.50", img: "🐟" },
  { name: "សម្លម្ជូរគ្រឿង", price: "$5.00", img: "🍜" },
  { name: "នំបញ្ចុកខ្មែរ", price: "$3.50", img: "🍚" },
];

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <p className="section-eyebrow">ភោជនីយដ្ឋានម្ហូបខ្មែរ</p>
          <h1>រសជាតិដើម ស្នេហាដែលមិនចេះនឿយហត់</h1>
          <p className="hero-sub">
            រីករាយជាមួយម្ហូបខ្មែរពិតៗ ធ្វើដោយចិត្តស្រលាញ់ក្នុងបរិយាកាសកក់ក្តៅ
            សម្រាប់គ្រួសារ និងមិត្តភក្តិរបស់អ្នក។
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn-primary">
              មើលមុខម្ហូប
            </Link>
            <Link to="/contact" className="btn-secondary">
              កក់តុ
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          🍛
        </div>
      </section>

      <section className="page highlights">
        {highlights.map((h) => (
          <div className="highlight-card" key={h.title}>
            <div className="highlight-icon">{h.icon}</div>
            <h3>{h.title}</h3>
            <p>{h.desc}</p>
          </div>
        ))}
      </section>

      <section className="page featured-section">
        <p className="section-eyebrow">មុខម្ហូបពេញនិយម</p>
        <h2>ជម្រើសដ៏ពិសេសពីភោជនីយដ្ឋានយើង</h2>
        <div className="featured-grid">
          {featured.map((f) => (
            <div className="featured-card" key={f.name}>
              <div className="featured-emoji">{f.img}</div>
              <h3>{f.name}</h3>
              <span className="featured-price">{f.price}</span>
            </div>
          ))}
        </div>
        <div className="featured-cta">
          <Link to="/services" className="btn-secondary">
            មើលមុខម្ហូបទាំងអស់ →
          </Link>
        </div>
      </section>
    </div>
  );
}
