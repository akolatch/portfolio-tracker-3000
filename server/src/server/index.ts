import { app } from './app';
import config from 'config';

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
