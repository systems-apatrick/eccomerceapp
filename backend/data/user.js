import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'User Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'Patricio Fajardo',
    email: 'patricio@example.com',
    password: bcrypt.hashSync('12345', 10),
  },
  {
    name: 'Mauricio Fajardo',
    email: 'mauricio@example.com',
    password: bcrypt.hashSync('12345', 10),
  },
  {
    name: 'Sebastian Fajardo',
    email: 'sebastian@example.com',
    password: bcrypt.hashSync('12345', 10),
  },
]

export default users
