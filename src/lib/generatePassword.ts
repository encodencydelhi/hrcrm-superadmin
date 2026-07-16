export function generateTempPassword() {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnpqrstuvwxyz';
  const digits = '23456789';
  const pick = (set: string) => set[Math.floor(Math.random() * set.length)];
  const body = Array.from({ length: 9 }, () => pick(lower)).join('');
  return `${pick(upper)}${body}${pick(digits)}${pick(digits)}`;
}
