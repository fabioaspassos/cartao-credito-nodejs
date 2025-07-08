import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { cartaoRoutes } from './routes/cartaoRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', cartaoRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

export { app };