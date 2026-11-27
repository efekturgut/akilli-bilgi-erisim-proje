export async function getJson(path, { signal } = {}) {
  const response = await fetch(`/api${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`API isteği başarısız oldu (HTTP ${response.status}).`)
  }

  return response.json()
}
