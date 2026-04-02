import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts } from '../../store/postsSlice';
import CommentSection from '../../components/CommentSection';
import { fetchComments } from '../../store/commentsSlice';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div>
      <h1>Посты</h1>
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