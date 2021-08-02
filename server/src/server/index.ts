import { dbConnection } from '../database';
import { app } from './app';

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await dbConnection();
});
