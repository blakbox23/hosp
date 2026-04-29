/**
 * Menu and checkout amounts are stored as whole Kenyan Shillings (KES).
 */
export function formatKes(amount: number): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rounded);
}
