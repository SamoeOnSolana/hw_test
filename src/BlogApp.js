import React, { useState } from 'react';
import BlogPostList from './components/BlogPostList';
import BlogPostForm from './components/BlogPostForm';
import BlogPostSearch from './components/BlogPostSearch';

function BlogApp() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Як створити React додаток',
      content: 'React - це JavaScript бібліотека для створення користувацьких інтерфейсів. У цій статті ми розглянемо основи React та створимо простий додаток.',
      author: 'Іван Петренко',
      date: '2024-01-15',
      tags: ['React', 'JavaScript', 'Програмування'],
      likes: 42,
      comments: [
        { id: 1, author: 'Марія Коваленко', text: 'Дуже корисна стаття!', date: '2024-01-16' },
        { id: 2, author: 'Олександр Сидоренко', text: 'Дякую за пояснення', date: '2024-01-17' }
      ]
    },
    {
      id: 2,
      title: 'Основи CSS Grid',
      content: 'CSS Grid - це потужна система макетів, яка дозволяє створювати складні макети веб-сторінок. У цій статті ми вивчимо основні концепції та створимо кілька прикладів.',
      author: 'Анна Мельник',
      date: '2024-01-10',
      tags: ['CSS', 'Grid', 'Веб-дизайн'],
      likes: 38,
      comments: [
        { id: 1, author: 'Петро Іваненко', text: 'Тепер зрозуміло як використовувати Grid', date: '2024-01-11' }
      ]
    },
    {
      id: 3,
      title: 'JavaScript ES6+ можливості',
      content: 'ES6+ приніс багато нових можливостей для JavaScript. У цій статті ми розглянемо найкорисніші з них: arrow functions, destructuring, spread operator та інші.',
      author: 'Сергій Волков',
      date: '2024-01-05',
      tags: ['JavaScript', 'ES6', 'Сучасний JS'],
      likes: 55,
      comments: [
        { id: 1, author: 'Тетяна Шевченко', text: 'Відмінний огляд нових можливостей!', date: '2024-01-06' },
        { id: 2, author: 'Віктор Марченко', text: 'Дуже детально пояснено', date: '2024-01-07' },
        { id: 3, author: 'Людмила Ткаченко', text: 'Дякую за приклади', date: '2024-01-08' }
      ]
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('date');

  const addPost = (post) => {
    setPosts([{
      ...post,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: []
    }, ...posts]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const editPost = (id, updatedPost) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: [...post.comments, {
          ...comment,
          id: Date.now(),
          date: new Date().toISOString().split('T')[0]
        }]
      } : post
    ));
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const getFilteredPosts = () => {
    let filtered = posts;
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }
    
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'likes') {
        return b.likes - a.likes;
      } else if (sortBy === 'comments') {
        return b.comments.length - a.comments.length;
      }
      return 0;
    });
  };

  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Блог Програмування</h1>
      
      <BlogPostForm onAddPost={addPost} />
      
      <BlogPostSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        allTags={allTags}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <BlogPostList 
        posts={getFilteredPosts()}
        onDeletePost={deletePost}
        onEditPost={editPost}
        onAddComment={addComment}
        onToggleLike={toggleLike}
      />
    </div>
  );
}

export default BlogApp;
