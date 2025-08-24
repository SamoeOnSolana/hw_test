import React, { useState } from 'react';

function BlogPostForm({ onAddPost }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.content && formData.author) {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      onAddPost({
        ...formData,
        tags: tags
      });
      setFormData({
        title: '',
        content: '',
        author: '',
        tags: ''
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
      <h3>Додати новий пост</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        <div>
          <label>Заголовок поста:</label>
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
          <label>Автор:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        
        <div>
          <label>Теги (через кому):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="React, JavaScript, Програмування"
          />
        </div>
        
        <div style={{ gridColumn: 'span 2' }}>
          <label>Зміст поста:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', height: '120px' }}
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
        Опублікувати пост
      </button>
    </form>
  );
}

export default BlogPostForm;
