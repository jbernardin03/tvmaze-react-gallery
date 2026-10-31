import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CastList from './CastList';
import { stripHtml, formatDate, formatDateTime, fallback } from '../utils/helpers';

export default function ShowCard({ show }) {
  const [cast, setCast] = useState([]);
  const [castLoading, setCastLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchCast() {
      try {
        const res = await fetch(`https://api.tvmaze.com/shows/${show.id}/cast`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setCast(data);
        }
      } catch (err) {
        console.error("Failed to load cast", err);
      } finally {
        if (isMounted) setCastLoading(false);
      }
    }
    fetchCast();
    return () => { isMounted = false; };
  }, [show.id]);

  return (
    <div className="show-card" style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', width: '240px', padding: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      {show.image?.medium ? (
        <img src={show.image.medium} alt={`Poster for ${show.name}`} className="show-poster" style={{ width: '100%', borderRadius: '4px' }} />
      ) : (
        <div className="no-image" style={{ height: '300px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>Not available</div>
      )}

      <div className="show-info" style={{ marginTop: '10px' }}>
        <h3 style={{ margin: '5px 0' }}>
          <Link to={`/shows/${show.id}`}>{show.name}</Link>
        </h3>
        <p className="summary" style={{ fontSize: '14px', color: '#444' }}>{stripHtml(show.summary)}</p>
        <p style={{ fontSize: '13px' }}><strong>Premiered:</strong> {formatDate(show.premiered)}</p>
        <p style={{ fontSize: '13px' }}><strong>Updated:</strong> {formatDateTime(show.updated)}</p>
        <p style={{ fontSize: '13px' }}><strong>Genres:</strong> {show.genres?.length ? show.genres.join(', ') : 'Not available'}</p>
        <p style={{ fontSize: '13px' }}><strong>Rating:</strong> {fallback(show.rating?.average)}</p>
        
        {castLoading ? (
          <p style={{ fontSize: '13px' }}>Loading cast...</p>
        ) : (
          <div style={{ fontSize: '13px' }}><CastList cast={cast} limit={3} /></div>
        )}

        <p style={{ marginTop: '10px', fontSize: '13px' }}>
          <a href={show.url} target="_blank" rel="noreferrer">View on TVmaze</a>
        </p>
      </div>
    </div>
  );
}