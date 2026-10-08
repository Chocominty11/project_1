export const MIN_MESSAGE = 10;

export function validateForm({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Tulis namamu dulu ya";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Format email belum benar";
  if (message.trim().length < MIN_MESSAGE) errors.message = `Pesan minimal ${MIN_MESSAGE} huruf`;
  return errors;
}
