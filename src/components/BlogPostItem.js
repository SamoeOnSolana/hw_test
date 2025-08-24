import React, { useState } from 'react';

function BlogPostItem({ post, onDelete, onEdit, onAddComment, onToggleLike }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [editData, setEditData] = useState({
    title: post.title,
    content: post.content,
    author: post.author,
    tags: post.tags.join(', ')
  });
  const [commentData, setCommentData] = useState({
    author: '',
    text: ''
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const tags = editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    onEdit(post.id, {
      ...editData,
      tags: tags
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: post.title,
      content: post.content,
      author: post.author,
      tags: post.tags.join(', ')
    });
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentData.author && commentData.text) {
      onAddComment(post.id, commentData);
      setCommentData({ author: '', text: '' });
      setIsAddingComment(false);
    }
  };

  const handleCommentChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value
    });
  };

  if (isEditing) {
    return (
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '5px',
        backgroundColor: '#fff3cd'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div>
            <label>Заголовок:</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <div>
            <label>Автор:</label>
            <input
              type="text"
              name="author"
              value={editData.author}
              onChange={handleEditChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <div>
            <label>Теги:</label>
            <input
              type="text"
              name="tags"
              value={editData.tags}
              onChange={handleEditChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <div style={{ gridColumn: 'span 2' }}>
            <label>Зміст:</label>
            <textarea
              name="content"
              value={editData.content}
              onChange={handleEditChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', height: '100px' }}
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
      padding: '20px', 
      borderRadius: '5px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <div>
          <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{post.title}</h3>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Автор: <strong>{post.author}</strong> | Дата: <strong>{post.date}</strong>
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => onToggleLike(post.id)} style={{ 
            padding: '5px 10px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px'
          }}>
            ❤️ {post.likes}
          </button>
          <button onClick={() => setIsAddingComment(!isAddingComment)} style={{ 
            padding: '5px 10px', 
            backgroundColor: '#17a2b8', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px'
          }}>
            💬 {post.comments.length}
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <p style={{ lineHeight: '1.6' }}>{post.content}</p>
      </div>
      
      {post.tags.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {post.tags.map((tag, index) => (
              <span key={index} style={{ 
                backgroundColor: '#e9ecef', 
                padding: '3px 8px', 
                borderRadius: '12px', 
                fontSize: '12px' 
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {isAddingComment && (
        <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
          <h5>Додати коментар:</h5>
          <form onSubmit={handleCommentSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                name="author"
                value={commentData.author}
                onChange={handleCommentChange}
                placeholder="Ваше ім'я"
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '3px' }}
                required
              />
              <button type="submit" style={{ 
                padding: '8px 16px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '3px',
                cursor: 'pointer'
              }}>
                Додати коментар
              </button>
            </div>
            <textarea
              name="text"
              value={commentData.text}
              onChange={handleCommentChange}
              placeholder="Текст коментаря..."
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '3px', height: '60px' }}
              required
            />
          </form>
        </div>
      )}
      
      {post.comments.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h5>Коментарі ({post.comments.length}):</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {post.comments.map(comment => (
              <div key={comment.id} style={{ 
                padding: '10px', 
                backgroundColor: '#ffffff', 
                border: '1px solid #dee2e6', 
                borderRadius: '3px' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong style={{ fontSize: '14px' }}>{comment.author}</strong>
                  <span style={{ fontSize: '12px', color: '#666' }}>{comment.date}</span>
                </div>
                <p style={{ margin: '0', fontSize: '14px' }}>{comment.text}</p>
              </div>
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
        <button onClick={() => onDelete(post.id)} style={{ 
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

export default BlogPostItem;
