import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "./Services.css";

// ទិន្នន័យគំរូ ប្រើពេល Firestore មិនទាន់មានទិន្នន័យ ឬមិនទាន់ configure
const sampleMenu = [
  { id: "s1", name: "អាម៉ុកត្រី", category: "ម្ហូបសំខាន់", price: 6.5, emoji: "🐟" },
  { id: "s2", name: "សម្លម្ជូរគ្រឿង", category: "ម្ហូបសំខាន់", price: 5.0, emoji: "🍜" },
  { id: "s3", name: "ខសាច់អាំង", category: "ម្ហូបសំខាន់", price: 5.5, emoji: "🍢" },
  { id: "s4", name: "នំបញ្ចុកខ្មែរ", category: "អាហារពេលព្រឹក", price: 3.5, emoji: "🍚" },
  { id: "s5", name: "បបរសាច់មាន់", category: "អាហារពេលព្រឹក", price: 2.5, emoji: "🥣" },
  { id: "s6", name: "ឆាក្តាមអំបិលម្ទេស", category: "ម្ហូបសំខាន់", price: 8.0, emoji: "🦀" },
  { id: "s7", name: "ទឹកអំពៅ", category: "ភេសជ្ជៈ", price: 1.5, emoji: "🥤" },
  { id: "s8", name: "ចាហួយថ្នាំបារាំង", category: "បង្អែម", price: 2.0, emoji: "🍮" },
];

export default function Services() {
  const [menu, setMenu] = useState(sampleMenu);
  const [activeCategory, setActiveCategory] = useState("ទាំងអស់");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "menu"),
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setMenu(items);
        }
      },
      () => {
        // Firebase មិនទាន់ configure ត្រឹមត្រូវ — ប្រើទិន្នន័យគំរូជំនួស
        setMenu(sampleMenu);
      }
    );
    return unsub;
  }, []);

  const categories = ["ទាំងអស់", ...new Set(menu.map((m) => m.category))];
  const filtered =
    activeCategory === "ទាំងអស់"
      ? menu
      : menu.filter((m) => m.category === activeCategory);

  return (
    <div className="page services-page">
      <p className="section-eyebrow">មុខម្ហូប</p>
      <h1>ជ្រើសរើសមុខម្ហូបដែលអ្នកចូលចិត្ត</h1>

      <div className="category-tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={`tab ${activeCategory === c ? "active" : ""}`}
            onClick={() => setActiveCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filtered.map((item) => (
          <div className="menu-card" key={item.id}>
            <div className="menu-emoji">{item.emoji || "🍽"}</div>
            <div className="menu-info">
              <h3>{item.name}</h3>
              <span className="menu-category">{item.category}</span>
            </div>
            <div className="menu-price">${Number(item.price).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
