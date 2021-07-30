import { app } from './app';
import config from 'config';

const PORT = config.get('app.port');

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
