export const database = {
  name: process.env.DATABASE_NAME || 'tracker3000',
  host: process.env.DATABASE_URL || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
};
