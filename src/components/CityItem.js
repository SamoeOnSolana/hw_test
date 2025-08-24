import React, { useState } from 'react';

function CityItem({ city, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: city.name,
    population: city.population,
    region: city.region,
    founded: city.founded,
    description: city.description,
    attractions: city.attractions.join(', '),
    coordinates: { lat: city.coordinates.lat, lng: city.coordinates.lng }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const attractions = editData.attractions.split(',').map(attr => attr.trim()).filter(attr => attr);
    onEdit(city.id, {
      ...editData,
      population: parseInt(editData.population),
      founded: parseInt(editData.founded) || 0,
      attractions: attractions,
      coordinates: {
        lat: parseFloat(editData.coordinates.lat) || 0,
        lng: parseFloat(editData.coordinates.lng) || 0
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: city.name,
      population: city.population,
      region: city.region,
      founded: city.founded,
      description: city.description,
      attractions: city.attractions.join(', '),
      coordinates: { lat: city.coordinates.lat, lng: city.coordinates.lng }
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    if (e.target.name === 'lat' || e.target.name === 'lng') {
      setEditData({
        ...editData,
        coordinates: {
          ...editData.coordinates,
          [e.target.name]: e.target.value
        }
      });
    } else {
      setEditData({
        ...editData,
        [e.target.name]: e.target.value
      });
    }
  };

  if (isEditing) {
    return (
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '15px', 
        borderRadius: '5px',
        backgroundColor: '#fff3cd'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <div>
            <label>Назва:</label>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Населення:</label>
            <input
              type="number"
              name="population"
              value={editData.population}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
              min="0"
            />
          </div>
          
          <div>
            <label>Область:</label>
            <input
              type="text"
              name="region"
              value={editData.region}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Рік заснування:</label>
            <input
              type="number"
              name="founded"
              value={editData.founded}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
              min="0"
            />
          </div>
          
          <div style={{ gridColumn: 'span 2' }}>
            <label>Опис:</label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px', height: '60px' }}
            />
          </div>
          
          <div style={{ gridColumn: 'span 2' }}>
            <label>Визначні місця:</label>
            <input
              type="text"
              name="attractions"
              value={editData.attractions}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          
          <div>
            <label>Широта:</label>
            <input
              type="number"
              name="lat"
              value={editData.coordinates.lat}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
              step="0.0001"
            />
          </div>
          
          <div>
            <label>Довгота:</label>
            <input
              type="number"
              name="lng"
              value={editData.coordinates.lng}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
              step="0.0001"
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
      <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{city.name}</h4>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Опис:</strong> {city.description}</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: '15px' }}>
        <div>
          <strong>Населення:</strong> {city.population.toLocaleString()}
        </div>
        <div>
          <strong>Область:</strong> {city.region}
        </div>
        <div>
          <strong>Засновано:</strong> {city.founded > 0 ? city.founded : 'Невідомо'}
        </div>
        <div>
          <strong>Координати:</strong> {city.coordinates.lat}, {city.coordinates.lng}
        </div>
      </div>
      
      {city.attractions.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <strong>Визначні місця:</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
            {city.attractions.map((attraction, index) => (
              <span key={index} style={{ 
                backgroundColor: '#e9ecef', 
                padding: '3px 8px', 
                borderRadius: '12px', 
                fontSize: '12px' 
              }}>
                {attraction}
              </span>
            ))}
          </div>
        </div>
      )}
      
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
        <button onClick={() => onDelete(city.id)} style={{ 
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

export default CityItem;
