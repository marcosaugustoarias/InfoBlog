import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyapi.online/api/blogposts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos:', data);
        setPosts(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setError(error.message);
      });
  }, []);

  const handleReadMore = (id) => {
    if (id) {
      navigate(`/post/${id}`);
    } else {
      console.error('El ID del post no es válido');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="post-list">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {filteredPosts.map(post => (
        <div key={post.id} className="post-item">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-author">by {post.author}</p>
          <button
            className="read-more-button"
            onClick={() => handleReadMore(post.id)}
          > 
            Read more
          </button>
        </div>
      ))}
    </div>
  );
}

export default PostList;