import express from 'express';
import routes from './routes.js';
const app = express()
const PORT = 3000
const HOST = "localhost"

app.use('/', routes)



app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})