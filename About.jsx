import "./About.css";

const values = [
  { title: "គុណភាព", desc: "ជ្រើសរើសគ្រឿងផ្សំស្រស់ៗពីទីផ្សារជារៀងរាល់ថ្ងៃ" },
  { title: "ស្មោះត្រង់", desc: "តម្លៃច្បាស់លាស់ សេវាកម្មស្មោះត្រង់ចំពោះអតិថិជន" },
  { title: "សហគមន៍", desc: "គាំទ្រកសិករក្នុងស្រុក និងអ្នកផ្គត់ផ្គង់មូលដ្ឋាន" },
];

export default function About() {
  return (
    <div className="page about-page">
      <p className="section-eyebrow">អំពីយើង</p>
      <h1>រឿងរ៉ាវរបស់ Mahob Khmer</h1>
      <p className="about-intro">
        Mahob Khmer ចាប់ផ្តើមឡើងពីក្តីស្រម៉ៃចង់ចែករំលែករសជាតិម្ហូបខ្មែរដើម
        ដល់អតិថិជនគ្រប់រូប។ តាំងពីឆ្នាំ២០១៨ យើងបានបម្រើអតិថិជនរាប់ពាន់នាក់
        ដោយប្រកាន់ខ្ជាប់នូវរូបមន្តតំណពូជគ្រួសារ និងគុណភាពគ្រឿងផ្សំដែលល្អបំផុត។
      </p>

      <div className="about-grid">
        {values.map((v) => (
          <div className="value-card" key={v.title}>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="about-stats">
        <div>
          <strong>6+</strong>
          <span>ឆ្នាំបទពិសោធន៍</span>
        </div>
        <div>
          <strong>1,200+</strong>
          <span>អតិថិជនរីករាយ</span>
        </div>
        <div>
          <strong>40+</strong>
          <span>មុខម្ហូប</span>
        </div>
      </div>
    </div>
  );
}
