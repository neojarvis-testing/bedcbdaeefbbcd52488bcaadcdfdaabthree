import express from 'express';
import bodyParser from 'body-parser';
import { setUserRoutes } from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

setUserRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});