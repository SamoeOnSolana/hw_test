import React from 'react';

function BlogPostSearch({ searchTerm, onSearchChange, selectedTags, onTagsChange, allTags, sortBy, onSortChange }) {
  const handleTagToggle = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newSelectedTags);
  };

  const clearFilters = () => {
    onSearchChange('');
    onTagsChange([]);
  };

  return (
    <div style={{ 
      marginBottom: '20px', 
      padding: '15px', 
      border: '1px solid #ddd', 
      borderRadius: '5px',
      backgroundColor: '#f0f0f0'
    }}>
      <h4>Пошук та фільтрація:</h4>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '15px' }}>
        <div>
          <label>Пошук:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Пошук за заголовком, змістом або автором..."
            style={{ 
              padding: '8px', 
              marginLeft: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '3px',
              minWidth: '250px'
            }}
          />
        </div>
        
        <div>
          <label>Сортування:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{ 
              padding: '8px', 
              marginLeft: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '3px'
            }}
          >
            <option value="date">За датою</option>
            <option value="likes">За лайками</option>
            <option value="comments">За коментарями</option>
          </select>
        </div>
        
        {(searchTerm || selectedTags.length > 0) && (
          <button
            onClick={clearFilters}
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
      
      {allTags.length > 0 && (
        <div>
          <label>Фільтр за тегами:</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                style={{
                  padding: '5px 12px',
                  backgroundColor: selectedTags.includes(tag) ? '#007bff' : '#e9ecef',
                  color: selectedTags.includes(tag) ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {(searchTerm || selectedTags.length > 0) && (
        <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#666' }}>
          Активні фільтри: 
          {searchTerm && <span style={{ marginLeft: '5px' }}>Пошук: "{searchTerm}"</span>}
          {selectedTags.length > 0 && <span style={{ marginLeft: '5px' }}>Теги: {selectedTags.join(', ')}</span>}
        </p>
      )}
    </div>
  );
}

export default BlogPostSearch;
