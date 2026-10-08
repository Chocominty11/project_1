export default function SubmitButton({ disabled }) {
  return (
    <button type="submit" className="seal" disabled={disabled} aria-label="Kirim surat">
      Kirim
    </button>
  );
}
