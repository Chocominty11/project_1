import { useState, useEffect } from "react";
import Letter from "./components/Letter";
import Envelope from "./components/Envelope";
import SentMessage from "./components/SentMessage";
import { PHASES, DURATION } from "./utils/constants";
import { validateForm } from "./utils/validate";
import { unlockAudio, playPhaseSound } from "./utils/sound";
import "./App.css";

const EMPTY_FORM = { name: "", email: "", message: "" };

export default function App() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [phase, setPhase] = useState("writing");
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = validateForm(form);
    setErrors(er);
    if (Object.keys(er).length) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    unlockAudio(); // aktifkan suara setelah klik pengguna
    setPhase("folding");
  };

  // Menjalankan animasi berurutan: folding -> inserting -> ... -> sent
  useEffect(() => {
    const ms = DURATION[phase];
    if (!ms) return;
    const next = PHASES[PHASES.indexOf(phase) + 1];
    const t = setTimeout(() => setPhase(next), ms);
    return () => clearTimeout(t);
  }, [phase]);

  // Memainkan suara setiap fase berganti
  useEffect(() => {
    playPhaseSound(phase);
  }, [phase]);

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setPhase("writing");
  };

  return (
    <div className="desk">
      {phase === "sent" ? (
        <SentMessage name={form.name} email={form.email} onReset={reset} />
      ) : (
        <div className="stage">
          <div className={`mail ${phase === "flying" ? "fly" : ""}`}>
            <Envelope phase={phase} name={form.name}>
              <Letter
                form={form}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
                phase={phase}
                shake={shake}
              />
            </Envelope>
          </div>
        </div>
      )}
    </div>
  );
}
