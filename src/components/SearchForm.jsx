import React from 'react';

export default function SearchForm({ query, setQuery, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="search-form" style={{ margin: '20px 0' }}>
      <input
        type="text"
        placeholder="Search TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        style={{ padding: '8px', fontSize: '16px', width: '250px', marginRight: '8px' }}
      />
      <button type="submit" className="search-button" style={{ padding: '8px 16px', fontSize: '16px' }}>Search</button>
    </form>
  );
}