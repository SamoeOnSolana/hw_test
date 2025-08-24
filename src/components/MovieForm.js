import React, { useState } from 'react';

function MovieForm({ onAddMovie }) {
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    hall: '',
    price: '',
    genre: '',
    duration: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.time && formData.hall && formData.price && formData.genre && formData.duration) {
      onAddMovie({
        ...formData,
        price: parseInt(formData.price)
      });
      setFormData({
        title: '',
        time: '',
        hall: '',
        price: '',
        genre: '',
        duration: ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      marginBottom: '20px', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Додати фільм</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div>
          <label>Назва фільму:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        
        <div>
          <label>Час:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        
        <div>
          <label>Зал:</label>
          <input
            type="text"
            name="hall"
            value={formData.hall}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        
        <div>
          <label>Ціна (грн):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            min="0"
            required
          />
        </div>
        
        <div>
          <label>Жанр:</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          >
            <option value="">Виберіть жанр</option>
            <option value="фантастика">Фантастика</option>
            <option value="бойовик">Бойовик</option>
            <option value="драма">Драма</option>
            <option value="комедія">Комедія</option>
            <option value="мультфільм">Мультфільм</option>
            <option value="трилер">Трилер</option>
          </select>
        </div>
        
        <div>
          <label>Тривалість:</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="120 хв"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
      </div>
      
      <button type="submit" style={{ 
        marginTop: '15px',
        padding: '10px 20px', 
        backgroundColor: '#007bff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '3px',
        cursor: 'pointer'
      }}>
        Додати фільм
      </button>
    </form>
  );
}

export default MovieForm;
