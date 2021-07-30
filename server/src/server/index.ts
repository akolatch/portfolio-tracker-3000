import { app } from './app';
import config from 'config';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
