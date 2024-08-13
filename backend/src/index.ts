import express from 'express';
import announcementRoutes from './routes/announcementRoutes';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/announcements', announcementRoutes);

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
