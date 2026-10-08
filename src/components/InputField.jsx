export default function InputField({
  label, name, value, onChange, error, multiline, disabled,
  type = "text", placeholder, minLength,
}) {
  const Tag = multiline ? "textarea" : "input";
  const count = value.trim().length;

  return (
    <label className={`field ${error ? "has-error" : ""}`}>
      <span className="field-label">{label}</span>
      <Tag
        name={name}
        type={multiline ? undefined : type}
        rows={multiline ? 3 : undefined}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
      />
      {minLength && (
        <span className={`counter ${count >= minLength ? "ok" : ""}`}>
          {count}/{minLength} huruf
        </span>
      )}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}
