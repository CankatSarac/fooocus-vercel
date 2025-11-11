'use client';

import { useState, useEffect } from 'react';
import styles from './FooocusFrame.module.css';

const COLAB_NOTEBOOK_URL = 'https://colab.research.google.com/github/lllyasviel/Fooocus/blob/main/fooocus_colab.ipynb';

export default function FooocusFrame() {
  const [fooocusUrl, setFooocusUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Load URL from env variable or localStorage on mount
  useEffect(() => {
    const envUrl = process.env.NEXT_PUBLIC_FOOOCUS_URL;

    // Priority 1: Check if environment variable is set (for HF Spaces, etc.)
    if (envUrl && envUrl !== 'https://your-fooocus-server.com') {
      setInputUrl(envUrl);
      setFooocusUrl(envUrl);
      setIsConnected(true);
      return;
    }

    // Priority 2: Load from localStorage (manually entered URL)
    const savedUrl = localStorage.getItem('fooocus_url');
    if (savedUrl) {
      setInputUrl(savedUrl);
      setFooocusUrl(savedUrl);
      setIsConnected(true);
    }
  }, []);

  const handleConnect = () => {
    setError('');

    if (!inputUrl.trim()) {
      setError('Please enter a Gradio URL');
      return;
    }

    // Validate URL
    try {
      const url = new URL(inputUrl);
      if (!url.protocol.startsWith('http')) {
        setError('URL must start with http:// or https://');
        return;
      }

      // Save to localStorage and connect
      localStorage.setItem('fooocus_url', inputUrl);
      setFooocusUrl(inputUrl);
      setIsConnected(true);
      setIsLoading(true);
    } catch {
      setError('Please enter a valid URL (e.g., https://abc123.gradio.live)');
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsLoading(false);
    setFooocusUrl('');
    setInputUrl('');
    localStorage.removeItem('fooocus_url');
  };

  const openColab = () => {
    window.open(COLAB_NOTEBOOK_URL, '_blank');
  };

  if (!isConnected) {
    return (
      <div className={styles.connectContainer}>
        <div className={styles.connectBox}>
          <h2 className={styles.connectTitle}>Connect to Fooocus</h2>
          <p className={styles.connectDescription}>
            Start a Fooocus session and paste the Gradio link below.
          </p>

          {/* Colab Launch Button */}
          <div className={styles.colabSection}>
            <button onClick={openColab} className={styles.colabButton}>
              <svg className={styles.colabIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#F9AB00"/>
                <path d="M8.5 15C9.88071 15 11 13.8807 11 12.5C11 11.1193 9.88071 10 8.5 10C7.11929 10 6 11.1193 6 12.5C6 13.8807 7.11929 15 8.5 15Z" fill="white"/>
                <path d="M15.5 15C16.8807 15 18 13.8807 18 12.5C18 11.1193 16.8807 10 15.5 10C14.1193 10 13 11.1193 13 12.5C13 13.8807 14.1193 15 15.5 15Z" fill="white"/>
              </svg>
              Launch Fooocus in Google Colab
            </button>
            <p className={styles.colabHint}>
              Free GPU • No installation required • Copy the Gradio link after running
            </p>
          </div>

          {/* URL Input */}
          <div className={styles.inputGroup}>
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://abc123.gradio.live"
              className={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && handleConnect()}
            />
            <button onClick={handleConnect} className={styles.connectButton}>
              Connect
            </button>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          {/* Instructions */}
          <div className={styles.instructions}>
            <h3>How to get started:</h3>
            <ol>
              <li>Click the <strong>"Launch Fooocus in Google Colab"</strong> button above</li>
              <li>In Colab, click <strong>Runtime → Run all</strong> (or press Ctrl+F9)</li>
              <li>Wait 2-3 minutes for Fooocus to start</li>
              <li>Look for a link like <code>https://abc123.gradio.live</code> in the output</li>
              <li>Copy that link and paste it above</li>
              <li>Click <strong>Connect</strong></li>
            </ol>
            <div className={styles.note}>
              <strong>Note:</strong> The Gradio link expires when you close Colab. For 24/7 access,
              use a dedicated GPU server (RunPod, Vast.ai, etc.) - see README.md for details.
            </div>
          </div>

          {/* Alternative Options */}
          <div className={styles.alternatives}>
            <h4>Other hosting options:</h4>
            <div className={styles.optionGrid}>
              <div className={styles.option}>
                <strong>RunPod</strong>
                <span>$0.30-0.80/hr</span>
                <small>24/7 GPU instances</small>
              </div>
              <div className={styles.option}>
                <strong>Vast.ai</strong>
                <span>$0.10-0.40/hr</span>
                <small>Cheapest GPU rentals</small>
              </div>
              <div className={styles.option}>
                <strong>Local PC</strong>
                <span>Electricity only</span>
                <small>With ngrok/cloudflare</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.frameContainer}>
      <div className={styles.frameHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.connectedIndicator}>
            <span className={styles.dot}></span>
            Connected to Fooocus
          </span>
          <span className={styles.urlDisplay}>{fooocusUrl}</span>
        </div>
        <button onClick={handleDisconnect} className={styles.disconnectButton}>
          Disconnect
        </button>
      </div>

      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Loading Fooocus...</p>
        </div>
      )}

      <iframe
        src={fooocusUrl}
        className={styles.frame}
        title="Fooocus"
        allow="accelerometer; camera; microphone; clipboard-write;"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError('Failed to load Fooocus. Please check the URL and try again.');
        }}
      />
    </div>
  );
}
