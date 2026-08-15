import { useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

function App() {
  const [url, setUrl] = useState('')
  const [submittedUrl, setSubmittedUrl] = useState('')
  const [error, setError] = useState('')
  const qrWrapRef = useRef(null)

  const normalizeUrl = (value) => {
    const trimmed = value.trim()
    if (!trimmed) return ''
    if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`
    return trimmed
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const normalized = normalizeUrl(url)
    if (!normalized) {
      setError('Please enter a URL.')
      setSubmittedUrl('')
      return
    }
    setError('')
    setSubmittedUrl(normalized)
  }

  const handleDownload = () => {
    const canvas = qrWrapRef.current?.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="app">
      <main className="card">
        <h1>QR Code Generator</h1>
        <p className="subtitle">Paste a URL and get a QR code instantly.</p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            aria-label="URL"
          />
          <button type="submit">Generate</button>
        </form>

        {error && <p className="error">{error}</p>}

        {submittedUrl && (
          <div className="result">
            <div ref={qrWrapRef} className="qr-wrapper">
              <QRCodeCanvas value={submittedUrl} size={240} level="M" includeMargin />
            </div>
            <p className="result-url">{submittedUrl}</p>
            <button type="button" className="download" onClick={handleDownload}>
              Download PNG
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
