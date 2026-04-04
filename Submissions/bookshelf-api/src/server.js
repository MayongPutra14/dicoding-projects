import express from 'express';
import router from './route.js';

const app = express();
const PORT = 9000;
const HOST = 'localhost';

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server in running on http://${HOST}:${PORT}`);
});
