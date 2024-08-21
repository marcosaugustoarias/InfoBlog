import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PostDetails.css'; 

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyapi.online/api/blogposts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del post');
        }
        return response.json();
      })
      .then(data => setPost(data))
      .catch(error => setError(error.message));
  }, [id]);

  const handleBackToPosts = () => {
    navigate('/');
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!post) {
    return <div className="loading-message">Loading ...</div>;
  }

  return (
    <div className="post-details-container">
      <button className="back-button" onClick={handleBackToPosts}>
        &larr; Return to list
      </button>
      <div className="post-content">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-body">
          {post.content}
        </div>
        <p className="post-date"><strong> Published in:</strong> {post.date_published}</p>
        <p className="post-author"><strong>Author:</strong> {post.author}</p>
      </div>
    </div>
  );
}

export default PostDetails;