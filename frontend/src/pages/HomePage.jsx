import { useEffect, useState } from 'react'
import { getJson } from '../services/apiClient.js'

const statusMessages = {
  loading: 'Bağlantı kontrol ediliyor…',
  connected: 'API bağlantısı kuruldu.',
  unavailable: 'API’ye ulaşılamadı.',
}

export default function HomePage() {
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const request = new AbortController()

    async function checkConnection() {
      try {
        const health = await getJson('/health', { signal: request.signal })
        if (!request.signal.aborted) {
          setStatus(health?.status === 'ok' ? 'connected' : 'unavailable')
        }
      } catch {
        if (!request.signal.aborted) {
          setStatus('unavailable')
        }
      }
    }

    checkConnection()
    return () => request.abort()
  }, [attempt])

  function retryConnection() {
    setStatus('loading')
    setAttempt((previous) => previous + 1)
  }

  return (
    <main className="home">
      <h1>Ürün Arama Motoru</h1>
      <section className="connection" aria-labelledby="connection-title">
        <h2 id="connection-title">API durumu</h2>
        <p className="connection-status" data-state={status} role="status">
          {statusMessages[status]}
        </p>
        <button type="button" onClick={retryConnection} disabled={status === 'loading'}>
          Bağlantıyı kontrol et
        </button>
      </section>
    </main>
  )
}
