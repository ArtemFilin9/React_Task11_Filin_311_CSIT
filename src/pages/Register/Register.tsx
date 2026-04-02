import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { registerUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      await dispatch(registerUser({ email, password, name })).unwrap();
      navigate('/dashboard');
    } catch (err) {}
  };

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
}

export default Register