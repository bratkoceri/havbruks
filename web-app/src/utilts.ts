export function formatDate(date: string) {
  const parsed = new Date(date)

  return `${parsed.getFullYear()}-${parsed.getMonth()}-${parsed.getDay()}`
}