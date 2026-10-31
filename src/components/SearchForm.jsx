// src/components/SearchForm.jsx
export default function SearchForm({ query, setQuery, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}