export default function SentMessage({ name, email, onReset }) {
  return (
    <div className="done">
      <h2>Suratmu sudah dikirim</h2>
      <p>Terima kasih, {name}. Kami akan membalas ke {email}.</p>
      <button className="again" onClick={onReset}>Tulis surat lagi</button>
    </div>
  );
}
