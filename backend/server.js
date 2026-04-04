const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

const JWT_SECRET = 'secret-key';

app.use(cors());
app.use(express.json());

let users = [
    { id: 1, email: 'test@example.com', password: '123', name: 'Test User' }
];
let posts = [
  { id: 1, userId: 1, title: 'Первый пост', body: 'Тело первого поста' },
  { id: 2, userId: 1, title: 'Второй пост', body: 'Тело второго поста' },
];
let comments = [
  { id: 1, postId: 1, name: 'Комментатор', email: 'test@test.com', body: 'Отличный пост!' },
];
let albums = [
  { id: 1, userId: 1, title: 'Мой альбом' },
];

let messages = [];
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }
  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    createdAt: new Date(),
  };
  messages.push(newMessage);
  res.status(201).json({ success: true, message: 'Сообщение получено' });
});

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Нет токена' });
  
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Неверный токен' });
    req.userId = decoded.userId;
    next();
  });
}

app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны' });
  }
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Пользователь уже существует' });
  }
  const hashedPassword = password;
  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    name: name || '',
  };
  users.push(newUser);
  const token = generateToken(newUser.id);
  res.status(201).json({
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
    token,
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Неверные учётные данные' });
  }
  const validPassword = (password === user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Неверные учётные данные' });
  }
  const token = generateToken(user.id);
  res.json({
    user: { id: user.id, email: user.email, name: user.name },
    token,
  });
});

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts);
});

app.get('/posts/:id', authenticateToken, (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Пост не найден' });
  res.json(post);
});

app.post('/posts', authenticateToken, (req, res) => {
  const { title, body } = req.body;
  const newPost = {
    id: posts.length + 1,
    userId: req.userId,
    title,
    body,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Пост не найден' });
  if (posts[index].userId !== req.userId) {
    return res.status(403).json({ error: 'Нет прав на редактирование' });
  }
  const { title, body } = req.body;
  posts[index] = { ...posts[index], title, body };
  res.json(posts[index]);
});

app.patch('/posts/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Пост не найден' });
  if (posts[index].userId !== req.userId) {
    return res.status(403).json({ error: 'Нет прав на редактирование' });
  }
  const { title, body } = req.body;
  if (title !== undefined) posts[index].title = title;
  if (body !== undefined) posts[index].body = body;
  res.json(posts[index]);
});

app.delete('/posts/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Пост не найден' });
  if (posts[index].userId !== req.userId) {
    return res.status(403).json({ error: 'Нет прав на удаление' });
  }
  posts.splice(index, 1);
  res.status(204).send();
});

app.get('/comments', authenticateToken, (req, res) => {
  res.json(comments);
});
app.post('/comments', authenticateToken, (req, res) => {
  const { postId, name, email, body } = req.body;
  if (!postId || !body) {
    return res.status(400).json({ error: 'postId и body обязательны' });
  }
  const newComment = {
    id: comments.length + 1,
    postId,
    name: name || 'Anonymous',
    email: email || 'anonymous@example.com',
    body,
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.get('/albums', authenticateToken, (req, res) => {
  res.json(albums);
});

app.listen(PORT, () => {
  console.log(`Бэкенд запущен на http://localhost:${PORT}`);
});