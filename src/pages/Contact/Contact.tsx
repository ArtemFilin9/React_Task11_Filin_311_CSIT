import { useState } from 'react';
import { postData } from '../../services/api';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postData('/contact', { name, email, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      // ошибки обрбатывается в интерсепторе, оставляю этот раздел для удобства
    }
  };

  return (
    <div>
      <h1>Связаться со мной</h1>
      {success && <p style={{ color: 'green' }}>Сообщение отправлено!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <textarea placeholder="Сообщение" value={message} onChange={e => setMessage(e.target.value)} required />
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};
export default Contact;