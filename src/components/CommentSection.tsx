import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addComment } from '../store/commentsSlice';

interface Props {
  postId: number;
}

const CommentSection = ({ postId }: Props) => {
  const dispatch = useAppDispatch();
  const [body, setBody] = useState('');
  const allComments = useAppSelector((state) => state.comments.comments);
  const postComments = allComments.filter((c) => c.postId === postId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    await dispatch(addComment({ postId, body, name: 'User', email: 'user@example.com' }));
    setBody('');
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h4>Комментарии</h4>
      {postComments.map((c) => (
        <div key={c.id} style={{ border: '1px solid #ccc', margin: 5, padding: 5 }}>
          <strong>{c.name}:</strong> {c.body}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Ваш комментарий"
          rows={2}
          style={{ width: '100%' }}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default CommentSection;