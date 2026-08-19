import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";

const emptyForm = { name: "", category: "ម្ហូបសំខាន់", price: "", emoji: "🍽" };

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "menu"),
      (snapshot) => {
        setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      () => {
        setStatus(
          "⚠ មិនអាចភ្ជាប់ទៅ Firestore បានទេ។ សូមពិនិត្យ src/firebase.js របស់អ្នក។"
        );
      }
    );
    return unsub;
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    const payload = {
      name: form.name,
      category: form.category,
      price: parseFloat(form.price) || 0,
      emoji: form.emoji || "🍽",
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "menu", editingId), payload);
        setStatus("✓ បានកែប្រែមុខម្ហូបដោយជោគជ័យ");
      } else {
        await addDoc(collection(db, "menu"), payload);
        setStatus("✓ បានបន្ថែមមុខម្ហូបដោយជោគជ័យ");
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      setStatus("⚠ មានបញ្ហា៖ " + err.message);
    }
  }

  function handleEdit(item) {
    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      emoji: item.emoji || "🍽",
    });
    setEditingId(item.id);
  }

  async function handleDelete(id) {
    if (!window.confirm("តើអ្នកប្រាកដថាចង់លុបមុខម្ហូបនេះមែនទេ?")) return;
    try {
      await deleteDoc(doc(db, "menu", id));
      setStatus("✓ បានលុបមុខម្ហូបដោយជោគជ័យ");
    } catch (err) {
      setStatus("⚠ មានបញ្ហា៖ " + err.message);
    }
  }

  function cancelEdit() {
    setForm(emptyForm);
    setEditingId(null);
  }

  return (
    <div className="page admin-page">
      <div className="admin-header">
        <div>
          <p className="section-eyebrow">Admin Dashboard</p>
          <h1>គ្រប់គ្រងមុខម្ហូប</h1>
          <p className="admin-user">ចូលក្នុងនាម៖ {currentUser?.email}</p>
        </div>
      </div>

      {status && (
        <div className={status.startsWith("⚠") ? "alert-error" : "alert-success"}>
          {status}
        </div>
      )}

      <div className="admin-grid">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{editingId ? "កែប្រែមុខម្ហូប" : "បន្ថែមមុខម្ហូបថ្មី"}</h3>

          <div className="field">
            <label>ឈ្មោះមុខម្ហូប</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="ឧ. អាម៉ុកត្រី"
            />
          </div>

          <div className="field">
            <label>ប្រភេទ</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option>ម្ហូបសំខាន់</option>
              <option>អាហារពេលព្រឹក</option>
              <option>ភេសជ្ជៈ</option>
              <option>បង្អែម</option>
            </select>
          </div>

          <div className="field">
            <label>តម្លៃ ($)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="5.00"
            />
          </div>

          <div className="field">
            <label>Emoji (រូបតំណាង)</label>
            <input
              name="emoji"
              value={form.emoji}
              onChange={handleChange}
              placeholder="🍲"
            />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? "រក្សាទុកការកែប្រែ" : "បន្ថែមមុខម្ហូប"}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={cancelEdit}>
                បោះបង់
              </button>
            )}
          </div>
        </form>

        <div className="admin-list">
          <h3>មុខម្ហូបទាំងអស់ ({items.length})</h3>
          {items.length === 0 && (
            <p className="admin-empty">មិនទាន់មានមុខម្ហូបទេ។ សូមបន្ថែមមួយ។</p>
          )}
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>ឈ្មោះ</th>
                <th>ប្រភេទ</th>
                <th>តម្លៃ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="td-emoji">{item.emoji || "🍽"}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td className="td-actions">
                    <button onClick={() => handleEdit(item)}>កែប្រែ</button>
                    <button className="danger" onClick={() => handleDelete(item.id)}>
                      លុប
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
