export default function CastList({ cast, limit }) {
  if (!cast || cast.length === 0) return <span>Cast: Not available</span>;

  const displayedCast = limit ? cast.slice(0, limit) : cast;

  return (
    <div className="cast-list">
      <strong>Main Cast: </strong>
      {displayedCast.map((item, index) => (
        <span key={item.person.id} className="cast-item">
          {item.person.name} ({item.character?.name || 'Unknown'}){index < displayedCast.length - 1 ? ', ' : ''}
        </span>
      ))}
    </div>
  );
}