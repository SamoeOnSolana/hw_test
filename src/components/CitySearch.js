import React from 'react';

function CitySearch({ searchTerm, onSearchChange, selectedRegion, onRegionChange, regions }) {
  return (
    <div style={{ 
      marginBottom: '20px', 
      padding: '15px', 
      border: '1px solid #ddd', 
      borderRadius: '5px',
      backgroundColor: '#f0f0f0'
    }}>
      <h4>Пошук та фільтрація:</h4>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label>Пошук за назвою або описом:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Введіть назву міста..."
            style={{ 
              padding: '8px', 
              marginLeft: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '3px',
              minWidth: '200px'
            }}
          />
        </div>
        
        <div>
          <label>Фільтр за областю:</label>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            style={{ 
              padding: '8px', 
              marginLeft: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '3px'
            }}
          >
            <option value="">Всі області</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        
        {(searchTerm || selectedRegion) && (
          <button
            onClick={() => {
              onSearchChange('');
              onRegionChange('');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Очистити фільтри
          </button>
        )}
      </div>
      
      {(searchTerm || selectedRegion) && (
        <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#666' }}>
          Активні фільтри: 
          {searchTerm && <span style={{ marginLeft: '5px' }}>Пошук: "{searchTerm}"</span>}
          {selectedRegion && <span style={{ marginLeft: '5px' }}>Область: {selectedRegion}</span>}
        </p>
      )}
    </div>
  );
}

export default CitySearch;
