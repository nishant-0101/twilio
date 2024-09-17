import 'reflect-metadata'; 
import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import jobRoutes from './routes/job.routes';
import conversationRoutes from './routes/conversation.routes';
import twilioRoutes from './routes/twilio.routes';
import { AppDataSource } from './config/typeorm.config';

dotenv.config();

process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_PORT = process.env.DB_PORT || '3306';
process.env.DB_USERNAME = process.env.DB_USERNAME || 'root';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'adhavan123';
process.env.DB_NAME = process.env.DB_NAME || 'twilio_test';

const app = express();

app.use(cors({
  origin: 'http://localhost:4200', // Your Angular app's URL
  credentials: true // Enable cookies and other credentials
}));

app.use((err: express.Errback, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).send({ error: 'Invalid JSON' });
  }
  next();
});

console.log('Initializing Data Source with the following settings:');
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('Username:', process.env.DB_USERNAME);
console.log('Password:', process.env.DB_PASSWORD);
console.log('Database:', process.env.DB_NAME);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err);
  });

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/conversation', conversationRoutes);
app.use('/twilio', twilioRoutes);

export default app;
