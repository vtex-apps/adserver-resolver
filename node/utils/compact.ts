const compact = <T>(object: Record<string, T>) => {
  const result: Record<string, T> = {}

  for (const key in object) {
    if (object[key] !== undefined || object[key] !== null) {
      result[key] = object[key]
    }
  }

  return result
}

export default compact
