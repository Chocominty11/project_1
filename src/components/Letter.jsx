import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { MIN_MESSAGE } from "../utils/validate";

export default function Letter({ form, errors, onChange, onSubmit, phase, shake }) {
  const locked = phase !== "writing";
  return (
    <form className={`letter ${phase} ${shake ? "shake" : ""}`} onSubmit={onSubmit} noValidate>
      <div className="letter-body">
        <h1>Kepada Tim Kami,</h1>
        <InputField
          label="Nama" name="name" value={form.name} onChange={onChange}
          error={errors.name} disabled={locked} placeholder="Tulis namamu di sini"
        />
        <InputField
          label="Email" name="email" type="email" value={form.email} onChange={onChange}
          error={errors.email} disabled={locked} placeholder="nama@email.com"
        />
        <InputField
          label="Pesan" name="message" multiline value={form.message} onChange={onChange}
          error={errors.message} disabled={locked} placeholder="Ceritakan apa yang ingin kamu sampaikan..."
          minLength={MIN_MESSAGE}
        />
        <div className="letter-foot">
          <span className="sign">Salam hangat,</span>
          <SubmitButton disabled={locked} />
        </div>
      </div>
    </form>
  );
}
