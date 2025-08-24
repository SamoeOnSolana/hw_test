import React, { useState } from 'react';

function MovieItem({ movie, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: movie.title,
    time: movie.time,
    hall: movie.hall,
    price: movie.price,
    genre: movie.genre,
    duration: movie.duration
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(movie.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: movie.title,
      time: movie.time,
      hall: movie.hall,
      price: movie.price,
      genre: movie.genre,
      duration: movie.duration
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.name === 'price' ? parseInt(e.target.value) : e.target.value
    });
  };

  if (isEditing) {
    return (
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '15px', 
        borderRadius: '5px',
        backgroundColor: '#fff3cd'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          <div>
            <label>Назва:</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Час:</label>
            <input
              type="time"
              name="time"
              value={editData.time}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Зал:</label>
            <input
              type="text"
              name="hall"
              value={editData.hall}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Ціна:</label>
            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
              min="0"
            />
          </div>
          
          <div>
            <label>Жанр:</label>
            <select
              name="genre"
              value={editData.genre}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            >
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
              value={editData.duration}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        </div>
        
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          <button onClick={handleSave} style={{ 
            padding: '8px 16px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            cursor: 'pointer'
          }}>
            Зберегти
          </button>
          <button onClick={handleCancel} style={{ 
            padding: '8px 16px', 
            backgroundColor: '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            cursor: 'pointer'
          }}>
            Скасувати
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '15px', 
      borderRadius: '5px',
      backgroundColor: '#f8f9fa'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{movie.title}</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginBottom: '15px' }}>
        <div>
          <strong>Час:</strong> {movie.time}
        </div>
        <div>
          <strong>Зал:</strong> {movie.hall}
        </div>
        <div>
          <strong>Ціна:</strong> {movie.price} грн
        </div>
        <div>
          <strong>Жанр:</strong> {movie.genre}
        </div>
        <div>
          <strong>Тривалість:</strong> {movie.duration}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleEdit} style={{ 
          padding: '8px 16px', 
          backgroundColor: '#ffc107', 
          color: 'black', 
          border: 'none', 
          borderRadius: '3px',
          cursor: 'pointer'
        }}>
          Редагувати
        </button>
        <button onClick={() => onDelete(movie.id)} style={{ 
          padding: '8px 16px', 
          backgroundColor: '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '3px',
          cursor: 'pointer'
        }}>
          Видалити
        </button>
      </div>
    </div>
  );
}

export default MovieItem;
