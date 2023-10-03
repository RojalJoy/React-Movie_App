import React, { useState, useEffect, useCallback } from 'react';

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchMovieData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?t=${searchTerm}&apikey=48d5349d`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovieData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setLoading(false);
    }
  }, [searchTerm]); // Add searchTerm as a dependency

  useEffect(() => {
    if (searchTerm) {
      fetchMovieData();
    }
  }, [searchTerm, fetchMovieData]);

  return (
    <div>
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Enter a movie title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchMovieData}>Search</button>
      {loading && <p>Loading...</p>}
      {movieData.Title && (
        <div>
          <h2>{movieData.Title}</h2>
          <p>Year: {movieData.Year}</p>
          <p>Director: {movieData.Director}</p>
          <p>Plot: {movieData.Plot}</p>
          <img src={movieData.Poster} alt={`${movieData.Title} Poster`} />
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
