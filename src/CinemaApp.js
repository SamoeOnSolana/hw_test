import React, { useState } from 'react';
import CinemaSchedule from './components/CinemaSchedule';
import MovieForm from './components/MovieForm';
import MovieFilter from './components/MovieFilter';

function CinemaApp() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Аватар 2',
      time: '14:00',
      hall: 'Зал 1',
      price: 150,
      genre: 'фантастика',
      duration: '192 хв'
    },
    {
      id: 2,
      title: 'Топ Ган: Меврік',
      time: '16:30',
      hall: 'Зал 2',
      price: 120,
      genre: 'бойовик',
      duration: '130 хв'
    },
    {
      id: 3,
      title: 'Мініони 3',
      time: '18:00',
      hall: 'Зал 3',
      price: 100,
      genre: 'мультфільм',
      duration: '87 хв'
    }
  ]);
  
  const [filteredGenre, setFilteredGenre] = useState('');

  const addMovie = (movie) => {
    setMovies([...movies, { ...movie, id: Date.now() }]);
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const editMovie = (id, updatedMovie) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, ...updatedMovie } : movie
    ));
  };

  const filterByGenre = (genre) => {
    setFilteredGenre(genre);
  };

  const getFilteredMovies = () => {
    if (!filteredGenre) return movies;
    return movies.filter(movie => movie.genre === filteredGenre);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1>Розклад Кінотеатру</h1>
      
      <MovieForm onAddMovie={addMovie} />
      
      <MovieFilter 
        movies={movies}
        selectedGenre={filteredGenre}
        onFilterChange={filterByGenre}
      />
      
      <CinemaSchedule 
        movies={getFilteredMovies()}
        onDeleteMovie={deleteMovie}
        onEditMovie={editMovie}
      />
    </div>
  );
}

export default CinemaApp;
