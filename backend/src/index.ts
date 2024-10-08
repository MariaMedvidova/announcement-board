import express from 'express';
import announcementRoutes from './routes/announcementRoutes';
import categoryRoutes from './routes/categoryRoutes';
import db from './config/db';
import { PORT } from './config/config';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/announcements', announcementRoutes);
app.use('/categories', categoryRoutes);

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});






