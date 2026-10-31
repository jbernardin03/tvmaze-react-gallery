// src/components/ShowCard.jsx
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
        // Fail silently or handle gracefully so it doesn't break the card
        console.error("Failed to load cast", err);
      } finally {
        if (isMounted) setCastLoading(false);
      }
    }
    fetchCast();
    return () => { isMounted = false; };
  }, [show.id]);

  return (
    <div className="show-card">
      {show.image?.medium ? (
        <img src={show.image.medium} alt={`Poster for ${show.name}`} className="show-poster" />
      ) : (
        <div className="no-image">No Image Available</div>
      )}

      <div className="show-info">
        <h2>
          <Link to={`/shows/${show.id}`}>{show.name}</Link>
        </h2>
        <p className="summary">{stripHtml(show.summary)}</p>
        <p><strong>Premiered:</strong> {formatDate(show.premiered)}</p>
        <p><strong>Last Updated:</strong> {formatDateTime(show.updated)}</p>
        <p><strong>Genres:</strong> {show.genres?.length ? show.genres.join(', ') : 'Not available'}</p>
        <p><strong>Rating:</strong> {fallback(show.rating?.average)}</p>
        
        {castLoading ? (
          <p>Loading cast...</p>
        ) : (
          <CastList cast={cast} limit={5} />
        )}

        <p>
          <a href={show.url} target="_blank" rel="noreferrer">View on TVmaze</a>
        </p>
      </div>
    </div>
  );
}