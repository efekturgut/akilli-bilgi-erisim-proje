import { afterEach, describe, expect, it, vi } from 'vitest'
import { getJson } from './apiClient.js'

afterEach(() => vi.unstubAllGlobals())

describe('getJson', () => {
  it('reads the JSON response from the shared API route', async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ status: 'ok' }))
    vi.stubGlobal('fetch', fetch)
    const { signal } = new AbortController()

    await expect(getJson('/health', { signal })).resolves.toEqual({ status: 'ok' })
    expect(fetch).toHaveBeenCalledWith('/api/health', {
      headers: { Accept: 'application/json' },
      signal,
    })
  })

  it('reports a failed HTTP status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 503 })))

    await expect(getJson('/health')).rejects.toThrow('HTTP 503')
  })
})
