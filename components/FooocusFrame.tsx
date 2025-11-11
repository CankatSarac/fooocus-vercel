'use client';

import { useState } from 'react';
import styles from './FooocusFrame.module.css';

export default function FooocusFrame() {
  const [fooocusUrl, setFooocusUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = () => {
    setError('');

    if (!fooocusUrl.trim()) {
      setError('Please enter a Fooocus URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(fooocusUrl);
      setIsConnected(true);
    } catch {
      setError('Please enter a valid URL (e.g., https://abc123.gradio.live)');
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setFooocusUrl('');
  };

  if (!isConnected) {
    return (
      <div className={styles.connectContainer}>
        <div className={styles.connectBox}>
          <h2 className={styles.connectTitle}>Connect to Fooocus</h2>
          <p className={styles.connectDescription}>
            Enter your Fooocus Gradio share URL to get started.
          </p>
          <div className={styles.inputGroup}>
            <input
              type="url"
              value={fooocusUrl}
              onChange={(e) => setFooocusUrl(e.target.value)}
              placeholder="https://your-link.gradio.live"
              className={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && handleConnect()}
            />
            <button onClick={handleConnect} className={styles.connectButton}>
              Connect
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.instructions}>
            <h3>How to get your Fooocus URL:</h3>
            <ol>
              <li>Run Fooocus with the <code>--share</code> flag</li>
              <li>Copy the Gradio share link (e.g., https://abc123.gradio.live)</li>
              <li>Paste it above and click Connect</li>
            </ol>
            <p className={styles.note}>
              <strong>Note:</strong> You need to keep Fooocus running (e.g., on Google Colab,
              RunPod, or your own server) for this to work. The Gradio link expires when you
              stop the Fooocus process.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.frameContainer}>
      <div className={styles.frameHeader}>
        <span className={styles.connectedIndicator}>
          <span className={styles.dot}></span>
          Connected to Fooocus
        </span>
        <button onClick={handleDisconnect} className={styles.disconnectButton}>
          Disconnect
        </button>
      </div>
      <iframe
        src={fooocusUrl}
        className={styles.frame}
        title="Fooocus"
        allow="accelerometer; camera; microphone; clipboard-write;"
      />
    </div>
  );
}
