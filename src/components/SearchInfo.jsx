import React from 'react';

export default function SearchInfo({ count, searchTerm, status }) {
  if (status !== 'success') return null;
  return (
    <div className="search-info" style={{ margin: '15px 0', fontStyle: 'italic' }}>
      <p>Showing {count} results for "<strong>{searchTerm}</strong>"</p>
    </div>
  );
}