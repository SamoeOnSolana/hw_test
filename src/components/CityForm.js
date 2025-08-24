import React, { useState } from 'react';

function CityForm({ onAddCity, regions }) {
  const [formData, setFormData] = useState({
    name: '',
    population: '',
    region: '',
    founded: '',
    description: '',
    attractions: '',
    coordinates: { lat: '', lng: '' }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.population && formData.region && formData.description) {
      const attractions = formData.attractions.split(',').map(attr => attr.trim()).filter(attr => attr);
      onAddCity({
        ...formData,
        population: parseInt(formData.population),
        founded: parseInt(formData.founded) || 0,
        attractions: attractions,
        coordinates: {
          lat: parseFloat(formData.coordinates.lat) || 0,
          lng: parseFloat(formData.coordinates.lng) || 0
        }
      });
      setFormData({
        name: '',
        population: '',
        region: '',
        founded: '',
        description: '',
        attractions: '',
        coordinates: { lat: '', lng: '' }
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'lat' || e.target.name === 'lng') {
      setFormData({
        ...formData,
        coordinates: {
          ...formData.coordinates,
          [e.target.name]: e.target.value
        }
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      marginBottom: '20px', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Додати місто</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
        <div>
          <label>Назва міста:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        
        <div>
          <label>Населення:</label>
          <input
            type="number"
            name="population"
            value={formData.population}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            min="0"
            required
          />
        </div>
        
        <div>
          <label>Область:</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          >
            <option value="">Виберіть область</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
            <option value="Нова область">Нова область</option>
          </select>
        </div>
        
        <div>
          <label>Рік заснування:</label>
          <input
            type="number"
            name="founded"
            value={formData.founded}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            min="0"
            max="2024"
          />
        </div>
        
        <div style={{ gridColumn: 'span 2' }}>
          <label>Опис:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', height: '80px' }}
            required
          />
        </div>
        
        <div style={{ gridColumn: 'span 2' }}>
          <label>Визначні місця (через кому):</label>
          <input
            type="text"
            name="attractions"
            value={formData.attractions}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="Площа, собор, музей"
          />
        </div>
        
        <div>
          <label>Широта:</label>
          <input
            type="number"
            name="lat"
            value={formData.coordinates.lat}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            step="0.0001"
            placeholder="50.4501"
          />
        </div>
        
        <div>
          <label>Довгота:</label>
          <input
            type="number"
            name="lng"
            value={formData.coordinates.lng}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            step="0.0001"
            placeholder="30.5234"
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
        Додати місто
      </button>
    </form>
  );
}

export default CityForm;
