// src/components/ShowList.jsx
import ShowCard from './ShowCard';

export default function ShowList({ shows, status, errorMessage }) {
  if (status === 'loading') {
    return <p className="status-message">Loading shows...</p>;
  }

  if (status === 'error') {
    return <p className="status-message error">Error: {errorMessage}</p>;
  }

  if (status === 'empty') {
    return <p className="status-message">No shows found matching your search.</p>;
  }

  return (
    <div className="show-grid">
      {shows.map(({ show }) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
}