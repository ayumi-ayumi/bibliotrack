import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB Connetion Successfull');
  })
  .catch((err) => {
    console.log('error', err.message);
  });
