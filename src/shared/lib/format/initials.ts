export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter((word) => /\p{L}/u.test(word))

  if (words.length === 0) return '#'

  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}
