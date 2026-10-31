// src/components/CastList.jsx
export default function CastList({ cast, limit }) {
  if (!cast || cast.length === 0) return <p>Cast: Not available</p>;

  // Optional limit parameter (e.g., top 3-5 for cards, full 15 for detail page)
  const displayedCast = limit ? cast.slice(0, limit) : cast;

  return (
    <div className="cast-list">
      <strong>Main Cast: </strong>
      {displayedCast.map((item) => (
        <span key={item.person.id} className="cast-item">
          {item.person.name} ({item.character?.name || 'Unknown'}){item !== displayedCast[displayedCast.length - 1] ? ', ' : ''}
        </span>
      ))}
    </div>
  );
}