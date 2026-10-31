import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CastList from '../components/CastList';
import { stripHtml, formatDate, fallback } from '../utils/helpers';

export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchShowDetails() {
      setStatus('loading');
      try {
        const [showRes, castRes] = await Promise.all([
          fetch(`https://api.tvmaze.com/shows/${id}`),
          fetch(`https://api.tvmaze.com/shows/${id}/cast`)
        ]);

        if (showRes.status === 429 || castRes.status === 429) {
          throw new Error('Rate limit exceeded (HTTP 429). Please try again later.');
        }
        if (!showRes.ok) {
          throw new Error('Show not found or invalid ID.');
        }

        const showData = await showRes.json();
        const castData = castRes.ok ? await castRes.json() : [];

        setShow(showData);
        setCast(castData);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setErrorMessage(err.message);
      }
    }

    fetchShowDetails();
  }, [id]);

  if (status === 'loading') return <p style={{ padding: '20px' }}>Loading show details...</p>;
  if (status === 'error') return <p style={{ padding: '20px', color: 'red' }}>{errorMessage} <br /><Link to="/">Back to Gallery</Link></p>;
  if (!show) return null;

  return (
    <div className="show-detail-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" className="back-link">&larr; Back to Gallery</Link>
      
      <h1>{show.name}</h1>
      {show.image?.original && (
        <img src={show.image.original} alt={`Poster for ${show.name}`} className="detail-poster" style={{ maxWidth: '300px', borderRadius: '8px' }} />
      )}

      <p><strong>Status:</strong> {fallback(show.status)}</p>
      <p><strong>Network / Channel:</strong> {fallback(show.network?.name || show.webChannel?.name)}</p>
      <p><strong>Premiered:</strong> {formatDate(show.premiered)}</p>
      <p><strong>Genres:</strong> {show.genres?.join(', ') || 'Not available'}</p>
      <p><strong>Rating:</strong> {fallback(show.rating?.average)}</p>
      
      <div className="detail-summary" style={{ margin: '20px 0' }}>
        <h3>Summary</h3>
        <div>{stripHtml(show.summary)}</div>
      </div>

      <div className="detail-cast" style={{ margin: '20px 0' }}>
        <h3>Full Cast (Up to 15)</h3>
        <CastList cast={cast} limit={15} />
      </div>

      <p style={{ marginTop: '20px' }}>
        <a href={show.url} target="_blank" rel="noreferrer">View official page on TVmaze</a>
      </p>
    </div>
  );
}