import React from 'react';
import BlogPostItem from './BlogPostItem';

function BlogPostList({ posts, onDeletePost, onEditPost, onAddComment, onToggleLike }) {
  if (posts.length === 0) {
    return <p>Постів не знайдено</p>;
  }

  return (
    <div>
      <h3>Пости блогу ({posts.length})</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map(post => (
          <BlogPostItem
            key={post.id}
            post={post}
            onDelete={onDeletePost}
            onEdit={onEditPost}
            onAddComment={onAddComment}
            onToggleLike={onToggleLike}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogPostList;
