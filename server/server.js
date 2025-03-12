import express from 'express';
import cors from 'cors';
import env from 'dotenv';
env.config();
import apiRoutes from './api-routes/index.js';
import './helpers/db.js';

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());
app.use('/', apiRoutes);

app.use(function (req, res) {
  res.status(404).json({ msg: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`This app listening on port ${PORT}`);
});
