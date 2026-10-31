// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import ShowDetail from './pages/ShowDetail';
import './index.css';

const DEFAULT_QUERY = 'friends';

export default function App() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchShows(searchQuery) {
      setStatus('loading');
      setErrorMessage('');
      try {
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchQuery)}`);
        
        if (res.status === 429) {
          throw new Error('Rate limit exceeded (HTTP 429). Please wait and try again.');
        }
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        const data = await res.json();
        
        if (data.length === 0) {
          setStatus('empty');
          setShows([]);
        } else {
          setShows(data.slice(0, 10)); // Max 10 shows
          setStatus('success');
        }
      } catch (err) {
        setStatus('error');
        setErrorMessage(err.message);
      }
    }

    fetchShows(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchTerm(query);
  };

  return (
    <div className="app-container">
      <header>
        <h1><Link to="/">TV Show Gallery</Link></h1>
        <p className="attribution">
          Powered by <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">TVmaze</a> (CC BY-SA)
        </p>
      </header>

      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <GalleryPage 
                query={query}
                setQuery={setQuery}
                onSubmit={handleSearchSubmit}
                shows={shows}
                status={status}
                errorMessage={errorMessage}
                searchTerm={searchTerm}
              />
            } 
          />
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </main>
    </div>
  );
}