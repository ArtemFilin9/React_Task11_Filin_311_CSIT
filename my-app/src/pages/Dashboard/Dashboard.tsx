import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts, createPost } from '../../store/postsSlice';
import CommentSection from '../../components/CommentSection';
import { fetchComments } from '../../store/commentsSlice';


const Dashboard = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    await dispatch(createPost({ title, body }));
    setTitle('');
    setBody('');
  };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div>
      <h1>Посты</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <textarea
          placeholder="Текст поста"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={3}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <button type="submit">Опубликовать</button>
      </form>


      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <CommentSection postId={post.id} />
        </div>
      ))}
    </div>
  );
}

export default Dashboard