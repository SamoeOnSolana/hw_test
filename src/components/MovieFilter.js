import React from 'react';

function MovieFilter({ movies, selectedGenre, onFilterChange }) {
  const genres = [...new Set(movies.map(movie => movie.genre))];

  return (
    <div style={{ 
      marginBottom: '20px', 
      padding: '15px', 
      border: '1px solid #ddd', 
      borderRadius: '5px',
      backgroundColor: '#f0f0f0'
    }}>
      <h4>Фільтр за жанром:</h4>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <button
          onClick={() => onFilterChange('')}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedGenre === '' ? '#007bff' : '#e9ecef',
            color: selectedGenre === '' ? 'white' : 'black',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          Всі фільми
        </button>
        
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => onFilterChange(genre)}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedGenre === genre ? '#007bff' : '#e9ecef',
              color: selectedGenre === genre ? 'white' : 'black',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            {genre}
          </button>
        ))}
      </div>
      
      {selectedGenre && (
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          Показано фільми жанру: <strong>{selectedGenre}</strong>
        </p>
      )}
    </div>
  );
}

export default MovieFilter;
