import React from 'react';
import MovieItem from './MovieItem';

function CinemaSchedule({ movies, onDeleteMovie, onEditMovie }) {
  if (movies.length === 0) {
    return <p>Фільмів немає</p>;
  }

  return (
    <div>
      <h3>Розклад сеансів ({movies.length})</h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {movies.map(movie => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onDelete={onDeleteMovie}
            onEdit={onEditMovie}
          />
        ))}
      </div>
    </div>
  );
}

export default CinemaSchedule;
