import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: ភ្ជាប់ជាមួយ Firestore ដើម្បីរក្សាទុក message
    // ឧទាហរណ៍: addDoc(collection(db, "messages"), { name, email, message, createdAt: serverTimestamp() })
    setSent(true);
  }

  return (
    <div className="page contact-page">
      <p className="section-eyebrow">ទំនាក់ទំនង</p>
      <h1>យើងរីករាយទទួលការកក់ និងសំណួររបស់អ្នក</h1>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          {sent && (
            <div className="alert-success">
              សូមអរគុណ! សារបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។
            </div>
          )}
          <div className="field">
            <label htmlFor="name">ឈ្មោះ</label>
            <input id="name" type="text" required placeholder="ឈ្មោះរបស់អ្នក" />
          </div>
          <div className="field">
            <label htmlFor="email">អ៊ីមែល</label>
            <input id="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="message">សារ</label>
            <textarea
              id="message"
              rows="5"
              required
              placeholder="សរសេរសាររបស់អ្នកនៅទីនេះ..."
            />
          </div>
          <button type="submit" className="btn-primary">
            ផ្ញើសារ
          </button>
        </form>

        <div className="contact-info">
          <div className="info-item">
            <h3>📍 អាសយដ្ឋាន</h3>
            <p>ផ្លូវ 271, សង្កាត់បឹងកេងកង, ភ្នំពេញ</p>
          </div>
          <div className="info-item">
            <h3>📞 ទូរស័ព្ទ</h3>
            <p>012 345 678</p>
          </div>
          <div className="info-item">
            <h3>✉️ អ៊ីមែល</h3>
            <p>hello@mahobkhmer.com</p>
          </div>
          <div className="info-item">
            <h3>🕐 ម៉ោងបើក</h3>
            <p>ចន្ទ - អាទិត្យ, ៧ព្រឹក - ១០យប់</p>
          </div>
        </div>
      </div>
    </div>
  );
}
