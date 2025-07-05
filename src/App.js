// src/App.js
import React, { useState } from 'react';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!longUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      // Use public API to shorten the URL
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(longUrl)}`);
      const data = await response.json();

      if (data.ok) {
        setShortUrl(data.result.full_short_link);
      } else {
        setError('Failed to shorten URL. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error occurred while shortening.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔗 URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter a long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={styles.input}
      />
      <br />
      <button onClick={handleShorten} style={styles.button} disabled={loading}>
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {shortUrl && (
        <div style={styles.result}>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  input: {
    width: '60%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '1rem',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '20px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default App;
