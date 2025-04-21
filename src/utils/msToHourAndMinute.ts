export function msToHourAndMinute(milliseconds: number): string {
  const totalMinutes = Math.floor(milliseconds / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}h${minutes
    .toString()
    .padStart(2, '0')}m`
}
