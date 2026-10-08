export default function Envelope({ phase, name, children }) {
  const open = ["writing", "folding", "inserting"].includes(phase);
  const visible = phase !== "writing";
  const stamped = ["stamped", "flying"].includes(phase);

  return (
    <div className={`envelope ${phase}`}>
      <div className={`env-part env-back ${visible ? "show" : ""}`} />
      {children /* surat diselipkan di antara bagian belakang dan depan amplop */}
      <div className={`env-part env-front ${visible ? "show" : ""}`} />
      <div className={`env-part env-flap ${open ? "open" : "closed"} ${visible ? "show" : ""}`} />
      <div className={`address ${stamped ? "show" : ""}`}>
        <span>Untuk: Tim Kami</span>
        <span>Dari: {name || "Pengirim"}</span>
      </div>
      <div className={`stamp ${stamped ? "show" : ""}`}>
        <span>TERKIRIM</span>
      </div>
      <div className={`postage ${stamped ? "show" : ""}`} />
    </div>
  );
}
