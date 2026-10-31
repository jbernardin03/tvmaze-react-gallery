// src/components/SearchInfo.jsx
export default function SearchInfo({ count, searchTerm, status }) {
  if (status !== 'success') return null;
  return (
    <div className="search-info" style={{ margin: '15px 0' }}>
      <p>Found {count} results for "<strong>{searchTerm}</strong>"</p>
    </div>
  );
}