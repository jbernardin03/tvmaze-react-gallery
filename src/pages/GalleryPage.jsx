import SearchForm from '../components/SearchForm';
import ShowList from '../components/ShowList';
import SearchInfo from '../components/SearchInfo';

export default function GalleryPage({ query, setQuery, onSubmit, shows, status, errorMessage, searchTerm }) {
  return (
    <div className="gallery-page">
      <SearchForm query={query} setQuery={setQuery} onSubmit={onSubmit} />
      <SearchInfo count={shows.length} searchTerm={searchTerm} status={status} />
      <ShowList shows={shows} status={status} errorMessage={errorMessage} />
    </div>
  );
}