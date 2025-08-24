import React from 'react';
import CityItem from './CityItem';

function CityList({ cities, onDeleteCity, onEditCity }) {
  if (cities.length === 0) {
    return <p>Міст не знайдено</p>;
  }

  return (
    <div>
      <h3>Список міст ({cities.length})</h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px' 
      }}>
        {cities.map(city => (
          <CityItem
            key={city.id}
            city={city}
            onDelete={onDeleteCity}
            onEdit={onEditCity}
          />
        ))}
      </div>
    </div>
  );
}

export default CityList;
