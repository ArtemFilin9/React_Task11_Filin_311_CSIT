import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // тестовый вход (без бэка)
    dispatch(
      login({
        user: { id: 1, name: 'Test User', email },
        token: 'test-token',
      })
    )

    navigate('/dashboard')
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Войти</button>
    </div>
  )
}

export default Login