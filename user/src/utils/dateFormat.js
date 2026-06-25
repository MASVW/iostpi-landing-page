const TIME_ZONE = 'Asia/Jakarta'

export function formatDateShort(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: TIME_ZONE,
  }).format(new Date(value))
}

export function formatDateTimeWib(value) {
  if (!value) return ''

  const date = new Date(value)
  const day = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: TIME_ZONE,
  }).format(date)
  const time = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: TIME_ZONE,
  }).format(date).replace('.', ':')

  return `${day} pukul ${time} WIB`
}
